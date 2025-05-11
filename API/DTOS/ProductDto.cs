using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOS
{
    public class ProductDetailDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Slug { get; set; }
        public string Description { get; set; } = null!;
        public decimal Price { get; set; }
        public decimal? DiscountPrice { get; set; }
        public string BrandName { get; set; } = null!;
        public string CategoryName { get; set; } = null!;
        public string? SubCategoryName { get; set; }
        public bool IsFeatured { get; set; }
        public bool IsDealOfTheDay { get; set; }
        public required int StockQuantity { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<string> Images { get; set; } = new();
        public List<ProductAttributeValueDto> Attributes { get; set; } = new();
        public List<ReviewDto> Reviews { get; set; } = new();
        public List<QuestionDto> Questions { get; set; } = new();
        public int VisitCount { get; set; }
    }

    public class ProductAttributeValueDto
    {
        public string Name { get; set; } = null!;
        public string Value { get; set; } = null!;
        public string SpecificationCategory { get; set; } = null!;
    }

    public class ReviewDto
    {
        public string ReviewerName { get; set; } = null!;
        public string Comment { get; set; } = null!;
        public int Rating { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class QuestionDto
    {
        public string QuestionText { get; set; } = null!;
        public string? Answer { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class FilterDto
    {
        public string FilterName { get; set; } = null!;
        public string FilterSlug { get; set; } = null!;
        public List<FilterValueDto> Values { get; set; } = new();
    }
    public class FilterValueDto
    {
        public int Id { get; set; }
        public string Value { get; set; } = string.Empty ;
    }


}