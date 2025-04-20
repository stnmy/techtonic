using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Data.Enums;
using API.DTOS;
using API.Interfaces;
using API.Mappers;
using API.Models.Product;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly ApplicationDbContext _context;
        public ProductsController(IProductRepository productRepository, ApplicationDbContext context)
        {
            _productRepository = productRepository;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductCardDto>>> GetProducts()
        {
            try
            {
                var products = await _productRepository.GetProducts();
                if (products == null || products.Count == 0)
                {
                    return NotFound("No Products Found!");
                }
                var productDtos = products.Select(p => p.toProductCardDto()).ToList();
                return productDtos;
            }
            catch (System.Exception)
            {
                return StatusCode(500, "An unhandled exception happened during the operation");
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductDetailDto>> GetProduct(int id)
        {
            var product = await _productRepository.GetProductById(id);

            if (product == null)
                return NotFound();

            var productDetailDto = product.toProductDto();
            return productDetailDto;
        }


        [HttpGet("{slug1}/{slug2?}/{slug3?}")]
        public async Task<ActionResult<List<ProductCardDto>>> GetDynamicSlugUrl(string slug1, string? slug2, string? slug3)
        {
            var slugs = new[] { slug1, slug2, slug3 }
                .Where(s => !string.IsNullOrEmpty(s))
                .Select(s => s!)
                .ToArray();

            var(categorySlug,brandSlug, subcategorySlug) = await GetValidSlugsAsync(slugs);

            if( categorySlug == null && brandSlug == null  && subcategorySlug == null )
            {
                return NotFound("No Products Found");
            };

            var products = await _productRepository.GetProductsBySlugs(categorySlug, subcategorySlug, brandSlug);

            if (products == null || products.Count == 0)
            {
                return NotFound("No Products Found!");
            }
            var productCardDtos = products.Select(p => p.toProductCardDto()).ToList();

            var filters = !string.IsNullOrEmpty(categorySlug)
            ? await _productRepository.GetFiltersForCategoryAsync(categorySlug)
            : new List<FilterDto>();

            return Ok(new ProductsPageReturnDto
            {
                Products = productCardDtos,
                Filters = filters
            });

        }


        private async Task<(string? CategorySlug, string? BrandSlug, string? SubCategorySlug)> GetValidSlugsAsync(string[] slugs)
        {
            var identifiedSlugs = await _productRepository.IdentifySlugsAsync(slugs);

            var hasDuplicateTypes = identifiedSlugs
                .GroupBy(s => s.Type)
                .Any(g => g.Count() > 1);

            if (hasDuplicateTypes || identifiedSlugs.Count() == 0)
                return (null, null, null);

            return (
                identifiedSlugs.FirstOrDefault(s => s.Type == SlugType.Category)?.Slug,
                identifiedSlugs.FirstOrDefault(s => s.Type == SlugType.Brand)?.Slug,
                identifiedSlugs.FirstOrDefault(s => s.Type == SlugType.SubCategory)?.Slug
            );
        }

    }
}