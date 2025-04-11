using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.Product
{
    public class ProductSpecificationValue
    {
        public int Id { get; set; }

        public int ProductId { get; set; }
        public int SpecificationFieldId { get; set; }
        public required SpecificationField SpecificationField { get; set; }

        public required string Value { get; set; }
    }

}