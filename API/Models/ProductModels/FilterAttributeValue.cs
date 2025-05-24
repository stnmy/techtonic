using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.ProductModels
{
    public class FilterAttributeValue
    {
        public int Id { get; set; }
        public int FilterAttributeId { get; set; }
        public string Value { get; set; } = string.Empty;
    }

}