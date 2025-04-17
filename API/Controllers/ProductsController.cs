using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
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
                if(products == null || products.Count == 0){
                    return NotFound("No Products Found!");
                }
                var productDtos = products.Select(p => p.toProductDto()).ToList();
                return productDtos;
            }
            catch (System.Exception)
            {
                return StatusCode(500,"An unhandled exception happened during the operation");                
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            var product = await _productRepository.GetProductById(id);

            if (product == null)
                return NotFound();
            
            var productDto = product.toProductDto();
            return productDto;
        }
    }
}