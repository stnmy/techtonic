using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.Product;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DbInitializer
    {
        public static void InitDb(WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>()
                ?? throw new InvalidOperationException("Failed to retrieve ApplicationDb Context");
            SeedData(context);
        }

        private static void SeedData(ApplicationDbContext context)
        {
            context.Database.Migrate();
            if (context.Categories.Any() || context.Products.Any())
            {
                return;
            }


            var laptopCategory = new Category
            {
                Name = "Laptop",
                Slug = "laptop",
                Attributes = new List<CategoryAttribute>
                    {
                        new CategoryAttribute { Name = "Processor", IsKeyFeature = true },
                        new CategoryAttribute { Name = "RAM", IsKeyFeature = true },
                        new CategoryAttribute { Name = "Display", IsKeyFeature = true },
                        new CategoryAttribute { Name = "Features", IsKeyFeature = true },
                        new CategoryAttribute { Name = "Processor Brand", IsKeyFeature = false , SpecificationCategory="Processor" },
                        new CategoryAttribute { Name = "Processor Model", IsKeyFeature = false , SpecificationCategory="Processor" },
                        new CategoryAttribute { Name = "CPU Cache", IsKeyFeature = false , SpecificationCategory="Processor" },
                        new CategoryAttribute { Name = "Chipset Model", IsKeyFeature = false , SpecificationCategory="Chipset" },
                        new CategoryAttribute { Name = "Display Type", IsKeyFeature = false , SpecificationCategory="Display" },
                        new CategoryAttribute { Name = "Refresh Rate", IsKeyFeature = false , SpecificationCategory="Display" },



                    }
            };
            context.Categories.Add(laptopCategory);
            context.SaveChanges();

            // Create the Gaming Laptop X product
            var laptopProduct = new Product
            {
                Name = "Lenovo Yoga Slim 7 15ILL9 Core Ultra 7 15.3inch IPS Laptop",
                Slug = "lenovo-yoga-slim-7-15ill9-core-ultra-7-laptop",
                Description = "A high-performance gaming laptop.",
                Price = 200000,
                Brand = "Lenovo",
                Type = "Premium Ultrabook",
                Category = laptopCategory,
                IsFeatured = false,
                IsDealOfTheDay = false,
                CreatedAt = DateTime.UtcNow,
                ProductImages = new List<ProductImage>
                    {
                        new ProductImage { ImageUrl = "https://www.startech.com.bd/image/cache/catalog/laptop/lenovo/yoga-slim-7-14imh9/yoga-slim-7-14imh9-01-500x500.webp"},
                        new ProductImage { ImageUrl = "https://www.startech.com.bd/image/cache/catalog/laptop/lenovo/yoga-slim-7-15ill9/yoga-slim-7-15ill9-001-500x500.webp"}
                    },
                AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { CategoryAttributeId = laptopCategory.Attributes.First(a => a.Name == "Processor").Id, Value = "Intel Core Ultra 7 258V (8C ,8T, up to 4.8GHz, 12MB Cache)" },
                        new ProductAttributeValue { CategoryAttributeId = laptopCategory.Attributes.First(a => a.Name == "RAM").Id, Value = "16GB LPDDR5x-8533" },
                        new ProductAttributeValue { CategoryAttributeId = laptopCategory.Attributes.First(a => a.Name == "Display").Id, Value = "15.3Inch 2.8K WQXGA+ (2880x1800) IPS" },
                        new ProductAttributeValue { CategoryAttributeId = laptopCategory.Attributes.First(a => a.Name == "Features").Id, Value = "Backlit Keyboard, Webcam Shutter, MIL-STD-810H military" },
                        new ProductAttributeValue { CategoryAttributeId = laptopCategory.Attributes.First(a => a.Name == "Processor Brand").Id, Value = "Intel" },
                        new ProductAttributeValue { CategoryAttributeId = laptopCategory.Attributes.First(a => a.Name == "Processor Model").Id, Value = "Core Ultra 7 258V" },
                        new ProductAttributeValue { CategoryAttributeId = laptopCategory.Attributes.First(a => a.Name == "CPU Cache").Id, Value = "12MB" },
                        new ProductAttributeValue { CategoryAttributeId = laptopCategory.Attributes.First(a => a.Name == "Chipset Model").Id, Value = "Intel SoC Platform" },
                        new ProductAttributeValue { CategoryAttributeId = laptopCategory.Attributes.First(a => a.Name == "Display Type").Id, Value = "IPS" },
                        new ProductAttributeValue { CategoryAttributeId = laptopCategory.Attributes.First(a => a.Name == "Refresh Rate").Id, Value = "120Hz" },
                    },
                Reviews = new List<ProductReview>
                    {
                        new ProductReview
                        {
                            ReviewerName = "John Doe",
                            Comment = "Great performance for gaming!",
                            Rating = 5,
                            CreatedAt = DateTime.UtcNow
                        }
                    },
                Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion
                        {
                            Question = "Does it support VR?",
                            Answer = "Yes, it supports VR.",
                            CreatedAt = DateTime.UtcNow
                        }
                    },
                Visits = new List<ProductVisit>
                    {
                        new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-1) },
                        new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-2) },
                        new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(+3) }
                    }
            };

            context.Products.Add(laptopProduct);
            context.SaveChanges();
        }
    }
}