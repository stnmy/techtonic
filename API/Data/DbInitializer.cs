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
                ?? throw new InvalidOperationException("Failed to retrieve ApplicationDbContext");
            SeedData(context);
        }

        private static void SeedData(ApplicationDbContext context)
        {
            context.Database.Migrate();

            if (context.Categories.Any() || context.Products.Any())
            {
                return;
            }

            // First, create all brands, categories, and subcategories
            var brands = new List<Brand>
            {
                new Brand { Name = "Asus", Slug = "asus" },
                new Brand { Name = "Lenovo", Slug = "lenovo" },
                new Brand { Name = "Corsair", Slug = "corsair" },
                new Brand { Name = "Razer", Slug = "razer" },
                new Brand { Name = "Apple", Slug = "apple" },
                new Brand { Name = "Samsung", Slug = "samsung" },
                new Brand { Name = "Sony", Slug = "sony" },
                new Brand { Name = "Xiaomi", Slug = "xiaomi" },
                new Brand { Name = "Amazfit", Slug = "amazfit" }
            };

            var categories = new List<Category>
            {
                new Category { Name = "Laptop", Slug = "laptop" },
                new Category { Name = "Monitor", Slug = "monitor" },
                new Category { Name = "Graphics Card", Slug = "graphics-card" },
                new Category { Name = "Processor", Slug = "processor" },
                new Category { Name = "Mobile", Slug = "mobile" },
                new Category { Name = "Keyboard", Slug = "keyboard" },
                new Category { Name = "Mouse", Slug = "mouse" },
                new Category { Name = "Smart Watch", Slug = "smart-watch" },
                new Category { Name = "Gaming Console", Slug = "gaming-console" },
                new Category { Name = "Bluetooth Earphone", Slug = "bluetooth-earphone" }
            };

            var subCategories = new List<SubCategory>
            {
                // Laptop subcategories
                new SubCategory { Name = "UltraBook", Slug = "ultrabook", Category = categories[0] },
                new SubCategory { Name = "Gaming", Slug = "gaming", Category = categories[0] },
                
                // Monitor subcategories
                new SubCategory { Name = "Gaming Monitor", Slug = "gaming-monitor", Category = categories[1] },
                new SubCategory { Name = "4K Monitor", Slug = "4k-monitor", Category = categories[1] },
                
                // Mobile subcategories
                new SubCategory { Name = "iPhone", Slug = "iphone", Category = categories[4] },
                new SubCategory { Name = "Android", Slug = "android", Category = categories[4] },
                
                // Keyboard subcategories
                new SubCategory { Name = "Mechanical", Slug = "mechanical", Category = categories[5] },
                
                // Mouse subcategories
                new SubCategory { Name = "Gaming Mouse", Slug = "gaming-mouse", Category = categories[6] },
                
                // Smart Watch subcategories
                new SubCategory { Name = "Fitness Tracker", Slug = "fitness-tracker", Category = categories[7] }
            };

            context.Brands.AddRange(brands);
            context.Categories.AddRange(categories);
            context.SubCategories.AddRange(subCategories);
            context.SaveChanges();
            var imageUrl = "https://www.startech.com.bd/image/cache/catalog/laptop/lenovo/legion-slim-5-16irh8/legion-slim-5-16irh8-01-500x500.webp";

            // Now create the products
            var products = new List<Product>
            {
                new Product
                {
                    Name = "Lenovo Yoga Slim 7 15ILL9 Core Ultra 7 15.3inch IPS Laptop",
                    Slug = "lenovo-yoga-slim-7-15ill9-core-ultra-7-laptop",
                    Description = "A premium ultrabook with stunning display and powerful performance.",
                    Price = 200000,
                    Brand = brands[1], // Lenovo
                    Category = categories[0], // Laptop
                    SubCategory = subCategories[0], // UltraBook
                    IsFeatured = true,
                    IsDealOfTheDay = false,
                    CreatedAt = DateTime.UtcNow,
                    ProductImages = new List<ProductImage>
                    {
                        new ProductImage { ImageUrl = imageUrl },
                        new ProductImage { ImageUrl = imageUrl }
                    },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Processor", Value = "Intel Core Ultra 7 258V", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "RAM", Value = "16GB LPDDR5x-8533", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Display", Value = "15.3Inch 2.8K WQXGA+ (2880x1800) IPS", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Storage", Value = "1TB SSD", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Battery Life", Value = "Up to 15 hours", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Weight", Value = "1.5 kg", SpecificationCategory = "General" },
                        new ProductAttributeValue { Name = "Operating System", Value = "Windows 11 Pro", SpecificationCategory = "Software" },
                        new ProductAttributeValue { Name = "Ports", Value = "2x USB-C, 2x USB-A, HDMI", SpecificationCategory = "Connectivity" },
                        new ProductAttributeValue { Name = "Graphics", Value = "Intel Arc Graphics", SpecificationCategory = "Graphics" },
                        new ProductAttributeValue { Name = "Warranty", Value = "2 years", SpecificationCategory = "Support" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview
                        {
                            ReviewerName = "Alex Johnson",
                            Comment = "Excellent build quality and performance",
                            Rating = 5,
                            CreatedAt = DateTime.UtcNow.AddDays(-10)
                        }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion
                        {
                            Question = "Does it support Thunderbolt 4?",
                            Answer = "Yes, both USB-C ports support Thunderbolt 4",
                            CreatedAt = DateTime.UtcNow.AddDays(-5)
                        }
                    },
                    Visits = new List<ProductVisit>
                    {
                        new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-2) }
                    }
                },

                // 2. Gaming Laptop - Asus ROG
                new Product
                {
                    Name = "ASUS ROG Strix G16 (2023) Gaming Laptop",
                    Slug = "asus-rog-strix-g16-gaming-laptop",
                    Description = "Powerful gaming laptop with high refresh rate display and RGB lighting.",
                    Price = 250000,
                    Brand = brands[0], // Asus
                    Category = categories[0], // Laptop
                    SubCategory = subCategories[1], // Gaming
                    IsFeatured = true,
                    IsDealOfTheDay = true,
                    CreatedAt = DateTime.UtcNow,
                    ProductImages = new List<ProductImage>
                    {
                        new ProductImage { ImageUrl = imageUrl },
                        new ProductImage { ImageUrl = imageUrl }
                    },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Processor", Value = "Intel Core i9-13980HX", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Graphics", Value = "NVIDIA GeForce RTX 4070 8GB GDDR6", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Display", Value = "16-inch QHD+ (2560 x 1600) 240Hz", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "RAM", Value = "32GB DDR5", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Cooling System", Value = "ROG Intelligent Cooling", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Storage", Value = "1TB PCIe 4.0 NVMe SSD", SpecificationCategory = "Storage" },
                        new ProductAttributeValue { Name = "Keyboard", Value = "RGB Backlit", SpecificationCategory = "Input" },
                        new ProductAttributeValue { Name = "Battery", Value = "90WHrs", SpecificationCategory = "Power" },
                        new ProductAttributeValue { Name = "Weight", Value = "2.5 kg", SpecificationCategory = "General" },
                        new ProductAttributeValue { Name = "Operating System", Value = "Windows 11 Home", SpecificationCategory = "Software" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview
                        {
                            ReviewerName = "GamerPro",
                            Comment = "Handles all AAA games at max settings",
                            Rating = 5,
                            CreatedAt = DateTime.UtcNow.AddDays(-7)
                        }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion
                        {
                            Question = "Is the RAM upgradable?",
                            Answer = "Yes, it has 2 SODIMM slots with one available for upgrade",
                            CreatedAt = DateTime.UtcNow.AddDays(-4)
                        }
                    },
                    Visits = new List<ProductVisit>
                    {
                        new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-3) }
                    }
                },

                // 3. Monitor - Samsung Odyssey
                new Product
                {
                    Name = "Samsung Odyssey G7 32-inch QHD Curved Gaming Monitor",
                    Slug = "samsung-odyssey-g7-32-inch-monitor",
                    Description = "1000R curved gaming monitor with 240Hz refresh rate and QHD resolution.",
                    Price = 80000,
                    Brand = brands[5], // Samsung
                    Category = categories[1], // Monitor
                    SubCategory = subCategories[2], // Gaming Monitor
                    IsFeatured = true,
                    IsDealOfTheDay = false,
                    CreatedAt = DateTime.UtcNow,
                    ProductImages = new List<ProductImage>
                    {
                        new ProductImage { ImageUrl = imageUrl },
                        new ProductImage { ImageUrl = imageUrl }
                    },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Screen Size", Value = "32-inch", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Resolution", Value = "2560x1440 (QHD)", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Refresh Rate", Value = "240Hz", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Curvature", Value = "1000R", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Response Time", Value = "1ms", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Panel Type", Value = "VA", SpecificationCategory = "Display" },
                        new ProductAttributeValue { Name = "Brightness", Value = "350 cd/m²", SpecificationCategory = "Display" },
                        new ProductAttributeValue { Name = "Ports", Value = "2x HDMI 2.0, 1x DisplayPort 1.4", SpecificationCategory = "Connectivity" },
                        new ProductAttributeValue { Name = "Adaptive Sync", Value = "NVIDIA G-SYNC Compatible", SpecificationCategory = "Features" },
                        new ProductAttributeValue { Name = "Stand Adjustment", Value = "Height, Tilt, Swivel", SpecificationCategory = "Ergonomics" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview
                        {
                            ReviewerName = "DisplayExpert",
                            Comment = "The curve is perfect for immersive gaming",
                            Rating = 4,
                            CreatedAt = DateTime.UtcNow.AddDays(-8)
                        }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion
                        {
                            Question = "Does this support HDR?",
                            Answer = "Yes, it supports HDR600",
                            CreatedAt = DateTime.UtcNow.AddDays(-6)
                        }
                    },
                    Visits = new List<ProductVisit>
                    {
                        new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-1) }
                    }
                },

                // 4. Graphics Card - Asus RTX 4090
                new Product
                {
                    Name = "ASUS ROG Strix GeForce RTX 4090 OC Edition",
                    Slug = "asus-rog-strix-rtx-4090",
                    Description = "The ultimate graphics card for 4K gaming and content creation.",
                    Price = 300000,
                    Brand = brands[0], // Asus
                    Category = categories[2], // Graphics Card
                    IsFeatured = true,
                    IsDealOfTheDay = false,
                    CreatedAt = DateTime.UtcNow,
                    ProductImages = new List<ProductImage>
                    {
                        new ProductImage { ImageUrl = imageUrl },
                        new ProductImage { ImageUrl = imageUrl }
                    },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "GPU", Value = "NVIDIA GeForce RTX 4090", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Video Memory", Value = "24GB GDDR6X", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "CUDA Cores", Value = "16384", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Boost Clock", Value = "2640 MHz (OC Mode)", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Cooling", Value = "Triple Axial-tech Fans", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Power Connectors", Value = "1x 16-pin", SpecificationCategory = "Power" },
                        new ProductAttributeValue { Name = "Recommended PSU", Value = "850W", SpecificationCategory = "Power" },
                        new ProductAttributeValue { Name = "Outputs", Value = "2x HDMI 2.1, 3x DisplayPort 1.4a", SpecificationCategory = "Connectivity" },
                        new ProductAttributeValue { Name = "Dimensions", Value = "357.6 x 149.3 x 70.1mm", SpecificationCategory = "Physical" },
                        new ProductAttributeValue { Name = "Warranty", Value = "3 years", SpecificationCategory = "Support" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview
                        {
                            ReviewerName = "PCBuilder",
                            Comment = "Absolute beast for 4K gaming",
                            Rating = 5,
                            CreatedAt = DateTime.UtcNow.AddDays(-9)
                        }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion
                        {
                            Question = "What power supply is recommended?",
                            Answer = "Minimum 850W PSU is recommended",
                            CreatedAt = DateTime.UtcNow.AddDays(-7)
                        }
                    },
                    Visits = new List<ProductVisit>
                    {
                        new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-4) }
                    }
                },

                // 5. Processor - Intel Core i9
                new Product
                {
                    Name = "Intel Core i9-14900K Processor",
                    Slug = "intel-core-i9-14900k",
                    Description = "The fastest gaming processor with 24 cores and 32 threads.",
                    Price = 70000,
                    Brand = brands[0], // Asus
                    Category = categories[3], // Processor
                    IsFeatured = true,
                    IsDealOfTheDay = false,
                    CreatedAt = DateTime.UtcNow,
                    ProductImages = new List<ProductImage>
                    {
                        new ProductImage { ImageUrl = imageUrl },
                        new ProductImage { ImageUrl = imageUrl }
                    },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Cores", Value = "24 (8P+16E)", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Threads", Value = "32", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Max Turbo Frequency", Value = "6.0 GHz", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Cache", Value = "36MB", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Unlocked", Value = "Yes", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Socket", Value = "LGA1700", SpecificationCategory = "Compatibility" },
                        new ProductAttributeValue { Name = "TDP", Value = "125W", SpecificationCategory = "Power" },
                        new ProductAttributeValue { Name = "Memory Support", Value = "DDR5-5600, DDR4-3200", SpecificationCategory = "Memory" },
                        new ProductAttributeValue { Name = "Integrated Graphics", Value = "Intel UHD Graphics 770", SpecificationCategory = "Graphics" },
                        new ProductAttributeValue { Name = "Warranty", Value = "3 years", SpecificationCategory = "Support" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview
                        {
                            ReviewerName = "Overclocker",
                            Comment = "Amazing performance for gaming and productivity",
                            Rating = 5,
                            CreatedAt = DateTime.UtcNow.AddDays(-12)
                        }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion
                        {
                            Question = "Does it come with a cooler?",
                            Answer = "No, you need to purchase a cooler separately",
                            CreatedAt = DateTime.UtcNow.AddDays(-8)
                        }
                    },
                    Visits = new List<ProductVisit>
                    {
                        new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-6) }
                    }
                },

                // 6. Mobile - iPhone 15 Pro
                new Product
                {
                    Name = "Apple iPhone 15 Pro 256GB",
                    Slug = "apple-iphone-15-pro-256gb",
                    Description = "The most advanced iPhone with A17 Pro chip and titanium design.",
                    Price = 150000,
                    Brand = brands[4], // Apple
                    Category = categories[4], // Mobile
                    SubCategory = subCategories[4], // iPhone
                    IsFeatured = true,
                    IsDealOfTheDay = true,
                    CreatedAt = DateTime.UtcNow,
                    ProductImages = new List<ProductImage>
                    {
                        new ProductImage { ImageUrl = imageUrl },
                        new ProductImage { ImageUrl = imageUrl }
                    },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Chip", Value = "A17 Pro", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Display", Value = "6.1-inch Super Retina XDR", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Camera System", Value = "Pro 48MP Main + 12MP Ultra Wide + 12MP Telephoto", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Storage", Value = "256GB", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Build", Value = "Titanium with textured matte glass back", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Battery Life", Value = "Up to 23 hours video playback", SpecificationCategory = "Battery" },
                        new ProductAttributeValue { Name = "Water Resistance", Value = "IP68", SpecificationCategory = "Durability" },
                        new ProductAttributeValue { Name = "Operating System", Value = "iOS 17", SpecificationCategory = "Software" },
                        new ProductAttributeValue { Name = "5G", Value = "Yes", SpecificationCategory = "Connectivity" },
                        new ProductAttributeValue { Name = "Colors", Value = "Black Titanium, White Titanium, Blue Titanium, Natural Titanium", SpecificationCategory = "Design" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview
                        {
                            ReviewerName = "AppleFan",
                            Comment = "The titanium build feels premium and durable",
                            Rating = 5,
                            CreatedAt = DateTime.UtcNow.AddDays(-5)
                        }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion
                        {
                            Question = "Does it support USB-C fast charging?",
                            Answer = "Yes, supports up to 27W fast charging",
                            CreatedAt = DateTime.UtcNow.AddDays(-3)
                        }
                    },
                    Visits = new List<ProductVisit>
                    {
                        new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-2) }
                    }
                },

                // 7. Keyboard - Corsair K100
                new Product
                {
                    Name = "Corsair K100 RGB Mechanical Gaming Keyboard",
                    Slug = "corsair-k100-rgb-mechanical-keyboard",
                    Description = "Premium mechanical keyboard with OPX optical-mechanical switches.",
                    Price = 25000,
                    Brand = brands[2], // Corsair
                    Category = categories[5], // Keyboard
                    SubCategory = subCategories[6], // Mechanical
                    IsFeatured = false,
                    IsDealOfTheDay = false,
                    CreatedAt = DateTime.UtcNow,
                    ProductImages = new List<ProductImage>
                    {
                        new ProductImage { ImageUrl = imageUrl },
                        new ProductImage { ImageUrl = imageUrl }
                    },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Switch Type", Value = "OPX Optical-Mechanical", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Lighting", Value = "Per-key RGB", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Polling Rate", Value = "4000Hz", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Construction", Value = "Aircraft-grade aluminum frame", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Media Controls", Value = "Dedicated multimedia and volume roller", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Keycaps", Value = "Double-shot PBT", SpecificationCategory = "Design" },
                        new ProductAttributeValue { Name = "USB Passthrough", Value = "Yes", SpecificationCategory = "Connectivity" },
                        new ProductAttributeValue { Name = "Cable", Value = "Detachable braided fiber", SpecificationCategory = "Design" },
                        new ProductAttributeValue { Name = "Dimensions", Value = "472.5 x 165 x 39.5mm", SpecificationCategory = "Physical" },
                        new ProductAttributeValue { Name = "Weight", Value = "1.35kg", SpecificationCategory = "Physical" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview
                        {
                            ReviewerName = "KeyboardEnthusiast",
                            Comment = "The optical switches are incredibly responsive",
                            Rating = 4,
                            CreatedAt = DateTime.UtcNow.AddDays(-11)
                        }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion
                        {
                            Question = "Is this keyboard wireless?",
                            Answer = "No, this is a wired keyboard",
                            CreatedAt = DateTime.UtcNow.AddDays(-9)
                        }
                    },
                    Visits = new List<ProductVisit>
                    {
                        new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-5) }
                    }
                },

                // 8. Mouse - Razer Viper
                new Product
                {
                    Name = "Razer Viper V2 Pro Wireless Gaming Mouse",
                    Slug = "razer-viper-v2-pro-wireless",
                    Description = "Ultra-lightweight wireless mouse with Focus Pro 30K optical sensor.",
                    Price = 15000,
                    Brand = brands[3], // Razer
                    Category = categories[6], // Mouse
                    SubCategory = subCategories[7], // Gaming Mouse
                    IsFeatured = false,
                    IsDealOfTheDay = false,
                    CreatedAt = DateTime.UtcNow,
                    ProductImages = new List<ProductImage>
                    {
                        new ProductImage { ImageUrl = imageUrl },
                        new ProductImage { ImageUrl = imageUrl }
                    },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Sensor", Value = "Focus Pro 30K Optical", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Weight", Value = "58g", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Connectivity", Value = "HyperSpeed Wireless & Bluetooth", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Battery Life", Value = "Up to 80 hours", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Switches", Value = "Optical Mouse Gen-3", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "DPI", Value = "30000", SpecificationCategory = "Performance" },
                        new ProductAttributeValue { Name = "IPS", Value = "750", SpecificationCategory = "Performance" },
                        new ProductAttributeValue { Name = "Buttons", Value = "8 programmable", SpecificationCategory = "Design" },
                        new ProductAttributeValue { Name = "Grip Type", Value = "Ambidextrous", SpecificationCategory = "Design" },
                        new ProductAttributeValue { Name = "Color", Value = "Black", SpecificationCategory = "Design" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview
                        {
                            ReviewerName = "ProGamer",
                            Comment = "Perfect for FPS games with its lightweight design",
                            Rating = 5,
                            CreatedAt = DateTime.UtcNow.AddDays(-14)
                        }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion
                        {
                            Question = "Does it work with Mac computers?",
                            Answer = "Yes, it works with both Windows and Mac",
                            CreatedAt = DateTime.UtcNow.AddDays(-10)
                        }
                    },
                    Visits = new List<ProductVisit>
                    {
                        new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-7) }
                    }
                },

                // 9. Smart Watch - Apple Watch Ultra
                new Product
                {
                    Name = "Apple Watch Ultra 2 (GPS + Cellular)",
                    Slug = "apple-watch-ultra-2",
                    Description = "The most rugged and capable Apple Watch for extreme adventures.",
                    Price = 120000,
                    Brand = brands[4], // Apple
                    Category = categories[7], // Smart Watch
                    SubCategory = subCategories[8], // Fitness Tracker
                    IsFeatured = true,
                    IsDealOfTheDay = false,
                    CreatedAt = DateTime.UtcNow,
                    ProductImages = new List<ProductImage>
                    {
                        new ProductImage { ImageUrl = imageUrl },
                        new ProductImage { ImageUrl = imageUrl }
                    },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Display", Value = "49mm Always-On Retina", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Chip", Value = "S9 SiP", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Battery Life", Value = "Up to 36 hours", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Durability", Value = "Titanium case, 100m water resistant", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Health Sensors", Value = "ECG, Blood Oxygen, Temperature", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Connectivity", Value = "GPS + Cellular", SpecificationCategory = "Connectivity" },
                        new ProductAttributeValue { Name = "Strap", Value = "Alpine Loop (included)", SpecificationCategory = "Design" },
                        new ProductAttributeValue { Name = "Operating System", Value = "watchOS 10", SpecificationCategory = "Software" },
                        new ProductAttributeValue { Name = "Storage", Value = "64GB", SpecificationCategory = "Memory" },
                        new ProductAttributeValue { Name = "Colors", Value = "Titanium", SpecificationCategory = "Design" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview
                        {
                            ReviewerName = "OutdoorEnthusiast",
                            Comment = "Perfect for hiking and outdoor activities",
                            Rating = 5,
                            CreatedAt = DateTime.UtcNow.AddDays(-6)
                        }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion
                        {
                            Question = "Can I swim with this watch?",
                            Answer = "Yes, it's water resistant up to 100 meters",
                            CreatedAt = DateTime.UtcNow.AddDays(-4)
                        }
                    },
                    Visits = new List<ProductVisit>
                    {
                        new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-3) }
                    }
                },

                // 10. Gaming Console - Sony PS5
                new Product
                {
                    Name = "Sony PlayStation 5 Digital Edition",
                    Slug = "sony-playstation-5-digital",
                    Description = "Next-gen gaming console with ultra-high speed SSD.",
                    Price = 60000,
                    Brand = brands[6], // Sony
                    Category = categories[8], // Gaming Console
                    IsFeatured = true,
                    IsDealOfTheDay = true,
                    CreatedAt = DateTime.UtcNow,
                    ProductImages = new List<ProductImage>
                    {
                        new ProductImage { ImageUrl = imageUrl },
                        new ProductImage { ImageUrl = imageUrl }
                    },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "CPU", Value = "AMD Zen 2, 8-core/16-thread", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "GPU", Value = "AMD RDNA 2, 10.28 TFLOPs", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Memory", Value = "16GB GDDR6", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Storage", Value = "825GB Custom SSD", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Resolution", Value = "Up to 8K", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Ray Tracing", Value = "Yes", SpecificationCategory = "Graphics" },
                        new ProductAttributeValue { Name = "Backward Compatibility", Value = "PS4 games", SpecificationCategory = "Features" },
                        new ProductAttributeValue { Name = "Controller", Value = "DualSense Wireless Controller", SpecificationCategory = "Included" },
                        new ProductAttributeValue { Name = "Dimensions", Value = "390 x 260 x 104mm", SpecificationCategory = "Physical" },
                        new ProductAttributeValue { Name = "Weight", Value = "3.9kg", SpecificationCategory = "Physical" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview
                        {
                            ReviewerName = "ConsoleGamer",
                            Comment = "The SSD makes loading times almost non-existent",
                            Rating = 5,
                            CreatedAt = DateTime.UtcNow.AddDays(-13)
                        }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion
                        {
                            Question = "Does this version support physical discs?",
                            Answer = "No, this is the digital-only version",
                            CreatedAt = DateTime.UtcNow.AddDays(-11)
                        }
                    },
                    Visits = new List<ProductVisit>
                    {
                        new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-8) }
                    }
                },

                // 11. Bluetooth Earphone - Sony WH-1000XM5
                new Product
                {
                    Name = "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
                    Slug = "sony-wh-1000xm5",
                    Description = "Industry-leading noise cancellation with exceptional sound quality.",
                    Price = 45000,
                    Brand = brands[6], // Sony
                    Category = categories[9], // Bluetooth Earphone
                    IsFeatured = false,
                    IsDealOfTheDay = false,
                    CreatedAt = DateTime.UtcNow,
                    ProductImages = new List<ProductImage>
                    {
                        new ProductImage { ImageUrl = imageUrl },
                        new ProductImage { ImageUrl = imageUrl }
                    },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Noise Cancellation", Value = "Industry-leading ANC", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Battery Life", Value = "Up to 30 hours (ANC on)", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Quick Charge", Value = "3 mins = 3 hours playback", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Sound Quality", Value = "High-Resolution Audio", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Microphones", Value = "8 for calls and ANC", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Weight", Value = "250g", SpecificationCategory = "Physical" },
                        new ProductAttributeValue { Name = "Bluetooth Version", Value = "5.2", SpecificationCategory = "Connectivity" },
                        new ProductAttributeValue { Name = "Touch Controls", Value = "Yes", SpecificationCategory = "Features" },
                        new ProductAttributeValue { Name = "Foldable", Value = "Yes", SpecificationCategory = "Design" },
                        new ProductAttributeValue { Name = "Colors", Value = "Black, Silver", SpecificationCategory = "Design" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview
                        {
                            ReviewerName = "Audiophile",
                            Comment = "Best noise cancellation I've ever experienced",
                            Rating = 5,
                            CreatedAt = DateTime.UtcNow.AddDays(-15)
                        }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion
                        {
                            Question = "Can I use these wired?",
                            Answer = "Yes, they include a 3.5mm audio cable",
                            CreatedAt = DateTime.UtcNow.AddDays(-12)
                        }
                    },
                    Visits = new List<ProductVisit>
                    {
                        new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-9) }
                    }
                },

                // 12. Monitor - Asus ProArt
                new Product
                {
                    Name = "ASUS ProArt PA32UCX 32-inch 4K HDR Monitor",
                    Slug = "asus-proart-pa32ucx",
                    Description = "Professional 4K HDR monitor with 99% Adobe RGB coverage.",
                    Price = 250000,
                    Brand = brands[0], // Asus
                    Category = categories[1], // Monitor
                    SubCategory = subCategories[3], // 4K Monitor
                    IsFeatured = false,
                    IsDealOfTheDay = false,
                    CreatedAt = DateTime.UtcNow,
                    ProductImages = new List<ProductImage>
                    {
                        new ProductImage { ImageUrl = imageUrl },
                        new ProductImage { ImageUrl = imageUrl }
                    },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Resolution", Value = "3840 x 2160 (4K UHD)", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Color Gamut", Value = "99% Adobe RGB, 99% DCI-P3", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "HDR", Value = "Dolby Vision, HDR10, HLG", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Brightness", Value = "1200 cd/m² peak", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Panel Type", Value = "IPS", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Refresh Rate", Value = "60Hz", SpecificationCategory = "Display" },
                        new ProductAttributeValue { Name = "Response Time", Value = "5ms", SpecificationCategory = "Display" },
                        new ProductAttributeValue { Name = "Ports", Value = "Thunderbolt 3, HDMI 2.0, DisplayPort 1.4", SpecificationCategory = "Connectivity" },
                        new ProductAttributeValue { Name = "Calibration", Value = "Factory calibrated", SpecificationCategory = "Features" },
                        new ProductAttributeValue { Name = "Stand Adjustment", Value = "Height, tilt, swivel, pivot", SpecificationCategory = "Ergonomics" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview
                        {
                            ReviewerName = "DesignPro",
                            Comment = "Perfect color accuracy for graphic design work",
                            Rating = 5,
                            CreatedAt = DateTime.UtcNow.AddDays(-16)
                        }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion
                        {
                            Question = "Is this suitable for video editing?",
                            Answer = "Yes, it's excellent for color-critical video work",
                            CreatedAt = DateTime.UtcNow.AddDays(-14)
                        }
                    },
                    Visits = new List<ProductVisit>
                    {
                        new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-10) }
                    }
                },

                // 13. Mobile - Samsung Galaxy S23 Ultra
                new Product
                {
                    Name = "Samsung Galaxy S23 Ultra 12GB/512GB",
                    Slug = "samsung-galaxy-s23-ultra",
                    Description = "Flagship smartphone with 200MP camera and S Pen support.",
                    Price = 180000,
                    Brand = brands[5], // Samsung
                    Category = categories[4], // Mobile
                    SubCategory = subCategories[5], // Android
                    IsFeatured = true,
                    IsDealOfTheDay = false,
                    CreatedAt = DateTime.UtcNow,
                    ProductImages = new List<ProductImage>
                    {
                        new ProductImage { ImageUrl = imageUrl },
                        new ProductImage { ImageUrl = imageUrl }
                    },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Processor", Value = "Snapdragon 8 Gen 2", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Display", Value = "6.8-inch Dynamic AMOLED 2X, 120Hz", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Camera", Value = "200MP main + 12MP ultra wide + 10MP telephoto x2", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "S Pen", Value = "Included", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Battery", Value = "5000mAh", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "RAM", Value = "12GB", SpecificationCategory = "Memory" },
                        new ProductAttributeValue { Name = "Storage", Value = "512GB", SpecificationCategory = "Memory" },
                        new ProductAttributeValue { Name = "Water Resistance", Value = "IP68", SpecificationCategory = "Durability" },
                        new ProductAttributeValue { Name = "Operating System", Value = "Android 13", SpecificationCategory = "Software" },
                        new ProductAttributeValue { Name = "Colors", Value = "Phantom Black, Cream, Green, Lavender", SpecificationCategory = "Design" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview
                        {
                            ReviewerName = "MobilePhotographer",
                            Comment = "The 200MP camera captures incredible detail",
                            Rating = 5,
                            CreatedAt = DateTime.UtcNow.AddDays(-17)
                        }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion
                        {
                            Question = "Does it support expandable storage?",
                            Answer = "No, it doesn't have a microSD slot",
                            CreatedAt = DateTime.UtcNow.AddDays(-15)
                        }
                    },
                    Visits = new List<ProductVisit>
                    {
                        new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-11) }
                    }
                },

                // 14. Smart Watch - Amazfit GTR 4
                new Product
                {
                    Name = "Amazfit GTR 4 Smart Watch",
                    Slug = "amazfit-gtr-4",
                    Description = "Premium smartwatch with 14-day battery life and built-in GPS.",
                    Price = 25000,
                    Brand = brands[8], // Amazfit
                    Category = categories[7], // Smart Watch
                    SubCategory = subCategories[8], // Fitness Tracker
                    IsFeatured = false,
                    IsDealOfTheDay = false,
                    CreatedAt = DateTime.UtcNow,
                    ProductImages = new List<ProductImage>
                    {
                        new ProductImage { ImageUrl = imageUrl },
                        new ProductImage { ImageUrl = imageUrl }
                    },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Battery Life", Value = "Up to 14 days", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Display", Value = "1.43-inch AMOLED", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "GPS", Value = "Dual-band GPS", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Health Monitoring", Value = "Heart rate, blood oxygen, sleep", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Water Resistance", Value = "5ATM", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Compatibility", Value = "Android & iOS", SpecificationCategory = "Connectivity" },
                        new ProductAttributeValue { Name = "Workout Modes", Value = "150+", SpecificationCategory = "Fitness" },
                        new ProductAttributeValue { Name = "Weight", Value = "34g", SpecificationCategory = "Physical" },
                        new ProductAttributeValue { Name = "Materials", Value = "Aluminum alloy case", SpecificationCategory = "Design" },
                        new ProductAttributeValue { Name = "Colors", Value = "Infinite Black, Brown Leather", SpecificationCategory = "Design" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview
                        {
                            ReviewerName = "FitnessTracker",
                            Comment = "The battery life is truly impressive",
                            Rating = 4,
                            CreatedAt = DateTime.UtcNow.AddDays(-18)
                        }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion
                        {
                            Question = "Can I make payments with this watch?",
                            Answer = "Yes, it supports NFC payments",
                            CreatedAt = DateTime.UtcNow.AddDays(-16)
                        }
                    },
                    Visits = new List<ProductVisit>
                    {
                        new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-12) }
                    }
                },

                // 15. Bluetooth Earphone - Xiaomi Buds 4 Pro
                new Product
                {
                    Name = "Xiaomi Buds 4 Pro True Wireless Earbuds",
                    Slug = "xiaomi-buds-4-pro",
                    Description = "Premium TWS earbuds with active noise cancellation.",
                    Price = 15000,
                    Brand = brands[7], // Xiaomi
                    Category = categories[9], // Bluetooth Earphone
                    IsFeatured = false,
                    IsDealOfTheDay = true,
                    CreatedAt = DateTime.UtcNow,
                    ProductImages = new List<ProductImage>
                    {
                        new ProductImage { ImageUrl = imageUrl },
                        new ProductImage { ImageUrl = imageUrl }
                    },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Noise Cancellation", Value = "Active Noise Cancellation (ANC)", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Battery Life", Value = "9 hours (ANC off), 6 hours (ANC on)", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Driver Size", Value = "11mm dynamic drivers", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Bluetooth Version", Value = "5.3", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Water Resistance", Value = "IP54", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Codecs", Value = "LDAC, AAC, SBC", SpecificationCategory = "Audio" },
                        new ProductAttributeValue { Name = "Charging Case", Value = "Yes, wireless charging", SpecificationCategory = "Battery" },
                        new ProductAttributeValue { Name = "Touch Controls", Value = "Yes", SpecificationCategory = "Features" },
                        new ProductAttributeValue { Name = "Weight", Value = "5g per earbud", SpecificationCategory = "Physical" },
                        new ProductAttributeValue { Name = "Colors", Value = "Black, White", SpecificationCategory = "Design" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview
                        {
                            ReviewerName = "AudioLover",
                            Comment = "Great sound quality for the price",
                            Rating = 4,
                            CreatedAt = DateTime.UtcNow.AddDays(-19)
                        }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion
                        {
                            Question = "Do these support multipoint connection?",
                            Answer = "Yes, they can connect to two devices simultaneously",
                            CreatedAt = DateTime.UtcNow.AddDays(-17)
                        }
                    },
                    Visits = new List<ProductVisit>
                    {
                        new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-13) }
                    }
                }
            };

            context.Products.AddRange(products);
            context.SaveChanges();

        }
    }
}
