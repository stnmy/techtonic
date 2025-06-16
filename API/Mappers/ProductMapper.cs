using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOS;
using API.DTOS.Product;
using API.Models.ProductModels;
using API.Models.Utility;

namespace API.Mappers
{
    public static class ProductMapper
    {
        public static ProductDetailDto toProductDto(this Product product)
        {
            return new ProductDetailDto
            {
                Id = product.Id,
                Name = product.Name,
                Slug = product.Slug,
                Description = product.Description,
                Price = product.Price,
                DiscountPrice = product.DiscountPrice,
                BrandName = product.Brand?.Name ?? "Unknown",
                CategoryName = product.Category?.Name ?? "Unknown",
                SubCategoryName = product.SubCategory?.Name,
                IsFeatured = product.IsFeatured,
                IsDealOfTheDay = product.IsDealOfTheDay,
                StockQuantity = product.StockQuantity,
                CreatedAt = product.CreatedAt,
                Images = product.ProductImages.Select(pi => pi.ImageUrl).ToList(),
                Attributes = product.AttributeValues.Select(av => new ProductAttributeValueDto
                {
                    Name = av.Name ?? "Unknown",
                    Value = av.Value,
                    SpecificationCategory = av.SpecificationCategory

                }).ToList(),
                Reviews = product.Reviews.Select(r => new ReviewDto
                {
                    ReviewerName = r.ReviewerName,
                    Comment = r.Comment,
                    Rating = r.Rating,
                    CreatedAt = r.CreatedAt
                }).ToList(),
                Questions = product.Questions.Select(q => new QuestionDto
                {
                    QuestionText = q.Question,
                    Answer = q.Answer,
                    CreatedAt = q.CreatedAt
                }).ToList(),
                VisitCount = product.Visits.Count
            };
        }

        public static ProductCardDto toProductCardDto(this Product product)
        {
            return new ProductCardDto
            {
                Id = product.Id,
                Name = product.Name,
                Slug = product.Slug,
                Price = product.Price,
                DiscountPrice = product.DiscountPrice,
                Image = product.ProductImages.FirstOrDefault()?.ImageUrl ?? "/images/placeholder.jpg",
                Attributes = product.AttributeValues
                .Where(av => av.SpecificationCategory == "Key Feature")
                .Select(av => new ProductAttributeValueDto
                {
                    Name = av.Name ?? "Unknown",
                    Value = av.Value,
                    SpecificationCategory = av.SpecificationCategory

                }).ToList(),
            };
        }

        public static RelatedProductCardDto toRelatedProductCardDto(this Product product)
        {
            return new RelatedProductCardDto
            {
                Id = product.Id,
                Name = product.Name,
                Slug = product.Slug,
                Price = product.Price,
                DiscountPrice = product.DiscountPrice,
                Image = product.ProductImages.FirstOrDefault()?.ImageUrl ?? "/images/placeholder.jpg",
            };
        }


        public static ProductCardPageResult ToProductCardPageResult(
            int count,
            int actualPageNumber,
            int actualPageSize,
            List<Product> products)
        {
            var productDtos = products.Select(p => p.toProductCardDto()).ToList();

            return new ProductCardPageResult
            {
                paginationData = new PaginationDataDto
                {
                    totalCount = count,
                    start = ((actualPageNumber - 1) * actualPageSize) + 1,
                    end = actualPageNumber * actualPageSize <= count ? actualPageNumber * actualPageSize : count,
                    pageSize = actualPageSize,
                    currentPage = actualPageNumber,
                    totalPageNumber = (int)Math.Ceiling((double)count / actualPageSize)
                },
                productCardDtos = productDtos,
            };
        }

        public static Product mapToProduct(this CreateProductDto dto, List<ProductImage> uploadedImages)
        {
            return new Product
            {
                Name = dto.Name,
                Slug = HelperMethods.GenerateSlug(dto.Name),
                Description = dto.Description,
                Price = dto.Price,
                StockQuantity = dto.StockQuantity,
                IsFeatured = dto.IsFeatured,
                IsDealOfTheDay = dto.IsDealOfTheDay,
                BrandId = dto.BrandId,
                CategoryId = dto.CategoryId,
                SubCategoryId = dto.SubCategoryId,
                CreatedAt = DateTime.UtcNow,
                ProductImages = uploadedImages,
                AttributeValues = dto.AttributeValues.Select(attr => new ProductAttributeValue
                {
                    FilterAttributeValueId = attr.FilterAttributeValueId,
                    Name = attr.Name,
                    Slug = HelperMethods.GenerateSlug(attr.Name),
                    Value = attr.Value,
                    SpecificationCategory = attr.SpecificationCategory
                }).ToList()
            };
        }


        public static void UpdateProductFromDto(this Product product, UpdateProductDto dto)
        {
            product.Name = dto.Name;
            product.Slug = HelperMethods.GenerateSlug(dto.Name);
            product.Description = dto.Description;
            product.Price = dto.Price;
            product.StockQuantity = dto.StockQuantity;
            product.IsFeatured = dto.IsFeatured;
            product.IsDealOfTheDay = dto.IsDealOfTheDay;
        }

        public static UpdateProductViewDto ToUpdateProductViewDto(this Product product)
        {
            return new UpdateProductViewDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                DiscountPrice = product.DiscountPrice,
                StockQuantity = product.StockQuantity,
                IsFeatured = product.IsFeatured,
                IsDealOfTheDay = product.IsDealOfTheDay,
                ProductImageUrls = product.ProductImages.Select(img => img.ImageUrl).ToList(),
                AttributeValues = product.AttributeValues
                    .Select(attr => new ProductAttributeValueCreateDto
                    {
                        FilterAttributeValueId = attr.FilterAttributeValueId,
                        Name = attr.Name,
                        Value = attr.Value,
                        SpecificationCategory = attr.SpecificationCategory
                    }).ToList()
            };
        }

    }
}