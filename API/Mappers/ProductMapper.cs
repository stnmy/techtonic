using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOS;
using API.Models.Product;

namespace API.Mappers
{
    public static class ProductMapper
    {
        public static ProductDto toProductDto(this Product product){
            return new ProductDto
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
    }
}