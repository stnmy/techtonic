using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.Product
{
    public class ProductImage
    {
        public int Id { get; set; }
        public required string ImageUrl { get; set; }
        public int ProductId { get; set; }

    }

}