using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.Product
{
    public class Product
{
    public int Id { get; set; }

    public required string Name { get; set; }
    public string? Slug { get; set; }
    public required string Description { get; set; }

    public decimal Price { get; set; }
    public decimal? DiscountPrice { get; set; }

    public required string Brand { get; set; }
    public string? Type { get; set; }

    public int CategoryId { get; set; }
    public required Category Category { get; set; }

    public bool IsFeatured { get; set; }
    public bool IsDealOfTheDay { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Photos
    public ICollection<ProductImage> ProductImages { get; set; } = new List<ProductImage>();

    // Key Features
    public ICollection<ProductKeyFeature> KeyFeatures { get; set; } = new List<ProductKeyFeature>();

    // Specifications
    public ICollection<ProductSpecificationValue> SpecificationValues { get; set; } = new List<ProductSpecificationValue>();

    // Reviews
    public ICollection<ProductReview> Reviews { get; set; } = new List<ProductReview>();

    // Questions
    public ICollection<ProductQuestion> Questions { get; set; } = new List<ProductQuestion>();
}

}