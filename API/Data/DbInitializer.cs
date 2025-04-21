using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
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
                new Brand { Name = "Amazfit", Slug = "amazfit" },
                new Brand { Name = "Intel", Slug = "intel" }
            };

            var categories = new List<Category>
            {
                new Category
                {
                    Name = "Laptop",
                    Slug = "laptop",
                    Filters = new List<FilterAttribute>
                    {
                        new FilterAttribute { FilterName = "Category", FilterSlug = "category", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "Ultrabook" },
                                new FilterAttributeValue { Value = "Gaming" },
                                new FilterAttributeValue { Value = "2-in-1 Convertible" },
                                new FilterAttributeValue { Value = "Traditional Laptop" }
                            }
                        },
                        new FilterAttribute { FilterName = "Processor Type", FilterSlug = "processor-type", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "Intel Core i7" },
                                new FilterAttributeValue { Value = "AMD Ryzen 9" },
                                new FilterAttributeValue { Value = "AMD Ryzen 5" },
                                new FilterAttributeValue { Value = "Intel Core i5" },
                                new FilterAttributeValue { Value = "Intel Core i3" },
                                new FilterAttributeValue { Value = "AMD Ryzen 7" }
                            }
                        },
                        new FilterAttribute { FilterName = "Processor Model", FilterSlug = "processor-model", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "1165G7" },
                                new FilterAttributeValue { Value = "5900HX" },
                                new FilterAttributeValue { Value = "5500U" },
                                new FilterAttributeValue { Value = "12500H" },
                                new FilterAttributeValue { Value = "13700H" },
                                new FilterAttributeValue { Value = "7730U" },
                                new FilterAttributeValue { Value = "Other" }
                            }
                        },
                        new FilterAttribute { FilterName = "Generation/Series", FilterSlug = "generation-series", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "11th Gen" },
                                new FilterAttributeValue { Value = "12th Gen" },
                                new FilterAttributeValue { Value = "13th Gen" },
                                new FilterAttributeValue { Value = "14th Gen" },
                                new FilterAttributeValue { Value = "Ryzen 5000 Series" },
                                new FilterAttributeValue { Value = "Ryzen 6000 Series" },
                                new FilterAttributeValue { Value = "Ryzen 7000 Series" }
                            }
                        },
                        new FilterAttribute { FilterName = "Display Type", FilterSlug = "display-type", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "IPS" },
                                new FilterAttributeValue { Value = "Touch Display" },
                                new FilterAttributeValue { Value = "OLED" },
                                new FilterAttributeValue { Value = "TN" },
                                new FilterAttributeValue { Value = "VA" }
                            }
                        },
                        new FilterAttribute { FilterName = "Display Size", FilterSlug = "display-size", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "14\"" },
                                new FilterAttributeValue { Value = "15.6\"" },
                                new FilterAttributeValue { Value = "13.3\"" },
                                new FilterAttributeValue { Value = "16\"" },
                                new FilterAttributeValue { Value = "17.3\"" }
                            }
                        },
                        new FilterAttribute { FilterName = "RAM Size", FilterSlug = "ram-size", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "16GB" },
                                new FilterAttributeValue { Value = "8GB" },
                                new FilterAttributeValue { Value = "4GB" },
                                new FilterAttributeValue { Value = "12GB" },
                                new FilterAttributeValue { Value = "32GB" }
                            }
                        },
                        new FilterAttribute { FilterName = "RAM Type", FilterSlug = "ram-type", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "LPDDR4X" },
                                new FilterAttributeValue { Value = "DDR4" },
                                new FilterAttributeValue { Value = "DDR5" },
                                new FilterAttributeValue { Value = "LPDDR5" }
                            }
                        },
                        new FilterAttribute { FilterName = "HDD", FilterSlug = "hdd", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "None" },
                                new FilterAttributeValue { Value = "500GB" },
                                new FilterAttributeValue { Value = "1TB" },
                                new FilterAttributeValue { Value = "2TB" }
                            }
                        },
                        new FilterAttribute { FilterName = "SSD", FilterSlug = "ssd", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "512GB" },
                                new FilterAttributeValue { Value = "1TB" },
                                new FilterAttributeValue { Value = "128GB" },
                                new FilterAttributeValue { Value = "256GB" },
                                new FilterAttributeValue { Value = "2TB" },
                                new FilterAttributeValue { Value = "4TB" }
                            }
                        },
                        new FilterAttribute { FilterName = "Graphics", FilterSlug = "graphics-memory", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "Intel Iris Xe" },
                                new FilterAttributeValue { Value = "NVIDIA RTX 3060" },
                                new FilterAttributeValue { Value = "NVIDIA RTX 4070" },
                                new FilterAttributeValue { Value = "AMD Radeon Graphics" },
                                new FilterAttributeValue { Value = "NVIDIA MX Series" }
                            }
                        },
                        new FilterAttribute { FilterName = "Operating System", FilterSlug = "operating-system", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "Windows 11 Pro" },
                                new FilterAttributeValue { Value = "Windows 11 Home" },
                                new FilterAttributeValue { Value = "Windows 10 Pro" },
                                new FilterAttributeValue { Value = "Windows 10 Home" },
                                new FilterAttributeValue { Value = "macOS" },
                                new FilterAttributeValue { Value = "ChromeOS" },
                                new FilterAttributeValue { Value = "Linux" }
                            }
                        },
                        new FilterAttribute { FilterName = "Special Feature", FilterSlug = "feature", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "Backlit Keyboard" },
                                new FilterAttributeValue { Value = "Fingerprint Reader" },
                                new FilterAttributeValue { Value = "RGB Keyboard" },
                                new FilterAttributeValue { Value = "Adaptive Sync" },
                                new FilterAttributeValue { Value = "Stylus Support" },
                                new FilterAttributeValue { Value = "Convertible" },
                                new FilterAttributeValue { Value = "Thin and Light" },
                                new FilterAttributeValue { Value = "High Refresh Rate Display" }
                            }
                        }
                    }
                },
                new Category
                {
                    Name = "Monitor",
                    Slug = "monitor",
                    Filters = new List<FilterAttribute>
                    {
                        new FilterAttribute { FilterName = "Screen Size", FilterSlug="screen-size", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "27\"" },
                                new FilterAttributeValue { Value = "32\"" },
                                new FilterAttributeValue { Value = "24\"" },
                                new FilterAttributeValue { Value = "34\"" },
                                new FilterAttributeValue { Value = "49\"" }
                            }
                        },
                        new FilterAttribute { FilterName = "Resolution", FilterSlug= "resolution", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "QHD (2560x1440)" },
                                new FilterAttributeValue { Value = "4K UHD (3840x2160)" },
                                new FilterAttributeValue { Value = "FHD (1920x1080)" },
                                new FilterAttributeValue { Value = "UWQHD (3440x1440)" },
                                new FilterAttributeValue { Value = "5K (5120x2880)" }
                            }
                        },
                        new FilterAttribute { FilterName = "Panel Type", FilterSlug="panel-type", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "VA" },
                                new FilterAttributeValue { Value = "IPS" },
                                new FilterAttributeValue { Value = "TN" },
                                new FilterAttributeValue { Value = "OLED" }
                            }
                        },
                        new FilterAttribute { FilterName = "Refresh Rate", FilterSlug="refresh-rate", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "240Hz" },
                                new FilterAttributeValue { Value = "165Hz" },
                                new FilterAttributeValue { Value = "60Hz" },
                                new FilterAttributeValue { Value = "75Hz" },
                                new FilterAttributeValue { Value = "144Hz" },
                                new FilterAttributeValue { Value = "360Hz" }
                            }
                        },
                        new FilterAttribute { FilterName = "Response Time", FilterSlug="response-time", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "1ms (GtG)" },
                                new FilterAttributeValue { Value = "1ms (MPRT)" },
                                new FilterAttributeValue { Value = "4ms (GtG)" },
                                new FilterAttributeValue { Value = "5ms" },
                                new FilterAttributeValue { Value = "Faster than 1ms" }
                            }
                        },
                        new FilterAttribute { FilterName = "Input Type", FilterSlug="input-type", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "HDMI" },
                                new FilterAttributeValue { Value = "DisplayPort" },
                                new FilterAttributeValue { Value = "USB-C" },
                                new FilterAttributeValue { Value = "VGA" },
                                new FilterAttributeValue { Value = "DVI" }
                            }
                        },
                        new FilterAttribute { FilterName = "Features", FilterSlug="feature", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "NVIDIA G-SYNC Compatible" },
                                new FilterAttributeValue { Value = "AMD FreeSync Premium Pro" },
                                new FilterAttributeValue { Value = "ELMB Sync" },
                                new FilterAttributeValue { Value = "Picture-by-Picture" },
                                new FilterAttributeValue { Value = "Picture-in-Picture" },
                                new FilterAttributeValue { Value = "Curved" },
                                new FilterAttributeValue { Value = "HDR Support" },
                                new FilterAttributeValue { Value = "Built-in Speakers" }
                            }
                        },
                    }
                },
                new Category
                {
                    Name = "Graphics Card",
                    Slug = "graphics-card",
                    Filters = new List<FilterAttribute>
                    {
                        new FilterAttribute { FilterName = "Chipset", FilterSlug="chipset", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "NVIDIA GeForce RTX 4080" },
                                new FilterAttributeValue { Value = "NVIDIA GeForce RTX 4090" },
                                new FilterAttributeValue { Value = "NVIDIA GeForce RTX 4070" },
                                new FilterAttributeValue { Value = "AMD Radeon RX 7900 XTX" },
                                new FilterAttributeValue { Value = "AMD Radeon RX 7800 XT" },
                                new FilterAttributeValue { Value = "NVIDIA GeForce GTX 1650" },
                                new FilterAttributeValue { Value = "Other" }
                            }
                        },
                        new FilterAttribute { FilterName = "Memory", FilterSlug="memory", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "16GB" },
                                new FilterAttributeValue { Value = "8GB" },
                                new FilterAttributeValue { Value = "10GB" },
                                new FilterAttributeValue { Value = "12GB" },
                                new FilterAttributeValue { Value = "20GB" },
                                new FilterAttributeValue { Value = "24GB" }
                            }
                        },
                        new FilterAttribute { FilterName = "Memory Type", FilterSlug="memory-type", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "GDDR6X" },
                                new FilterAttributeValue { Value = "GDDR6" },
                                new FilterAttributeValue { Value = "GDDR5" }
                            }
                        },
                        new FilterAttribute { FilterName = "Max Resolution", FilterSlug="max-resolution", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "7680 x 4320" },
                                new FilterAttributeValue { Value = "3840 x 2160" },
                                new FilterAttributeValue { Value = "5120 x 1440" }
                            }
                        }
                    }
                },
                new Category
                {
                    Name = "Processor",
                    Slug = "processor",
                    Filters = new List<FilterAttribute>
                    {
                        new FilterAttribute { FilterName = "Socket", FilterSlug="socket", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "LGA 1700" },
                                new FilterAttributeValue { Value = "AM5" },
                                new FilterAttributeValue { Value = "AM4" },
                                new FilterAttributeValue { Value = "LGA 1200" },
                                new FilterAttributeValue { Value = "LGA 1151" }
                            }
                        },
                        new FilterAttribute { FilterName = "Number of Core", FilterSlug="number-of-core", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "4" },
                                new FilterAttributeValue { Value = "6" },
                                new FilterAttributeValue { Value = "8" },
                                new FilterAttributeValue { Value = "10" },
                                new FilterAttributeValue { Value = "16" },
                                new FilterAttributeValue { Value = "24+" }
                            }
                        },
                        new FilterAttribute { FilterName = "Number of Thread", FilterSlug="number-of-thread", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "8" },
                                new FilterAttributeValue { Value = "12" },
                                new FilterAttributeValue { Value = "16" },
                                new FilterAttributeValue { Value = "20" },
                                new FilterAttributeValue { Value = "32" },
                                new FilterAttributeValue { Value = "32+" }
                            }
                        },
                        new FilterAttribute { FilterName = "Clock Speed", FilterSlug="clock-speed", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "Below 3.0 GHz" },
                                new FilterAttributeValue { Value = "3.0 GHz - 4.0 GHz" },
                                new FilterAttributeValue { Value = "4.0 GHz - 5.0 GHz" },
                                new FilterAttributeValue { Value = "5.0 GHz+" }
                            }
                        },
                        new FilterAttribute { FilterName = "Cache", FilterSlug="cache", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "L3 Cache 8MB+" },
                                new FilterAttributeValue { Value = "L3 Cache 16MB+" },
                                new FilterAttributeValue { Value = "L3 Cache 32MB+" }
                            }
                        },
                    }
                },
                new Category
                {
                    Name = "Mobile",
                    Slug = "mobile",
                    Filters = new List<FilterAttribute>
                    {
                        new FilterAttribute { FilterName = "Display Size", FilterSlug="display-size", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "6.1\"" },
                                new FilterAttributeValue { Value = "6.8\"" },
                                new FilterAttributeValue { Value = "6.67\"" },
                                new FilterAttributeValue { Value = "5.5\"" },
                                new FilterAttributeValue { Value = "6.5\"" },
                                new FilterAttributeValue { Value = "7.0+\"" }
                            }
                        },
                        new FilterAttribute { FilterName = "Display Type", FilterSlug="display-type", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "Super Retina XDR OLED" },
                                new FilterAttributeValue { Value = "Dynamic AMOLED 2X" },
                                new FilterAttributeValue { Value = "AMOLED 120Hz" },
                                new FilterAttributeValue { Value = "IPS LCD" },
                                new FilterAttributeValue { Value = "OLED" }
                            }
                        },
                        new FilterAttribute { FilterName = "Chipset", FilterSlug="chipset", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "A16 Bionic" },
                                new FilterAttributeValue { Value = "Snapdragon 8 Gen 2 for Galaxy" },
                                new FilterAttributeValue { Value = "MediaTek Dimensity 1080" },
                                new FilterAttributeValue { Value = "A15 Bionic" },
                                new FilterAttributeValue { Value = "Snapdragon 8 Gen 3" },
                                new FilterAttributeValue { Value = "MediaTek Dimensity 9200" },
                                new FilterAttributeValue { Value = "Exynos" },
                                new FilterAttributeValue { Value = "Other" }
                            }
                        },
                        new FilterAttribute { FilterName = "RAM", FilterSlug="ram", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "12GB" },
                                new FilterAttributeValue { Value = "8GB" },
                                new FilterAttributeValue { Value = "4GB" },
                                new FilterAttributeValue { Value = "6GB" },
                                new FilterAttributeValue { Value = "16GB" }
                            }
                        },
                        new FilterAttribute { FilterName = "Internal Storage", FilterSlug="internal-storage", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "128GB" },
                                new FilterAttributeValue { Value = "256GB" },
                                new FilterAttributeValue { Value = "64GB" },
                                new FilterAttributeValue { Value = "512GB" },
                                new FilterAttributeValue { Value = "1TB" }
                            }
                        },
                        new FilterAttribute { FilterName = "Clock Speed", FilterSlug="clock-speed", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "Below 2.0 GHz" },
                                new FilterAttributeValue { Value = "2.0 GHz - 3.0 GHz" },
                                new FilterAttributeValue { Value = "Above 3.0 GHz" }
                            }
                        },
                        new FilterAttribute { FilterName = "Battery", FilterSlug="battery", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "5000 mAh" },
                                new FilterAttributeValue { Value = "4980 mAh" },
                                new FilterAttributeValue { Value = "3000-4000 mAh" },
                                new FilterAttributeValue { Value = "4000-5000 mAh" },
                                new FilterAttributeValue { Value = "5000+ mAh" }
                            }
                        },
                        new FilterAttribute { FilterName = "Features", FilterSlug="feature", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "Dynamic Island" },
                                new FilterAttributeValue { Value = "Always-On display" },
                                new FilterAttributeValue { Value = "S Pen Support" },
                                new FilterAttributeValue { Value = "IP68 Water Resistance" },
                                new FilterAttributeValue { Value = "Heart Rate Monitor" },
                                new FilterAttributeValue { Value = "SpO₂ Tracking" },
                                new FilterAttributeValue { Value = "Sleep Tracking" },
                                new FilterAttributeValue { Value = "Fast Charging" },
                                new FilterAttributeValue { Value = "NFC" },
                                new FilterAttributeValue { Value = "Wireless Charging" },
                                new FilterAttributeValue { Value = "Fingerprint Sensor" },
                                new FilterAttributeValue { Value = "Dual SIM" }
                            }
                        }
                    }
                },
                new Category
                {
                    Name = "Keyboard",
                    Slug = "keyboard",
                    Filters = new List<FilterAttribute>
                    {
                        new FilterAttribute { FilterName = "Type", FilterSlug="type", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "Mechanical" },
                                new FilterAttributeValue { Value = "Membrane" },
                                new FilterAttributeValue { Value = "Optical" }
                            }
                        },
                        new FilterAttribute { FilterName = "Interface", FilterSlug="interface", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "USB" },
                                new FilterAttributeValue { Value = "USB-C (Detachable Cable)" },
                                new FilterAttributeValue { Value = "Wireless (Bluetooth)" },
                                new FilterAttributeValue { Value = "Wireless (2.4GHz)" }
                            }
                        },
                        new FilterAttribute { FilterName = "Switch Type", FilterSlug="switch-type", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "Cherry MX Speed" },
                                new FilterAttributeValue { Value = "Cherry MX Red" },
                                new FilterAttributeValue { Value = "Cherry MX Brown" },
                                new FilterAttributeValue { Value = "Cherry MX Blue" },
                                new FilterAttributeValue { Value = "Optical Switches" },
                                new FilterAttributeValue { Value = "Tactile" },
                                new FilterAttributeValue { Value = "Linear" },
                                new FilterAttributeValue { Value = "Clicky" }
                            }
                        },
                        new FilterAttribute { FilterName = "Special Feature", FilterSlug="special-feature", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "Per-Key RGB Backlighting" },
                                new FilterAttributeValue { Value = "Macro Keys" },
                                new FilterAttributeValue { Value = "Media Controls" },
                                new FilterAttributeValue { Value = "Wrist Rest Included" }
                            }
                        },
                    }
                },
                new Category
                {
                    Name = "Mouse",
                    Slug = "mouse",
                    Filters = new List<FilterAttribute>
                    {
                        new FilterAttribute { FilterName = "Type", FilterSlug="type", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "Gaming Mouse" },
                                new FilterAttributeValue { Value = "Ergonomic Mouse" },
                                new FilterAttributeValue { Value = "Vertical Mouse" }
                            }
                        },
                        new FilterAttribute { FilterName = "Interface", FilterSlug="interface", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "Wireless (HyperSpeed)" },
                                new FilterAttributeValue { Value = "Wired (Speedflex Cable)" },
                                new FilterAttributeValue { Value = "USB" },
                                new FilterAttributeValue { Value = "Wireless (Bluetooth)" }
                            }
                        },
                        new FilterAttribute { FilterName = "Number of keys", FilterSlug="number-of-keys", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "3" },
                                new FilterAttributeValue { Value = "5" },
                                new FilterAttributeValue { Value = "6-8" },
                                new FilterAttributeValue { Value = "9+" },
                                new FilterAttributeValue { Value = "11 Programmable Buttons" }
                            }
                        },
                        new FilterAttribute { FilterName = "Max DPI", FilterSlug="max-dpi", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "30000" },
                                new FilterAttributeValue { Value = "26000" },
                                new FilterAttributeValue { Value = "Below 8000" },
                                new FilterAttributeValue { Value = "8000-16000" },
                                new FilterAttributeValue { Value = "16000+" },
                                new FilterAttributeValue { Value = "Customizable" }
                            }
                        },
                    }
                },
                new Category
                {
                    Name = "Smart Watch",
                    Slug = "smart-watch",
                    Filters = new List<FilterAttribute>
                    {
                        new FilterAttribute { FilterName = "Display Type", FilterSlug="display-type", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "AMOLED" },
                                new FilterAttributeValue { Value = "TFT Touch Display" },
                                new FilterAttributeValue { Value = "LCD" },
                                new FilterAttributeValue { Value = "OLED" },
                                new FilterAttributeValue { Value = "E-Paper" }
                            }
                        },
                        new FilterAttribute { FilterName = "OS" , FilterSlug="os", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "Proprietary" },
                                new FilterAttributeValue { Value = "Zepp OS 2.0" },
                                new FilterAttributeValue { Value = "watchOS" },
                                new FilterAttributeValue { Value = "Wear OS" },
                                new FilterAttributeValue { Value = "HarmonyOS" }
                            }
                        },
                        new FilterAttribute { FilterName = "Features", FilterSlug="feature", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "Heart Rate Monitor" },
                                new FilterAttributeValue { Value = "SpO₂ Tracking" },
                                new FilterAttributeValue { Value = "Sleep Tracking" },
                                new FilterAttributeValue { Value = "Built-in GPS" },
                                new FilterAttributeValue { Value = "Bluetooth phone calls" },
                                new FilterAttributeValue { Value = "Water Resistance" },
                                new FilterAttributeValue { Value = "ECG" },
                                new FilterAttributeValue { Value = "NFC Payments" },
                                new FilterAttributeValue { Value = "Music Storage" }
                            }
                        }
                    }
                },
                new Category
                {
                    Name = "Gaming Console",
                    Slug = "gaming-console",
                    Filters = new List<FilterAttribute>()
                },
                new Category
                {
                    Name = "Headphone",
                    Slug = "headphone",
                    Filters = new List<FilterAttribute>
                    {
                        new FilterAttribute { FilterName = "Type", FilterSlug="type", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "Over-ear" },
                                new FilterAttributeValue { Value = "Gaming Headset" },
                                new FilterAttributeValue { Value = "In-ear" },
                                new FilterAttributeValue { Value = "On-ear" },
                                new FilterAttributeValue { Value = "Earbuds" }
                            }
                        },
                        new FilterAttribute { FilterName = "Interface", FilterSlug="interface", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "Wireless (Bluetooth)" },
                                new FilterAttributeValue { Value = "Wired (3.5mm)" },
                                new FilterAttributeValue { Value = "USB-C" },
                                new FilterAttributeValue { Value = "3.5mm Jack" },
                                new FilterAttributeValue { Value = "USB-A" },
                                new FilterAttributeValue { Value = "Wireless (2.4GHz)" }
                            }
                        },
                        new FilterAttribute { FilterName = "Color", FilterSlug="color", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "Black" },
                                new FilterAttributeValue { Value = "White" },
                                new FilterAttributeValue { Value = "Red" },
                                new FilterAttributeValue { Value = "Blue" },
                                new FilterAttributeValue { Value = "Silver" }
                            }
                        },
                        new FilterAttribute { FilterName = "Special Feature", FilterSlug="feature", DefaultValues = new List<FilterAttributeValue>
                            {
                                new FilterAttributeValue { Value = "Active Noise Cancellation" },
                                new FilterAttributeValue { Value = "AniMe Matrix™ Display" },
                                new FilterAttributeValue { Value = "AI Noise-Cancelling Mic" },
                                new FilterAttributeValue { Value = "Built-in Microphone" },
                                new FilterAttributeValue { Value = "Volume Control" },
                                new FilterAttributeValue { Value = "Foldable Design" }
                            }
                        },
                    }
                }
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
            var products = new List<Product>
            {
                // 1. Lenovo Ultrabook (Laptop)
                new Product
                {
                    Name = "Lenovo Yoga Slim 7 14ITL05 Core i7 11th Gen 14\" FHD IPS Laptop",
                    Slug = "lenovo-yoga-slim-7-14itl05",
                    Description = "Ultra-thin and light laptop with powerful performance",
                    Price = 125000,
                    DiscountPrice = 119999,
                    Brand = brands[1], // Lenovo
                    Category = categories[0], // Laptop
                    SubCategory = subCategories[0], // Ultrabook
                    StockQuantity = 25,
                    IsFeatured = true,
                    ProductImages = new List<ProductImage>
                    {
                        new ProductImage { ImageUrl = imageUrl },
                        new ProductImage { ImageUrl = imageUrl }
                    },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Processor Type", Slug = "processor-type", Value = "Intel Core i7", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Generation/Series", Slug = "generation-series", Value = "11th Gen", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "RAM Size", Slug = "ram-size", Value = "16GB", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "SSD", Slug = "ssd", Value = "512GB", SpecificationCategory ="Key Feature" },
                        new ProductAttributeValue { Name = "Processor Model", Slug = "processor-model", Value = "1165G7", SpecificationCategory = "Processor" },
                        new ProductAttributeValue { Name = "Display Type", Slug = "display-type", Value = "IPS", SpecificationCategory = "Display" },
                        new ProductAttributeValue { Name = "Display Size", Slug = "display-size", Value = "14\"", SpecificationCategory = "Display" },
                        new ProductAttributeValue { Name = "RAM Type", Slug = "ram-type", Value = "LPDDR4X", SpecificationCategory = "Memory" },
                        new ProductAttributeValue { Name = "Graphics", Slug = "graphics", Value = "Intel Iris Xe", SpecificationCategory = "Graphics" },
                        new ProductAttributeValue { Name = "Operating System", Slug = "operating-system", Value = "Windows 11 Pro", SpecificationCategory = "Software" },
                        new ProductAttributeValue { Name = "Special Feature", Slug = "special-feature", Value = "Backlit Keyboard, Fingerprint Reader", SpecificationCategory = "Features" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview { ReviewerName = "TechEnthusiast", Comment = "Excellent build quality and performance", Rating = 5, CreatedAt = DateTime.UtcNow.AddDays(-5) },
                        new ProductReview { ReviewerName = "ProfessionalUser", Comment = "Perfect for business travel", Rating = 4, CreatedAt = DateTime.UtcNow.AddDays(-2) }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion { Question = "Does it have Thunderbolt 4?", Answer = "Yes, it has 2 Thunderbolt 4 ports", CreatedAt = DateTime.UtcNow.AddDays(-3) },
                        new ProductQuestion { Question = "Is the RAM upgradable?", Answer = "No, it's soldered to the motherboard", CreatedAt = DateTime.UtcNow.AddDays(-1) }
                    },
                    Visits = new List<ProductVisit>
                    {
                        new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-12) },
                        new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-5) },
                        new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-1) }
                    }
                },

                // 2. ASUS Gaming Laptop
                new Product
                {
                    Name = "ASUS ROG Strix G15 AMD Ryzen 9 5900HX 15.6\" FHD 144Hz Gaming Laptop",
                    Slug = "asus-rog-strix-g15",
                    Description = "High-performance gaming laptop with RGB lighting",
                    Price = 150000,
                    DiscountPrice = 139999,
                    Brand = brands[0], // ASUS
                    Category = categories[0], // Laptop
                    SubCategory = subCategories[1], // Gaming
                    StockQuantity = 15,
                    IsFeatured = true,
                    ProductImages = new List<ProductImage>
                    {
                        new ProductImage { ImageUrl = imageUrl },
                        new ProductImage { ImageUrl = imageUrl }
                    },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Processor Type", Slug = "processor-type", Value = "AMD Ryzen 9", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Graphics", Slug = "graphics", Value = "NVIDIA RTX 3060", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "RAM Size", Slug = "ram-size", Value = "16GB", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "SSD", Slug = "ssd", Value = "1TB", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Processor Model", Slug = "processor-model", Value = "5900HX", SpecificationCategory = "Processor" },
                        new ProductAttributeValue { Name = "Display Size", Slug = "display-size", Value = "15.6\"", SpecificationCategory = "Display" },
                        new ProductAttributeValue { Name = "Display Resolution", Slug = "display-resolution", Value = "FHD", SpecificationCategory = "Display" },
                        new ProductAttributeValue { Name = "Display Refresh Rate", Slug = "display-refresh-rate", Value = "144Hz", SpecificationCategory = "Display" },
                        new ProductAttributeValue { Name = "Special Feature", Slug = "special-feature", Value = "RGB Keyboard, Adaptive Sync", SpecificationCategory = "Features" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview { ReviewerName = "GamerPro", Comment = "Handles all AAA games at max settings!", Rating = 5, CreatedAt = DateTime.UtcNow.AddDays(-7) },
                        new ProductReview { ReviewerName = "ContentCreator", Comment = "Great for video editing too", Rating = 4, CreatedAt = DateTime.UtcNow.AddDays(-3) }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion { Question = "Does it support G-Sync?", Answer = "Yes, it supports G-Sync", CreatedAt = DateTime.UtcNow.AddDays(-4) },
                        new ProductQuestion { Question = "How many USB ports?", Answer = "3 USB-A and 1 USB-C", CreatedAt = DateTime.UtcNow.AddDays(-1) }
                    },
                    Visits = new List<ProductVisit>
                    {
                        new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-8) },
                        new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-3) }
                    }
                },

                // 3. Samsung Gaming Monitor
                new Product
                {
                    Name = "Samsung Odyssey G7 27\" QHD 240Hz Curved Gaming Monitor",
                    Slug = "samsung-odyssey-g7",
                    Description = "Immersive curved gaming monitor with high refresh rate",
                    Price = 65000,
                    DiscountPrice = 59900,
                    Brand = brands[5], // Samsung
                    Category = categories[1], // Monitor
                    SubCategory = subCategories[2], // Gaming Monitor
                    StockQuantity = 10,
                    IsFeatured = true,
                    ProductImages = new List<ProductImage> { new ProductImage { ImageUrl = imageUrl } },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Screen Size", Slug = "screen-size", Value = "27\"", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Resolution", Slug = "resolution", Value = "QHD (2560x1440)", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Refresh Rate", Slug = "refresh-rate", Value = "240Hz", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Response Time", Slug = "response-time", Value = "1ms (GtG)", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Panel Type", Slug = "panel-type", Value = "VA", SpecificationCategory = "Display" },
                        new ProductAttributeValue { Name = "Curvature", Slug = "curvature", Value = "1000R", SpecificationCategory = "Display" },
                        new ProductAttributeValue { Name = "Input Type", Slug = "input-type", Value = "HDMI, DisplayPort", SpecificationCategory = "Connectivity" },
                        new ProductAttributeValue { Name = "Features", Slug = "features", Value = "NVIDIA G-SYNC Compatible, AMD FreeSync Premium Pro", SpecificationCategory = "Features" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview { ReviewerName = "GamerReview", Comment = "Smooth gameplay, amazing curve!", Rating = 5, CreatedAt = DateTime.UtcNow.AddDays(-10) }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion { Question = "Does it come with a stand?", Answer = "Yes, an adjustable stand is included", CreatedAt = DateTime.UtcNow.AddDays(-5) }
                    },
                    Visits = new List<ProductVisit> { new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-6) } }
                },

                // 4. Apple iPhone 14 Pro
                new Product
                {
                    Name = "Apple iPhone 14 Pro 128GB Deep Purple",
                    Slug = "apple-iphone-14-pro-128gb",
                    Description = "Powerful smartphone with A16 Bionic chip and ProMotion display",
                    Price = 145000,
                    DiscountPrice = 139000,
                    Brand = brands[4], // Apple
                    Category = categories[4], // Mobile
                    SubCategory = subCategories[4], // iPhone
                    StockQuantity = 8,
                    IsFeatured = true,
                    ProductImages = new List<ProductImage> { new ProductImage { ImageUrl = imageUrl } },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Chipset", Slug = "chipset", Value = "A16 Bionic", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Display Type", Slug = "display-type", Value = "Super Retina XDR OLED", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Internal Storage", Slug = "internal-storage", Value = "128GB", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Rear Camera", Slug = "rear-camera", Value = "48MP Main, 12MP Ultrawide, 12MP Telephoto", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Display Size", Slug = "display-size", Value = "6.1\"", SpecificationCategory = "Display" },
                        new ProductAttributeValue { Name = "Refresh Rate", Slug = "refresh-rate", Value = "ProMotion (120Hz adaptive)", SpecificationCategory = "Display" },
                        new ProductAttributeValue { Name = "OS", Slug = "os", Value = "iOS", SpecificationCategory = "Software" },
                        new ProductAttributeValue { Name = "Features", Slug = "features", Value = "Dynamic Island, Always-On display", SpecificationCategory = "Features" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview { ReviewerName = "AppleFan", Comment = "The camera is incredible!", Rating = 5, CreatedAt = DateTime.UtcNow.AddDays(-15) }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion { Question = "Is it water resistant?", Answer = "Yes, IP68 rated", CreatedAt = DateTime.UtcNow.AddDays(-7) }
                    },
                    Visits = new List<ProductVisit> { new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-2) } }
                },

                // 5. Samsung Galaxy S23 Ultra
                new Product
                {
                    Name = "Samsung Galaxy S23 Ultra 256GB Phantom Black",
                    Slug = "samsung-galaxy-s23-ultra-256gb",
                    Description = "Premium Android phone with S Pen support and powerful camera",
                    Price = 130000,
                    DiscountPrice = 125000,
                    Brand = brands[5], // Samsung
                    Category = categories[4], // Mobile
                    SubCategory = subCategories[5], // Android
                    StockQuantity = 12,
                    IsFeatured = true,
                    ProductImages = new List<ProductImage> { new ProductImage { ImageUrl = imageUrl } },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Chipset", Slug = "chipset", Value = "Snapdragon 8 Gen 2 for Galaxy", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Internal Storage", Slug = "internal-storage", Value = "256GB", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Rear Camera", Slug = "rear-camera", Value = "200MP Main, 12MP Ultrawide, 10MP Periscope Telephoto, 10MP Telephoto", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Battery", Slug = "battery", Value = "5000 mAh", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Display Size", Slug = "display-size", Value = "6.8\"", SpecificationCategory = "Display" },
                        new ProductAttributeValue { Name = "Display Type", Slug = "display-type", Value = "Dynamic AMOLED 2X", SpecificationCategory = "Display" },
                        new ProductAttributeValue { Name = "RAM", Slug = "ram", Value = "12GB", SpecificationCategory = "Memory" },
                        new ProductAttributeValue { Name = "OS", Slug = "os", Value = "Android", SpecificationCategory = "Software" },
                        new ProductAttributeValue { Name = "Features", Slug = "features", Value = "S Pen Support, IP68 Water Resistance", SpecificationCategory = "Features" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview { ReviewerName = "AndroidUser", Comment = "Best Android phone I've ever used, zoom is amazing", Rating = 5, CreatedAt = DateTime.UtcNow.AddDays(-12) }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion { Question = "Does the S Pen come with it?", Answer = "Yes, the S Pen is included and stored in the phone", CreatedAt = DateTime.UtcNow.AddDays(-6) }
                    },
                    Visits = new List<ProductVisit> { new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-4) } }
                },

                // 6. Corsair K95 RGB Platinum XT Mechanical Keyboard
                new Product
                {
                    Name = "Corsair K95 RGB Platinum XT Cherry MX Speed Mechanical Gaming Keyboard",
                    Slug = "corsair-k95-rgb-platinum-xt",
                    Description = "High-end mechanical gaming keyboard with RGB lighting",
                    Price = 22000,
                    DiscountPrice = 20500,
                    Brand = brands[2], // Corsair
                    Category = categories[5], // Keyboard
                    SubCategory = subCategories[6], // Mechanical
                    StockQuantity = 20,
                    IsFeatured = true,
                    ProductImages = new List<ProductImage> { new ProductImage { ImageUrl = imageUrl } },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Type", Slug = "type", Value = "Mechanical", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Switch Type", Slug = "switch-type", Value = "Cherry MX Speed", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Interface", Slug = "interface", Value = "USB", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Special Feature", Slug = "special-feature", Value = "Per-Key RGB Backlighting", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Layout", Slug = "layout", Value = "Full Size", SpecificationCategory = "General" },
                        new ProductAttributeValue { Name = "Wrist Rest", Slug = "wrist-rest", Value = "Detachable Padded", SpecificationCategory = "Features" },
                        new ProductAttributeValue { Name = "Software", Slug = "software", Value = "Corsair iCUE", SpecificationCategory = "Software" },
                        new ProductAttributeValue { Name = "Number of Macro Keys", Slug = "number-of-macro-keys", Value = "6", SpecificationCategory = "Features" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview { ReviewerName = "KeyboardFan", Comment = "Love the feel of the switches and the RGB!", Rating = 5, CreatedAt = DateTime.UtcNow.AddDays(-9) }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion { Question = "Is it loud?", Answer = "Cherry MX Speed switches are linear and not clicky, so relatively quiet compared to clicky switches", CreatedAt = DateTime.UtcNow.AddDays(-4) }
                    },
                    Visits = new List<ProductVisit> { new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-1) } }
                },

                // 7. Razer DeathAdder V3 Pro Gaming Mouse
                new Product
                {
                    Name = "Razer DeathAdder V3 Pro Wireless Gaming Mouse",
                    Slug = "razer-deathadder-v3-pro",
                    Description = "Ergonomic and lightweight wireless gaming mouse",
                    Price = 15000,
                    DiscountPrice = 13800,
                    Brand = brands[3], // Razer
                    Category = categories[6], // Mouse
                    SubCategory = subCategories[7], // Gaming Mouse
                    StockQuantity = 18,
                    IsFeatured = true,
                    ProductImages = new List<ProductImage> { new ProductImage { ImageUrl = imageUrl } },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Type", Slug = "type", Value = "Gaming Mouse", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Interface", Slug = "interface", Value = "Wireless (HyperSpeed)", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Max DPI", Slug = "max-dpi", Value = "30000", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Sensor", Slug = "sensor", Value = "Focus Pro 30K Optical Sensor", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Ergonomics", Slug = "ergonomics", Value = "Right-Handed", SpecificationCategory = "General" },
                        new ProductAttributeValue { Name = "Weight", Slug = "weight", Value = "63g", SpecificationCategory = "General" },
                        new ProductAttributeValue { Name = "Number of Buttons", Slug = "number-of-buttons", Value = "5", SpecificationCategory = "Features" },
                        new ProductAttributeValue { Name = "Battery Life", Slug = "battery-life", Value = "Up to 90 hours", SpecificationCategory = "Battery" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview { ReviewerName = "FPSPlayer", Comment = "Super light and accurate, improved my aim!", Rating = 5, CreatedAt = DateTime.UtcNow.AddDays(-8) }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion { Question = "Does it use a standard USB dongle?", Answer = "Yes, it uses the Razer HyperSpeed USB dongle", CreatedAt = DateTime.UtcNow.AddDays(-3) }
                    },
                    Visits = new List<ProductVisit> { new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-2) } }
                },

                // 8. Sony WH-1000XM5 Noise Cancelling Headphones
                new Product
                {
                    Name = "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
                    Slug = "sony-wh-1000xm5",
                    Description = "Industry-leading noise cancellation and premium sound",
                    Price = 40000,
                    DiscountPrice = 37500,
                    Brand = brands[6], // Sony
                    Category = categories[9], // Headphone
                    SubCategory = null,
                    StockQuantity = 15,
                    IsFeatured = true,
                    ProductImages = new List<ProductImage> { new ProductImage { ImageUrl = imageUrl } },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Type", Slug = "type", Value = "Over-ear", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Interface", Slug = "interface", Value = "Wireless (Bluetooth), Wired (3.5mm)", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Special Feature", Slug = "special-feature", Value = "Active Noise Cancellation", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Battery Life", Slug = "battery-life", Value = "Up to 30 hours (with ANC)", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Audio Codecs", Slug = "audio-codecs", Value = "LDAC, AAC, SBC", SpecificationCategory = "Audio" },
                        new ProductAttributeValue { Name = "Microphone", Slug = "microphone", Value = "Integrated for Calls and ANC", SpecificationCategory = "Features" },
                        new ProductAttributeValue { Name = "App Support", Slug = "app-support", Value = "Sony Headphones Connect App", SpecificationCategory = "Software" },
                        new ProductAttributeValue { Name = "Color", Slug = "color", Value = "Black", SpecificationCategory = "General" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview { ReviewerName = "MusicLover", Comment = "Amazing noise cancellation, perfect for flights!", Rating = 5, CreatedAt = DateTime.UtcNow.AddDays(-18) }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion { Question = "Does it come with a carrying case?", Answer = "Yes, a foldable carrying case is included", CreatedAt = DateTime.UtcNow.AddDays(-10) }
                    },
                    Visits = new List<ProductVisit> { new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-5) } }
                },

                // 9. Intel Core i9-13900K Processor
                new Product
                {
                    Name = "Intel Core i9-13900K 24 Cores 3.0 GHz LGA 1700 Desktop Processor",
                    Slug = "intel-core-i9-13900k",
                    Description = "High-performance desktop processor for gaming and content creation",
                    Price = 60000,
                    DiscountPrice = 58000,
                    Brand = brands[9], // Intel
                    Category = categories[3], // Processor
                    SubCategory = null,
                    StockQuantity = 7,
                    IsFeatured = true,
                    ProductImages = new List<ProductImage> { new ProductImage { ImageUrl = imageUrl } },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Processor Type", Slug = "processor-type", Value = "Intel Core i9", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Socket", Slug = "socket", Value = "LGA 1700", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Number of Cores", Slug = "number-of-cores", Value = "24 (8 Performance-cores, 16 Efficient-cores)", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Max Turbo Frequency", Slug = "max-turbo-frequency", Value = "5.8 GHz", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Generation/Series", Slug = "generation-series", Value = "13th Gen", SpecificationCategory = "General" },
                        new ProductAttributeValue { Name = "Number of Threads", Slug = "number-of-threads", Value = "32", SpecificationCategory = "General" },
                        new ProductAttributeValue { Name = "Cache", Slug = "cache", Value = "36MB Intel Smart Cache", SpecificationCategory = "Memory" },
                        new ProductAttributeValue { Name = "Integrated Graphics", Slug = "integrated-graphics", Value = "Intel UHD Graphics 770", SpecificationCategory = "Graphics" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview { ReviewerName = "PCTuner", Comment = "Incredible performance for multitasking!", Rating = 5, CreatedAt = DateTime.UtcNow.AddDays(-11) }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion { Question = "Does it come with a cooler?", Answer = "No, cooler is not included, a high-performance cooler is recommended", CreatedAt = DateTime.UtcNow.AddDays(-5) }
                    },
                    Visits = new List<ProductVisit> { new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-3) } }
                },

                // 10. NVIDIA GeForce RTX 4080 Graphics Card
                new Product
                {
                    Name = "ASUS ROG Strix GeForce RTX 4080 16GB GDDR6X OC Edition Graphics Card",
                    Slug = "asus-rog-strix-rtx-4080",
                    Description = "Extreme performance graphics card for 4K gaming",
                    Price = 180000,
                    DiscountPrice = 175000,
                    Brand = brands[0], // ASUS
                    Category = categories[2], // Graphics Card
                    SubCategory = null,
                    StockQuantity = 5,
                    IsFeatured = true,
                    ProductImages = new List<ProductImage> { new ProductImage { ImageUrl = imageUrl } },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Chipset", Slug = "chipset", Value = "NVIDIA GeForce RTX 4080", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Memory", Slug = "memory", Value = "16GB", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Memory Type", Slug = "memory-type", Value = "GDDR6X", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Max Resolution", Slug = "max-resolution", Value = "7680 x 4320", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Interface", Slug = "interface", Value = "PCI Express 4.0", SpecificationCategory = "Connectivity" },
                        new ProductAttributeValue { Name = "Cooling", Slug = "cooling", Value = "Triple Fan", SpecificationCategory = "Cooling" },
                        new ProductAttributeValue { Name = "Power Connectors", Slug = "power-connectors", Value = "1 x 16-pin", SpecificationCategory = "Power" },
                        new ProductAttributeValue { Name = "Features", Slug = "features", Value = "Ray Tracing, DLSS 3", SpecificationCategory = "Features" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview { ReviewerName = "HardcoreGamer", Comment = "Absolutely crushes 4K gaming, worth every penny!", Rating = 5, CreatedAt = DateTime.UtcNow.AddDays(-20) }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion { Question = "What PSU is recommended?", Answer = "A high-quality 850W PSU or greater is recommended", CreatedAt = DateTime.UtcNow.AddDays(-9) }
                    },
                    Visits = new List<ProductVisit> { new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-7) } }
                },

                // 11. Xiaomi Mi Smart Band 7
                new Product
                {
                    Name = "Xiaomi Mi Smart Band 7 Fitness Tracker",
                    Slug = "xiaomi-mi-smart-band-7",
                    Description = "Affordable fitness tracker with AMOLED display",
                    Price = 3500,
                    DiscountPrice = 3200,
                    Brand = brands[7], // Xiaomi
                    Category = categories[7], // Smart Watch
                    SubCategory = subCategories[8], // Fitness Tracker
                    StockQuantity = 50,
                    IsFeatured = false,
                    ProductImages = new List<ProductImage> { new ProductImage { ImageUrl = imageUrl } },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Display Type", Slug = "display-type", Value = "AMOLED", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Battery Life", Slug = "battery-life", Value = "Up to 14 days", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Water Resistance", Slug = "water-resistance", Value = "5ATM", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Features", Slug = "features", Value = "Heart Rate Monitor, SpO₂ Tracking, Sleep Tracking", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Display Size", Slug = "display-size", Value = "1.62\"", SpecificationCategory = "Display" },
                        new ProductAttributeValue { Name = "Connectivity", Slug = "connectivity", Value = "Bluetooth 5.2", SpecificationCategory = "Connectivity" },
                        new ProductAttributeValue { Name = "OS", Slug = "os", Value = "Proprietary", SpecificationCategory = "Software" },
                        new ProductAttributeValue { Name = "Compatibility", Slug = "compatibility", Value = "Android & iOS", SpecificationCategory = "Compatibility" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview { ReviewerName = "FitnessFan", Comment = "Great value for the features, battery lasts forever", Rating = 4, CreatedAt = DateTime.UtcNow.AddDays(-25) }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion { Question = "Can I reply to messages?", Answer = "No, you can only view notifications", CreatedAt = DateTime.UtcNow.AddDays(-11) }
                    },
                    Visits = new List<ProductVisit> { new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-1) } }
                },

                // 12. Amazfit Bip 5 Smart Watch
                new Product
                {
                    Name = "Amazfit Bip 5 Smart Watch with Built-in GPS",
                    Slug = "amazfit-bip-5",
                    Description = "Lightweight smartwatch with long battery life and GPS",
                    Price = 8000,
                    DiscountPrice = 7500,
                    Brand = brands[8], // Amazfit
                    Category = categories[7], // Smart Watch
                    SubCategory = null, // Can be Smart Watch directly
                    StockQuantity = 22,
                    IsFeatured = false,
                    ProductImages = new List<ProductImage> { new ProductImage { ImageUrl = imageUrl } },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Display Type", Slug = "display-type", Value = "TFT Touch Display", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Built-in GPS", Slug = "built-in-gps", Value = "Yes", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Battery Life", Slug = "battery-life", Value = "Up to 10 days (typical use)", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Features", Slug = "features", Value = "Heart Rate, SpO₂, Sleep, Stress Monitoring", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Display Size", Slug = "display-size", Value = "1.91\"", SpecificationCategory = "Display" },
                        new ProductAttributeValue { Name = "Water Resistance", Slug = "water-resistance", Value = "IP68", SpecificationCategory = "Durability" },
                        new ProductAttributeValue { Name = "OS", Slug = "os", Value = "Zepp OS 2.0", SpecificationCategory = "Software" },
                        new ProductAttributeValue { Name = "Weight", Slug = "weight", Value = "26g (without strap)", SpecificationCategory = "General" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview { ReviewerName = "CasualUser", Comment = "Good basic smartwatch with reliable GPS", Rating = 4, CreatedAt = DateTime.UtcNow.AddDays(-14) }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion { Question = "Can I make calls on this watch?", Answer = "Yes, it supports Bluetooth phone calls", CreatedAt = DateTime.UtcNow.AddDays(-6) }
                    },
                    Visits = new List<ProductVisit> { new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-3) } }
                },

                // 13. Sony PlayStation 5 Console
                new Product
                {
                    Name = "Sony PlayStation 5 (PS5) Console",
                    Slug = "sony-playstation-5",
                    Description = "Next-gen gaming console with lightning-fast loading",
                    Price = 70000, // Assuming market price
                    DiscountPrice = 68000,
                    Brand = brands[6], // Sony
                    Category = categories[8], // Gaming Console
                    SubCategory = null,
                    StockQuantity = 3,
                    IsFeatured = true,
                    ProductImages = new List<ProductImage> { new ProductImage { ImageUrl = imageUrl } },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Console Type", Slug = "console-type", Value = "Home Console", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Storage Type", Slug = "storage-type", Value = "Ultra-High Speed SSD", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Max Resolution", Slug = "max-resolution", Value = "8K Output", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Features", Slug = "features", Value = "Ray Tracing, Tempest 3D AudioTech", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "CPU", Slug = "cpu", Value = "AMD Zen 2-based 8 Cores at 3.5GHz", SpecificationCategory = "Hardware" },
                        new ProductAttributeValue { Name = "GPU", Slug = "gpu", Value = "AMD RDNA 2-based 10.28 TFLOPS", SpecificationCategory = "Hardware" },
                        new ProductAttributeValue { Name = "System Memory", Slug = "system-memory", Value = "16GB GDDR6", SpecificationCategory = "Hardware" },
                        new ProductAttributeValue { Name = "Disc Drive", Slug = "disc-drive", Value = "4K UHD Blu-ray Drive", SpecificationCategory = "Hardware" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview { ReviewerName = "Gamer Enthusiast", Comment = "Loading times are insane! Games look and sound amazing.", Rating = 5, CreatedAt = DateTime.UtcNow.AddDays(-30) }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion { Question = "Is the SSD expandable?", Answer = "Yes, via an M.2 NVMe SSD slot", CreatedAt = DateTime.UtcNow.AddDays(-15) }
                    },
                    Visits = new List<ProductVisit> { new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-8) } }
                },

                // 14. Lenovo IdeaPad Flex 5 (Laptop)
                new Product
                {
                    Name = "Lenovo IdeaPad Flex 5 14ALC05 AMD Ryzen 5 14\" FHD Touch Laptop",
                    Slug = "lenovo-ideapad-flex-5-14alc05",
                    Description = "Versatile 2-in-1 laptop with touch display",
                    Price = 75000,
                    DiscountPrice = 71000,
                    Brand = brands[1], // Lenovo
                    Category = categories[0], // Laptop
                    SubCategory = null, // General Laptop
                    StockQuantity = 18,
                    IsFeatured = false,
                    ProductImages = new List<ProductImage> { new ProductImage { ImageUrl = imageUrl } },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Processor Type", Slug = "processor-type", Value = "AMD Ryzen 5", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Display Type", Slug = "display-type", Value = "Touch Display", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Form Factor", Slug = "form-factor", Value = "2-in-1 Convertible", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Display Size", Slug = "display-size", Value = "14\"", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Processor Model", Slug = "processor-model", Value = "5500U", SpecificationCategory = "Processor" },
                        new ProductAttributeValue { Name = "RAM Size", Slug = "ram-size", Value = "8GB", SpecificationCategory = "Memory" },
                        new ProductAttributeValue { Name = "SSD", Slug = "ssd", Value = "512GB", SpecificationCategory="Storage" },
                        new ProductAttributeValue { Name = "Operating System", Slug = "operating-system", Value = "Windows 11 Home", SpecificationCategory = "Software" },
                        new ProductAttributeValue { Name = "Special Feature", Slug = "special-feature", Value = "Stylus Support (Stylus not included)", SpecificationCategory = "Features" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview { ReviewerName = "StudentUser", Comment = "Perfect for notes and media consumption", Rating = 4, CreatedAt = DateTime.UtcNow.AddDays(-10) }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion { Question = "Does it support external monitors?", Answer = "Yes, via HDMI and USB-C", CreatedAt = DateTime.UtcNow.AddDays(-5) }
                    },
                    Visits = new List<ProductVisit> { new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-2) } }
                },

                // 15. Asus TUF Gaming VG27AQ Monitor
                new Product
                {
                    Name = "ASUS TUF Gaming VG27AQ 27\" QHD 165Hz IPS Gaming Monitor",
                    Slug = "asus-tuf-gaming-vg27aq",
                    Description = "Responsive IPS gaming monitor with high refresh rate",
                    Price = 45000,
                    DiscountPrice = 42000,
                    Brand = brands[0], // ASUS
                    Category = categories[1], // Monitor
                    SubCategory = subCategories[2], // Gaming Monitor
                    StockQuantity = 12,
                    IsFeatured = false,
                    ProductImages = new List<ProductImage> { new ProductImage { ImageUrl = imageUrl } },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Screen Size", Slug = "screen-size", Value = "27\"", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Resolution", Slug = "resolution", Value = "QHD (2560x1440)", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Refresh Rate", Slug = "refresh-rate", Value = "165Hz", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Panel Type", Slug = "panel-type", Value = "IPS", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Response Time", Slug = "response-time", Value = "1ms (MPRT)", SpecificationCategory = "Display" },
                        new ProductAttributeValue { Name = "Input Type", Slug = "input-type", Value = "HDMI, DisplayPort", SpecificationCategory = "Connectivity" },
                        new ProductAttributeValue { Name = "Features", Slug = "features", Value = "ELMB Sync, G-SYNC Compatible", SpecificationCategory = "Features" },
                        new ProductAttributeValue { Name = "HDR", Slug = "hdr", Value = "HDR10 Support", SpecificationCategory = "Display" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview { ReviewerName = "GamerCasual", Comment = "Smooth performance and great colors on this IPS panel", Rating = 4, CreatedAt = DateTime.UtcNow.AddDays(-19) }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion { Question = "Does it have speakers?", Answer = "Yes, built-in stereo speakers", CreatedAt = DateTime.UtcNow.AddDays(-8) }
                    },
                    Visits = new List<ProductVisit> { new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-4) } }
                },

                // 16. Corsair K65 RGB Mini Mechanical Keyboard
                new Product
                {
                    Name = "Corsair K65 RGB Mini 60% Mechanical Gaming Keyboard",
                    Slug = "corsair-k65-rgb-mini",
                    Description = "Compact 60% mechanical keyboard for gaming",
                    Price = 12000,
                    DiscountPrice = 11000,
                    Brand = brands[2], // Corsair
                    Category = categories[5], // Keyboard
                    SubCategory = subCategories[6], // Mechanical
                    StockQuantity = 25,
                    IsFeatured = false,
                    ProductImages = new List<ProductImage> { new ProductImage { ImageUrl = imageUrl } },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Type", Slug = "type", Value = "Mechanical", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Form Factor", Slug = "form-factor", Value = "60%", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Switch Type", Slug = "switch-type", Value = "Cherry MX Speed", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Special Feature", Slug = "special-feature", Value = "Per-Key RGB Backlighting", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Interface", Slug = "interface", Value = "USB-C (Detachable Cable)", SpecificationCategory = "Connectivity" },
                        new ProductAttributeValue { Name = "Polling Rate", Slug = "polling-rate", Value = "8000Hz Hyper-polling", SpecificationCategory = "Performance" },
                        new ProductAttributeValue { Name = "Software", Slug = "software", Value = "Corsair iCUE", SpecificationCategory = "Software" },
                        new ProductAttributeValue { Name = "Keycaps", Slug = "keycaps", Value = "Double-shot PBT", SpecificationCategory = "General" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview { ReviewerName = "CompactSetup", Comment = "Great space saver, feels solid and responsive", Rating = 5, CreatedAt = DateTime.UtcNow.AddDays(-13) }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion { Question = "Are the keycaps replaceable?", Answer = "Yes, it uses standard Cherry MX stems", CreatedAt = DateTime.UtcNow.AddDays(-7) }
                    },
                    Visits = new List<ProductVisit> { new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-1) } }
                },

                // 17. Razer Basilisk V3 Gaming Mouse
                new Product
                {
                    Name = "Razer Basilisk V3 Wired Gaming Mouse",
                    Slug = "razer-basilisk-v3",
                    Description = "Customizable wired gaming mouse with hypercroll tilt wheel",
                    Price = 8000,
                    DiscountPrice = 7500,
                    Brand = brands[3], // Razer
                    Category = categories[6], // Mouse
                    SubCategory = subCategories[7], // Gaming Mouse
                    StockQuantity = 28,
                    IsFeatured = false,
                    ProductImages = new List<ProductImage> { new ProductImage { ImageUrl = imageUrl } },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Type", Slug = "type", Value = "Gaming Mouse", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Interface", Slug = "interface", Value = "Wired (Speedflex Cable)", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Max DPI", Slug = "max-dpi", Value = "26000", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Sensor", Slug = "sensor", Value = "Focus+ 26K DPI Optical Sensor", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Ergonomics", Slug = "ergonomics", Value = "Right-Handed", SpecificationCategory = "General" },
                        new ProductAttributeValue { Name = "Number of Buttons", Slug = "number-of-buttons", Value = "11 Programmable Buttons", SpecificationCategory = "Features" },
                        new ProductAttributeValue { Name = "Special Feature", Slug = "special-feature", Value = "Razer HyperScroll Tilt Wheel", SpecificationCategory = "Features" },
                        new ProductAttributeValue { Name = "Lighting", Slug = "lighting", Value = "11-Zone Chroma RGB", SpecificationCategory = "Lighting" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview { ReviewerName = "MMOPlayer", Comment = "Love the extra buttons and the scroll wheel modes", Rating = 5, CreatedAt = DateTime.UtcNow.AddDays(-16) }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion { Question = "Is the cable braided?", Answer = "Yes, it's a flexible braided Razer Speedflex cable", CreatedAt = DateTime.UtcNow.AddDays(-9) }
                    },
                    Visits = new List<ProductVisit> { new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-3) } }
                },

                // 18. Samsung 32" 4K UHD Monitor
                new Product
                {
                    Name = "Samsung UJ59 Series 32\" 4K UHD (3840x2160) LED Monitor",
                    Slug = "samsung-uj59-32-4k-monitor",
                    Description = "Affordable 4K monitor for productivity and media",
                    Price = 42000,
                    DiscountPrice = 39500,
                    Brand = brands[5], // Samsung
                    Category = categories[1], // Monitor
                    SubCategory = subCategories[3], // 4K Monitor
                    StockQuantity = 9,
                    IsFeatured = false,
                    ProductImages = new List<ProductImage> { new ProductImage { ImageUrl = imageUrl } },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Screen Size", Slug = "screen-size", Value = "32\"", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Resolution", Slug = "resolution", Value = "4K UHD (3840x2160)", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Panel Type", Slug = "panel-type", Value = "VA", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Refresh Rate", Slug = "refresh-rate", Value = "60Hz", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Response Time", Slug = "response-time", Value = "4ms (GtG)", SpecificationCategory = "Display" },
                        new ProductAttributeValue { Name = "Input Type", Slug = "input-type", Value = "HDMI, DisplayPort", SpecificationCategory = "Connectivity" },
                        new ProductAttributeValue { Name = "Features", Slug = "features", Value = "Picture-by-Picture, Picture-in-Picture", SpecificationCategory = "Features" },
                        new ProductAttributeValue { Name = "Brightness", Slug = "brightness", Value = "270 cd/m²", SpecificationCategory = "Display" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview { ReviewerName = "DesignerUser", Comment = "Great screen real estate for design work", Rating = 4, CreatedAt = DateTime.UtcNow.AddDays(-22) }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion { Question = "Does it have VESA mount support?", Answer = "Yes, 100x100mm VESA mount compatible", CreatedAt = DateTime.UtcNow.AddDays(-10) }
                    },
                    Visits = new List<ProductVisit> { new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-5) } }
                },

                // 19. Xiaomi Redmi Note 12 Pro+ 5G
                new Product
                {
                    Name = "Xiaomi Redmi Note 12 Pro+ 5G 8GB RAM 256GB Storage",
                    Slug = "xiaomi-redmi-note-12-pro-plus-5g",
                    Description = "Mid-range 5G phone with 200MP camera and fast charging",
                    Price = 38000,
                    DiscountPrice = 36500,
                    Brand = brands[7], // Xiaomi
                    Category = categories[4], // Mobile
                    SubCategory = subCategories[5], // Android
                    StockQuantity = 15,
                    IsFeatured = true,
                    ProductImages = new List<ProductImage> { new ProductImage { ImageUrl = imageUrl } },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Connectivity", Slug = "connectivity", Value = "5G", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Rear Camera", Slug = "rear-camera", Value = "200MP Main", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Fast Charging", Slug = "fast-charging", Value = "120W HyperCharge", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Display Type", Slug = "display-type", Value = "AMOLED 120Hz", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Display Size", Slug = "display-size", Value = "6.67\"", SpecificationCategory = "Display" },
                        new ProductAttributeValue { Name = "Chipset", Slug = "chipset", Value = "MediaTek Dimensity 1080", SpecificationCategory = "Processor" },
                        new ProductAttributeValue { Name = "RAM", Slug = "ram", Value = "8GB", SpecificationCategory = "Memory" },
                        new ProductAttributeValue { Name = "Internal Storage", Slug = "internal-storage", Value = "256GB", SpecificationCategory = "Storage" },
                        new ProductAttributeValue { Name = "Battery", Slug = "battery", Value = "4980 mAh", SpecificationCategory = "Battery" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview { ReviewerName = "BudgetTech", Comment = "Amazing camera for the price, charging speed is insane!", Rating = 5, CreatedAt = DateTime.UtcNow.AddDays(-10) }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion { Question = "Does it have expandable storage?", Answer = "No, it does not have a microSD card slot", CreatedAt = DateTime.UtcNow.AddDays(-4) }
                    },
                    Visits = new List<ProductVisit> { new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-2) } }
                },

                // 20. Asus ROG Delta S Animate Headset
                new Product
                {
                    Name = "ASUS ROG Delta S Animate USB-C Gaming Headset",
                    Slug = "asus-rog-delta-s-animate",
                    Description = "Gaming headset with AniMe Matrix™ display and AI Noise-Cancelling Mic",
                    Price = 28000,
                    DiscountPrice = 26500,
                    Brand = brands[0], // ASUS
                    Category = categories[9], // Headphone
                    SubCategory = null,
                    StockQuantity = 10,
                    IsFeatured = true,
                    ProductImages = new List<ProductImage> { new ProductImage { ImageUrl = imageUrl } },
                    AttributeValues = new List<ProductAttributeValue>
                    {
                        new ProductAttributeValue { Name = "Type", Slug = "type", Value = "Gaming Headset", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Interface", Slug = "interface", Value = "USB-C", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Microphone", Slug = "microphone", Value = "AI Noise-Cancelling", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Special Feature", Slug = "special-feature", Value = "AniMe Matrix™ Display", SpecificationCategory = "Key Feature" },
                        new ProductAttributeValue { Name = "Audio Technology", Slug = "audio-technology", Value = "ESS 9281 Quad DAC", SpecificationCategory = "Audio" },
                        new ProductAttributeValue { Name = "Lighting", Slug = "lighting", Value = "Customizable Animations", SpecificationCategory = "Features" },
                        new ProductAttributeValue { Name = "Compatibility", Slug = "compatibility", Value = "PC, Mac, PlayStation 5, Nintendo Switch, Mobile", SpecificationCategory = "Compatibility" },
                        new ProductAttributeValue { Name = "Software", Slug = "software", Value = "Armoury Crate", SpecificationCategory = "Software" }
                    },
                    Reviews = new List<ProductReview>
                    {
                        new ProductReview { ReviewerName = "StreamerLife", Comment = "Mic quality is fantastic, and the animations are a cool touch!", Rating = 5, CreatedAt = DateTime.UtcNow.AddDays(-11) }
                    },
                    Questions = new List<ProductQuestion>
                    {
                        new ProductQuestion { Question = "Is the microphone detachable?", Answer = "Yes, the boom microphone is detachable", CreatedAt = DateTime.UtcNow.AddDays(-5) }
                    },
                    Visits = new List<ProductVisit> { new ProductVisit { VisitTime = DateTime.UtcNow.AddHours(-4) } }
                }
            };
            
            context.Products.AddRange(products);
            context.SaveChanges();

        }
    }
}
