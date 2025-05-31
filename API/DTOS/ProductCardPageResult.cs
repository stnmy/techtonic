using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOS
{
    public class ProductCardPageResult
    {
        public PaginationDataDto paginationData { get; set; }
        public List<ProductCardDto> productCardDtos { get; set; }
    }
}