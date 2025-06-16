using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Data.Enums;
using API.DTOS;
using API.DTOS.Product;
using API.Interfaces;
using API.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {
        private readonly IProductRepository _productRepository;
        public ProductsController(IProductRepository productRepository, ApplicationDbContext context)
        {
            _productRepository = productRepository;

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

        [HttpGet("filters")]
        public async Task<ActionResult<TotalFilterDto>> GetFiltersForCategory()
        {
            var categorySlug = "laptop";
            var filters = await _productRepository.GetFiltersAttributesAsync(categorySlug);
            var prices = await _productRepository.GetPriceRangeAsync(categorySlug);
            if (filters == null || filters.Count == 0)
            {
                return Ok(new TotalFilterDto());
            }
            return new TotalFilterDto
            {
                filterDtos = filters,
                priceRangeDto = prices
            };
        }

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