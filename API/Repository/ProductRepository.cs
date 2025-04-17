using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Controllers;
using API.Data;
using API.Interfaces;
using API.Models.Product;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;
        public ProductRepository(ApplicationDbContext context){
            _context = context;
        }
        public async Task<Product> GetProductById(int id)
        {
            var product = await _context.Products
                .Include(p => p.Brand)
                .Include(p => p.SubCategory)
                .Include(p => p.Category)
                .Include(p => p.ProductImages)
                .Include(p => p.AttributeValues) // 
                .Include(p => p.Reviews) 
                .Include(p => p.Questions) 
                .Include(p => p.Visits)
                .FirstOrDefaultAsync(p => p.Id == id);

            return product;
        }

        public async Task<List<Product>> GetProducts()
        {
            var products =  await _context.Products
                .Include(p => p.Brand)
                .Include(p => p.SubCategory)
                .Include(p => p.Category)
                .Include(p => p.ProductImages)
                .Include(p => p.AttributeValues) // 
                .Include(p => p.Reviews) 
                .Include(p => p.Questions) 
                .Include(p => p.Visits)
                .ToListAsync();
            return products;
        }
    }
}