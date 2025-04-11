using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.Product
{
    public class Category
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string? Slug { get; set; }
        public ICollection<Product> Products { get; set; } = new List<Product>();
        public ICollection<KeyFeatureDefinition> KeyFeatureDefinitions { get; set; } = new List<KeyFeatureDefinition>();
        public ICollection<SpecificationSection> SpecificationSections { get; set; } = new List<SpecificationSection>();
    }
}