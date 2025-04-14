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
        public ICollection<CategoryAttribute> Attributes { get; set; } = new List<CategoryAttribute>();
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}