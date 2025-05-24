using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Models.ProductModels
{
    public class ProductVisit
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        [JsonIgnore]
        public Product Product { get; set; } = null!;
        public DateTime VisitTime { get; set; } = DateTime.UtcNow;
    }
}