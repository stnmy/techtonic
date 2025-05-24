using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.ProductModels
{
    public class FilterAttribute
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string FilterName { get; set; } = string.Empty; // Remove required and add default
        public string FilterSlug { get; set; } = string.Empty; // Remove required and add default
        public List<FilterAttributeValue> DefaultValues { get; set; } = new();
    }

}