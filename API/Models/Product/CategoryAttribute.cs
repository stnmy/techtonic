using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.Product
{
    public class CategoryAttribute
    {
        public int Id { get; set; }
        public required string Name { get; set; } 
        public bool IsKeyFeature { get; set; }
        public string? SpecificationCategory {get; set;}
        public int CategoryId { get; set; }
    }
}