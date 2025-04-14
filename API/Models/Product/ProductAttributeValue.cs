using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.Product
{
    public class ProductAttributeValue
    {
        public int Id { get; set; }
        public int ProductId { get; set; } 
        public int CategoryAttributeId { get; set; }

        public required string Value { get; set; }
    }
}