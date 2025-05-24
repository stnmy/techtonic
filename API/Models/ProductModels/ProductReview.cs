using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.ProductModels
{
    public class ProductReview
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public required string ReviewerName { get; set; }
        public required string Comment { get; set; }
        public int Rating { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}