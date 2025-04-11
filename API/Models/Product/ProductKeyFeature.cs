using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.Product
{
    public class ProductKeyFeature
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int KeyFeatureDefinitionId { get; set; }
        public required KeyFeatureDefinition KeyFeatureDefinition { get; set; }
        public required string Value { get; set; }
    }

}