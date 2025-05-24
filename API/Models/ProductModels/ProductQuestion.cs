using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.ProductModels
{
    public class ProductQuestion
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public required string Question { get; set; }
        public string? Answer { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}