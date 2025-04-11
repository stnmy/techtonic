using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.Product
{
    public class KeyFeatureDefinition
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int CategoryId { get; set; }
    }

}