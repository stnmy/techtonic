using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.Product
{
    public class ProductReview
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public required string ReviewerName { get; set; }
        public required string Comment { get; set; }
        public int Rating { get; set; } // 1 to 5
        public DateTime CreatedAt { get; set; }
    }

}