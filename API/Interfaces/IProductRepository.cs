using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOS;
using API.DTOS.Product;
using API.DTOS.ProductManagement;
using API.Models.ProductModels;
using API.Models.Utility;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        Task<ProductCardPageResult> GetProducts(string? orderBy = null,
            string? filters = null, int? pageNumber = 1, int? pageSize = 5,
            string? search = null, string? priceRange = null);
        Task<ProductWithRelatedProductsDto> GetProductById(int id);
        Task<List<IdentifiedSlug>> IdentifySlugsAsync(string[] slugs);
        Task<List<Product>> GetProductsBySlugs(string? categorySlug, string? subCategorySlug, string? brandSlug, List<int>? filterIds);
        Task<List<FilterDto>> GetFiltersAttributesAsync(string categorySlug);
        Task<PriceRangeDto?> GetPriceRangeAsync(string categorySlug);
        Task<Product?> GetDealOfTheDayAsync();

        Task<List<Product>> GetMostVisitedProductsAsync(int count, DateTime? fromDate = null);
        Task<ProductQuestion?> AskQuestionAsync(int productId, string question);

    }
}