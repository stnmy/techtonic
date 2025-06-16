using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Models.ProductModels
{
    public class Product
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Slug { get; set; }
        public required string Description { get; set; }

        public decimal Price { get; set; }
        public decimal? DiscountPrice { get; set; }

        public int BrandId { get; set; }
        [JsonIgnore]
        public Brand Brand { get; set; } = null!;

        public int CategoryId { get; set; }
        [JsonIgnore]
        public Category Category { get; set; } = null!;

        public int? SubCategoryId { get; set; }
        public bool IsDeleted { get; set; } = false;

        [JsonIgnore]
        public SubCategory? SubCategory { get; set; }
        public required int StockQuantity { get; set; }

        public bool IsFeatured { get; set; }
        public bool IsDealOfTheDay { get; set; }


        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<ProductImage> ProductImages { get; set; } = new List<ProductImage>();

        public ICollection<ProductAttributeValue> AttributeValues { get; set; } = new List<ProductAttributeValue>();

        public ICollection<ProductReview> Reviews { get; set; } = new List<ProductReview>();

        public ICollection<ProductQuestion> Questions { get; set; } = new List<ProductQuestion>();

        public ICollection<ProductVisit> Visits { get; set; } = new List<ProductVisit>();
    }
}