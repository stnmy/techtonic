using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.ProductModels
{
    public class ProductImage
    {
        public int Id { get; set; }
        public required string ImageUrl { get; set; }
        public string? publicId { get; set; }
        public int ProductId { get; set; }
    }
}