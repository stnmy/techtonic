using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Models.Product
{
    public class SubCategory
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string? Slug { get; set; }

        public int CategoryId { get; set; }
        [JsonIgnore]
        public required Category Category { get; set; }
        [JsonIgnore]
        public ICollection<Product> Products { get; set; } =  new List<Product>();
    }
}