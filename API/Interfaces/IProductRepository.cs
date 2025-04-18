using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.Product;
using API.Models.Utility;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        Task<List<Product>> GetProducts();
        Task<Product> GetProductById(int id);
        Task<List<IdentifiedSlug>> IdentifySlugsAsync(string[] slugs);
        Task<List<Product>> GetProductsBySlugs(string? categorySlug, string? subCategorySlug, string? brandSlug);
    }
}