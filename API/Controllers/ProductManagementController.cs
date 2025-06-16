using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOS;
using API.DTOS.Product;
using API.DTOS.ProductManagement;
using API.Interfaces;
using API.Mappers;
using API.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize(Roles = "Moderator")]
    public class ProductManagementController : BaseApiController
    {
        private readonly IProductManagementRepository _productManagementRepository;
        private readonly IProductRepository _productRepository;
        public ProductManagementController(IProductManagementRepository productManagementRepository,
        IProductRepository productRepository)
        {
            _productManagementRepository = productManagementRepository;
            _productRepository = productRepository;
        }
        [HttpPost("create")]
        public async Task<ActionResult<ProductDetailDto>> CreateProduct([FromForm] CreateProductDto productDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var product = await _productManagementRepository.CreateProductAsync(productDto);
                return Ok(product.toProductDto());
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("update/{id}")]
        public async Task<ActionResult<UpdateProductViewDto>> GetProductForEdit(int id)
        {
            try
            {
                var dto = await _productManagementRepository.GetProductForUpdateAsync(id);
                if (dto == null)
                    return NotFound($"Product with ID {id} not found.");

                return Ok(dto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An unexpected error occurred.", detail = ex.Message });
            }
        }


        [HttpPut("update/{id}")]
        public async Task<ActionResult<ProductDetailDto>> UpdateProduct(int id, [FromForm] UpdateProductDto productDto)
        {
            if (id != productDto.Id)
                return BadRequest("ID mismatch between route and body.");

            try
            {
                var updatedProduct = await _productManagementRepository.UpdateProductAsync(productDto);
                if (updatedProduct == null)
                {
                    return NotFound($"Product with ID {id} not found.");
                }

                return Ok(updatedProduct.toProductDto());
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "An unexpected error occurred." });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            try
            {
                var deleted = await _productManagementRepository.DeleteProductAsync(id);

                if (!deleted)
                    return NotFound(new { error = $"Product with ID {id} not found." });

                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "An unexpected error occurred while deleting the product." });
            }
        }

        [HttpGet("brands")]
        public async Task<ActionResult<List<BrandDto>>> GetBrands()
        {
            var brands = await _productManagementRepository.GetBrandsAsync();
            return Ok(brands);
        }

        [HttpPost("brands")]
        public async Task<IActionResult> CreateBrand([FromBody] CreateBrandDto dto)
        {
            var brand = await _productManagementRepository.CreateBrandAsync(dto);
            return CreatedAtAction(nameof(GetBrands), new { id = brand.Id }, brand);
        }

        [HttpGet("filters")]
        public async Task<ActionResult<List<FilterDto>>> GetFiltersForCategory()
        {
            var categorySlug = "laptop";
            var filters = await _productRepository.GetFiltersAttributesAsync(categorySlug);

            if (filters == null || filters.Count == 0)
            {
                return NotFound();
            }
            return filters;

        }

        [HttpPost("filters")]
        public async Task<IActionResult> CreateFilterAttribute([FromBody] CreateFilterAttributeDto dto)
        {
            try
            {
                var filter = await _productManagementRepository.CreateFilterAttributeAsync(dto);
                return Ok(filter);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost("filters/{filterId}/values")]
        public async Task<IActionResult> AddFilterValue(int filterId, [FromBody] CreateFilterAttributeValueDto dto)
        {
            try
            {
                var value = await _productManagementRepository.AddFilterValueAsync(filterId, dto);
                return Ok(value);
            }
            catch (ArgumentException ex)
            {
                return NotFound(new { error = ex.Message });
            }
        }

    }
}