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
        public ProductsController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductDto>>> GetProducts()
        {
            try
            {
                var products = await _productRepository.GetProducts();
                if (products == null || products.Count == 0)
                {
                    return NotFound("No Products Found!");
                }
                var productDtos = products.Select(p => p.toProductDto()).ToList();
                return productDtos;
            }
            catch (System.Exception)
            {
                return StatusCode(500, "An unhandled exception happened during the operation");
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            var product = await _productRepository.GetProductById(id);

            if (product == null)
                return NotFound();

            var productDto = product.toProductDto();
            return productDto;
        }


        [HttpGet("{slug1}/{slug2?}/{slug3?}")]
        public async Task<ActionResult<List<ProductDto>>> GetDynamicSlugUrl(string slug1, string? slug2, string? slug3)
        {
            var slugs = new[] { slug1, slug2, slug3 }
                .Where(s => !string.IsNullOrEmpty(s))
                .Select(s => s!)
                .ToArray();

            var identifiedSlugs = await _productRepository.IdentifySlugsAsync(slugs);

            var hasDuplicateTypes = identifiedSlugs
            .GroupBy(s => s.Type)
            .Any(g => g.Count() > 1);

            if (hasDuplicateTypes || identifiedSlugs.Count() == 0)
            {
                return NotFound("No Products Found!");
            }

            var category = identifiedSlugs.FirstOrDefault(s => s.Type == SlugType.Category)?.Slug;
            var brand = identifiedSlugs.FirstOrDefault(s => s.Type == SlugType.Brand)?.Slug;
            var subcategory = identifiedSlugs.FirstOrDefault(s => s.Type == SlugType.SubCategory)?.Slug;

            var products = await _productRepository.GetProductsBySlugs(category, subcategory, brand);

            if (products == null || products.Count == 0)
            {
                return NotFound("No Products Found!");
            }

            var productDtos = products.Select(p => p.toProductDto()).ToList();
            return Ok(productDtos);

        }
    }
}