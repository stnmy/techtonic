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
using API.Models.ProductModels;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {
        private readonly IProductRepository _productRepository;
        private readonly ApplicationDbContext _context;
        public ProductsController(IProductRepository productRepository, ApplicationDbContext context)
        {
            _productRepository = productRepository;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<ProductCardPageResult>> GetProducts(
            string? orderBy,
            [FromQuery(Name = "filters")] string? filters,
            int? pageNumber,
            int? pageSize,
            string? search,
            string? priceRange)
        {

            var result = await _productRepository.GetProducts(orderBy, filters, pageNumber, pageSize, search, priceRange);
            if (result.productCardDtos == null || result.productCardDtos.Count == 0)
            {
                return NotFound("No Products Found!");
            }

            return result;
        }

        [HttpGet("{id:int}")]

        public async Task<ActionResult<ProductWithRelatedProductsDto>> GetProduct(int id)
        {
            var productWithRelatedProducts = await _productRepository.GetProductById(id);

            if (productWithRelatedProducts == null)
            {
                return NotFound();
            }

            return productWithRelatedProducts;
        }


        // [HttpGet("{slug1}/{slug2?}/{slug3?}")]
        // public async Task<ActionResult<List<ProductCardDto>>> GetDynamicSlugUrl(
        //     string slug1, string? slug2, string? slug3,
        //     [FromQuery(Name = "filter")] string? filter)
        // {
        //     var slugs = new[] { slug1, slug2, slug3 }
        //         .Where(s => !string.IsNullOrEmpty(s))
        //         .Select(s => s!)
        //         .ToArray();

        //     var(categorySlug,brandSlug, subcategorySlug) = await GetValidSlugsAsync(slugs);

        //     if( categorySlug == null && brandSlug == null  && subcategorySlug == null )
        //     {
        //         return NotFound("No Products Found");
        //     };

        //     var filters = !string.IsNullOrEmpty(categorySlug)
        //     ? await _productRepository.GetFiltersForCategoryAsync(categorySlug)
        //     : new List<FilterDto>();


        //     List<int> filterIds = new();
        //     if (!string.IsNullOrWhiteSpace(filter))
        //     {
        //         if (filter.All(c => char.IsDigit(c) || c == ','))
        //         {
        //             filterIds = filter
        //                 .Split(',', StringSplitOptions.RemoveEmptyEntries)
        //                 .Select(s => int.TryParse(s, out var id) ? id : -1)
        //                 .Where(id => id > 0)
        //                 .ToList();
        //         }
        //         else
        //         {
        //             return BadRequest("Invalid filter format");
        //         }
        //     }


        //     var products = await _productRepository.GetProductsBySlugs(categorySlug, subcategorySlug, brandSlug, filterIds);

        //     if (products == null || products.Count == 0)
        //     {
        //         return NotFound("No Products Found");
        //     }
        //     var productCardDtos = products.Select(p => p.toProductCardDto()).ToList();

        //     return Ok(productCardDtos);
        // }

        [HttpGet("filters")]
        public async Task<ActionResult<TotalFilterDto>> GetFiltersForCategory()
        {
            var categorySlug = "laptop";
            var result = await _productRepository.GetFiltersForCategoryAsync(categorySlug);
            if (result.filterDtos == null || result.filterDtos.Length == 0)
            {
                return Ok(new TotalFilterDto());
            }

            return Ok(result);
        }

        // private async Task<(string? CategorySlug, string? BrandSlug, string? SubCategorySlug)> GetValidSlugsAsync(string[] slugs)
        // {
        //     var identifiedSlugs = await _productRepository.IdentifySlugsAsync(slugs);

        //     var hasDuplicateTypes = identifiedSlugs
        //         .GroupBy(s => s.Type)
        //         .Any(g => g.Count() > 1);

        //     if (hasDuplicateTypes || identifiedSlugs.Count() == 0)
        //         return (null, null, null);

        //     return (
        //         identifiedSlugs.FirstOrDefault(s => s.Type == SlugType.Category)?.Slug,
        //         identifiedSlugs.FirstOrDefault(s => s.Type == SlugType.Brand)?.Slug,
        //         identifiedSlugs.FirstOrDefault(s => s.Type == SlugType.SubCategory)?.Slug
        //     );
        // }


        [HttpGet("DealOfTheDay")]
        public async Task<ActionResult<ProductCardDto>> GetDealOfTheDay()
        {
            var dealProduct = await _productRepository.GetDealOfTheDayAsync();

            if (dealProduct == null)
            {
                return NotFound();
            }
            return dealProduct.toProductCardDto();
        }

        [HttpGet("MostVisited")]
        public async Task<ActionResult<List<ProductCardDto>>> GetMostVisitedProducts(
            [FromQuery] TimePeriod period = TimePeriod.All,
            [FromQuery] int count = 5)
        {

            if (count < 5 || count > 50)
            {
                return BadRequest("Must be between 10 and 50");
            }

            var now = DateTime.UtcNow;
            DateTime fromTime = period switch
            {
                TimePeriod.Day => now.Date,
                TimePeriod.Week => now.Date.AddDays(-(int)now.DayOfWeek),
                TimePeriod.Month => new DateTime(now.Year, now.Month, 1),
                TimePeriod.Year => new DateTime(now.Year, 1, 1),
                TimePeriod.All => DateTime.MinValue,
                _ => DateTime.MinValue
            };

            var products = await _productRepository.GetMostVisitedProductsAsync(count, fromTime);
            if (products == null || products.Count == 0)
            {
                return NotFound("No visited Products Found");
            }
            return products.Select(p => p.toProductCardDto()).ToList();
        }

        [HttpPost("question/{id:int}")]
        public async Task<IActionResult> AskQuestion(int id, [FromBody] ProductQuestionDto pqDto)
        {
            if (string.IsNullOrWhiteSpace(pqDto.Question))
            {
                return BadRequest("Question cant be Empty");
            }
            var result = await _productRepository.AskQuestionAsync(id, pqDto.Question);
            if (result == null)
            {
                return NotFound("Product not found or question invalid");
            }
            return Ok(result);
        }
    }


}