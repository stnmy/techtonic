using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOS
{
    public class ProductWithRelatedProductsDto
    {
        public ProductDetailDto Product {get; set;} = null!;
        public List<RelatedProductCardDto> RelatedProducts  { get; set; } = null!;
    }
}