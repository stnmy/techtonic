using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOS.ProductManagement
{
    public class CreateFilterAttributeDto
    {
        public string FilterName { get; set; } = string.Empty;
        public List<string> Values { get; set; } = new();
    }
}