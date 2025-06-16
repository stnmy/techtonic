using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Controllers;
using API.Data;
using API.Data.Enums;
using API.DTOS;
using API.DTOS.Product;
using API.DTOS.ProductManagement;
using API.Interfaces;
using API.Mappers;
using API.Models.ProductModels;
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

        public async Task<ProductWithRelatedProductsDto> GetProductById(int id)
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
                .Where(p => !p.IsDeleted)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return null;
            }

            _context.ProductVisits.Add(new ProductVisit
            {
                ProductId = product.Id,
                VisitTime = DateTime.UtcNow
            });
            await _context.SaveChangesAsync();

            var relatedProducts = await GetRelatedProducts(product);
            return new ProductWithRelatedProductsDto
            {
                Product = product.toProductDto(),
                RelatedProducts = relatedProducts.Select(rp => rp.toRelatedProductCardDto()).ToList()
            };
        }


        private async Task<List<Product>> GetRelatedProducts(Product product)
        {
            const decimal upperLimit = 1.10M;
            const decimal lowerLimit = 0.91M;

            decimal lowerPrice = product.DiscountPrice.HasValue
                ? product.DiscountPrice.Value * lowerLimit
                : product.Price * lowerLimit;

            decimal upperPrice = product.DiscountPrice.HasValue
                ? product.DiscountPrice.Value * upperLimit
                : product.Price * upperLimit;

            return await _context.Products
                .Where(p => !p.IsDeleted)
                .Where(p => p.Id != product.Id)
                .Where(p => p.CategoryId == product.CategoryId)
                .Where(p =>
                    p.DiscountPrice.HasValue
                    ? p.DiscountPrice.Value >= lowerPrice && p.DiscountPrice.Value <= upperPrice
                    : p.Price >= lowerPrice && p.Price <= upperPrice)
                .Include(p => p.Reviews)
                .Include(p => p.ProductImages)
                .OrderByDescending(p => p.Reviews.Any()
                    ? p.Reviews.Average(r => r.Rating)
                    : 0)
                .Take(4)
                .ToListAsync();
        }


        public async Task<ProductCardPageResult> GetProducts(
            string? orderBy = null,
            string? filters = null,
            int? pageNumber = 1,
            int? pageSize = 5,
            string? search = null,
            string? priceRange = null)
        {

            var query = BuildProductQuery(orderBy, filters, search, priceRange);

            var count = await query.CountAsync();
            var (actualPageNumber, actualPageSize, paginationQuery) = ApplyPagination(query, pageNumber, pageSize);

            var products = await paginationQuery.ToListAsync();
            return ProductMapper.ToProductCardPageResult(count, actualPageNumber, actualPageSize, products);
        }

        private (int actualPageNumber, int actualPageSize, IQueryable<Product> query) ApplyPagination(
            IQueryable<Product> query, int? pageNumber, int? pageSize, int minPageSize = 5, int maxPageSize = 20)
        {
            int actualPageNumber = (pageNumber.HasValue && pageNumber.Value >= 1) ? pageNumber.Value : 1;
            int actualPageSize = (pageSize.HasValue && pageSize.Value >= minPageSize && pageSize.Value <= maxPageSize)
                ? pageSize.Value
                : 10;

            var paginationQuery = query
                .Skip((actualPageNumber - 1) * actualPageSize)
                .Take(actualPageSize);

            return (actualPageNumber, actualPageSize, paginationQuery);
        }

        public IQueryable<Product> BuildProductQuery(
            string? orderBy,
            string? filters,
            string? search,
            string? priceRange
        )
        {
            var query = _context.Products
                .Where(p => !p.IsDeleted)
                .Include(p => p.ProductImages)
                .Include(p => p.AttributeValues)
                .AsQueryable();


            query = ApplyPriceRangeFilter(query, priceRange);

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = ApplySearch(query, search);
            }
            else if (!string.IsNullOrWhiteSpace(filters))
            {
                query = ApplyAttributeFilters(query, filters);
            }
            query = ApplyOrdering(query, orderBy);

            return query;
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
                if (categories.Contains(slug))
                {
                    identified.Add(new IdentifiedSlug(lowerSlug, SlugType.Category));
                }
                else if (brands.Contains(slug))
                {
                    identified.Add(new IdentifiedSlug(lowerSlug, SlugType.Brand));
                }
                else if (subCategories.Contains(slug))
                {
                    identified.Add(new IdentifiedSlug(lowerSlug, SlugType.SubCategory));
                }


            }
            return identified;
        }

        public async Task<List<Product>> GetProductsBySlugs(string? categorySlug, string? subCategorySlug, string? brandSlug, List<int>? filterIds)
        {
            var query = _context.Products
                .Include(p => p.Brand)
                .Include(p => p.Category)
                .Include(p => p.SubCategory)
                .Include(p => p.AttributeValues)
                .Include(p => p.ProductImages)
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
                query = query.Where(p => p.SubCategory != null && p.SubCategory.Slug.ToLower() == subCategorySlug.ToLower());
            }

            if (filterIds != null && filterIds.Count > 0 && !string.IsNullOrEmpty(categorySlug))
            {
                var filterValues = await _context.Categories
                    .Where(c => c.Slug.ToLower() == categorySlug.ToLower())
                    .SelectMany(c => c.Filters)
                    .SelectMany(fa => fa.DefaultValues)
                    .Where(fav => filterIds.Contains(fav.Id))
                    .Select(fav => fav.Value)
                    .ToListAsync();

                if (filterValues.Count == 0)
                {
                    return new List<Product>();
                }
                query = query.Where(p => p.AttributeValues
                    .Any(av => filterValues.Contains(av.Value)));
            }
            return await query.ToListAsync();
        }


        public async Task<List<FilterDto>> GetFiltersAttributesAsync(string categorySlug)
        {
            var category = await _context.Categories
                .Include(c => c.Filters)
                    .ThenInclude(f => f.DefaultValues)
                .FirstOrDefaultAsync(c => c.Slug == categorySlug);

            if (category == null)
                return new List<FilterDto>();

            return category.Filters
                .Select(f => new FilterDto
                {
                    FilterName = f.FilterName,
                    FilterSlug = f.FilterSlug,
                    Values = f.DefaultValues
                        .Select(df => new FilterValueDto
                        {
                            Id = df.Id,
                            Value = df.Value
                        })
                        .ToList()
                })
                .ToList();
        }

        public async Task<PriceRangeDto?> GetPriceRangeAsync(string categorySlug)
        {
            var products = await _context.Products
                .Where(p => p.Category.Slug == categorySlug && !p.IsDeleted)
                .ToListAsync();

            if (!products.Any())
                return null;

            return new PriceRangeDto
            {
                minPrice = (int)products.Min(p => p.Price),
                maxPrice = (int)products.Max(p => p.Price)
            };
        }


        public async Task<Product?> GetDealOfTheDayAsync()
        {
            var product = await _context.Products
                            .Include(p => p.AttributeValues)
                            .Include(p => p.ProductImages)
                            .FirstOrDefaultAsync(p => p.IsDealOfTheDay == true);
            return product;
        }

        public async Task<List<Product>> GetMostVisitedProductsAsync(int count, DateTime? fromDate = null)
        {
            // Get visited products first
            var visitedProductsQuery = _context.Products
                .Include(p => p.ProductImages)
                .Include(p => p.Visits)
                .Include(p => p.AttributeValues)
                .Where(p => fromDate == null || p.Visits.Any(v => v.VisitTime >= fromDate))
                .OrderByDescending(p => p.Visits.Count)
                .Take(count);

            var visitedProducts = await visitedProductsQuery.ToListAsync();

            // If we have enough products with visits, return them
            if (visitedProducts.Count >= count)
            {
                return visitedProducts;
            }

            // Get IDs of already selected products
            var visitedProductIds = visitedProducts.Select(p => p.Id).ToList();

            // Get additional products (excluding already selected ones)
            var additionalProductsNeeded = count - visitedProducts.Count;
            var additionalProducts = await _context.Products
                .Include(p => p.ProductImages)
                .Include(p => p.AttributeValues)
                .Where(p => !visitedProductIds.Contains(p.Id))
                .OrderBy(p => p.Id) // Or your preferred ordering
                .Take(additionalProductsNeeded)
                .ToListAsync();

            return visitedProducts.Concat(additionalProducts).ToList();
        }

        private IQueryable<Product> ApplySearch(IQueryable<Product> query, string? searchValue)
        {
            if (!string.IsNullOrWhiteSpace(searchValue))
            {
                var lowerCaseSearchValue = searchValue.Trim().ToLower();
                query = query.Where(p =>
                    p.Name.ToLower().Contains(lowerCaseSearchValue) ||
                    (p.Description != null && p.Description.ToLower().Contains(lowerCaseSearchValue))
                );
            }
            return query;
        }

        private IQueryable<Product> ApplyOrdering(IQueryable<Product> query, string? orderBy)
        {
            return orderBy switch
            {
                "priceasc" => query.OrderBy(x => x.DiscountPrice ?? x.Price),
                "pricedesc" => query.OrderByDescending(x => x.DiscountPrice ?? x.Price),
                "ratinghigh" => query.OrderByDescending(x => x.Reviews.Any() ? x.Reviews.Average(r => r.Rating) : 4),
                "ratinglow" => query.OrderBy(x => x.Reviews.Any() ? x.Reviews.Average(r => r.Rating) : 4),
                "mostpopular" => query.OrderByDescending(x => x.Visits.Count),
                "leastpopular" => query.OrderBy(x => x.Visits.Count),
                "name" => query.OrderBy(x => x.Name),
                _ => query.OrderBy(x => x.Name)
            };
        }

        private IQueryable<Product> ApplyFiltering(IQueryable<Product> query, List<int> filterIds)
        {
            if (filterIds == null || filterIds.Count == 0)
            {
                return query;
            }
            var filterPairs = _context.FilterAttributeValues
                .Where(fv => filterIds.Contains(fv.Id))
                .Select(fv => new { Group = fv.FilterAttribute.FilterSlug, valueId = fv.Id });

            var groups = filterPairs.ToList().GroupBy(fp => fp.Group).ToList();

            foreach (var group in groups)
            {
                var groupIds = group.Select(g => g.valueId).ToList();
                query = query.Where(p =>
                    p.AttributeValues.Any(av =>
                        av.FilterAttributeValueId.HasValue && groupIds.Contains(av.FilterAttributeValueId.Value)
                    )
                );
            }

            return query;
        }

        private IQueryable<Product> ApplyPriceRangeFilter(IQueryable<Product> query, string? priceRange)
        {
            if (!string.IsNullOrWhiteSpace(priceRange))
            {
                var (minPrice, maxPrice) = parsePriceRange(priceRange);
                query = query.Where(p => (p.DiscountPrice ?? p.Price) >= minPrice &&
                    (p.DiscountPrice ?? p.Price) <= maxPrice);
            }
            return query;
        }

        private IQueryable<Product> ApplyAttributeFilters(IQueryable<Product> query, string? filters)
        {
            if (!string.IsNullOrWhiteSpace(filters))
            {
                var filterIds = filters.Split(',', StringSplitOptions.RemoveEmptyEntries)
                    .Select(s => int.TryParse(s, out var id) ? id : -1)
                    .Where(id => id > 0)
                    .ToList();
                query = ApplyFiltering(query, filterIds);
            }
            return query;
        }

        private Tuple<int, int> parsePriceRange(string priceRange)
        {
            if (!string.IsNullOrWhiteSpace(priceRange))
            {
                var priceRangeParts = priceRange.Split("-");
                if (priceRangeParts.Length == 2)
                {
                    if (int.TryParse(priceRangeParts[0], out var minPrice) &&
                      int.TryParse(priceRangeParts[1], out var maxPrice))
                    {
                        return Tuple.Create(minPrice, maxPrice);
                    }
                }
            }
            throw new ArgumentException("Invalid Price Range Format", nameof(priceRange));
        }

        public async Task<ProductQuestion?> AskQuestionAsync(int productId, string question)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null)
            {
                return null;
            }

            var productQuestion = new ProductQuestion
            {
                ProductId = productId,
                Question = question,
                CreatedAt = DateTime.UtcNow
            };

            _context.ProductQuestions.Add(productQuestion);
            await _context.SaveChangesAsync();
            return productQuestion;
        }


    }
}