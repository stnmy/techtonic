using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Controllers;
using API.Data;
using API.Data.Enums;
using API.DTOS;
using API.Interfaces;
using API.Mappers;
using API.Models.Product;
using API.Models.Utility;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;
        public ProductRepository(ApplicationDbContext context)
        {
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
            var products = await _context.Products
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

        public async Task<List<IdentifiedSlug>> IdentifySlugsAsync(string[] slugs)
        {
            var categories = await _context.Categories.Select(c => c.Slug.ToLower()).ToListAsync();
            var brands = await _context.Brands.Select(c => c.Slug.ToLower()).ToListAsync();
            var subCategories = await _context.SubCategories.Select(c => c.Slug.ToLower()).ToListAsync();
            
            var identified = new List<IdentifiedSlug>();
            foreach (var slug in slugs)
            {
                var lowerSlug = slug.ToLower();
                if (categories.Contains(slug)){
                    identified.Add(new IdentifiedSlug(lowerSlug, SlugType.Category));
                }
                else if(brands.Contains(slug)){
                    identified.Add(new IdentifiedSlug(lowerSlug, SlugType.Brand));
                }
                else if(subCategories.Contains(slug)){
                    identified.Add(new IdentifiedSlug(lowerSlug, SlugType.SubCategory));
                }
                

            }
            return identified;
        }

        public async Task<List<Product>> GetProductsBySlugs(string? categorySlug, string? subCategorySlug, string? brandSlug)
        {
            var query = _context.Products
                .Include(p => p.Brand)
                .Include(p => p.Category)
                .Include(p => p.SubCategory)
                .AsQueryable();

            if (!string.IsNullOrEmpty(categorySlug))
            {
                query = query.Where(p => p.Category.Slug.ToLower() == categorySlug.ToLower());
            }
            if (!string.IsNullOrEmpty(brandSlug))
            {
                query = query.Where(p => p.Brand.Slug.ToLower() == brandSlug.ToLower());
            }
            if (!string.IsNullOrEmpty(subCategorySlug))
            {
                query = query.Where(p => p.SubCategory!= null && p.SubCategory.Slug.ToLower() == subCategorySlug.ToLower());
            }

            return await query.ToListAsync();
        }
    }
}