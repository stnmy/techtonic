using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Models.Users
{
    public class Address
    {
        [JsonIgnore]
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Line1 { get; set; }
        public string? Line2 { get; set; }
        public required string City { get; set; }
        public required string State { get; set; }

        [JsonPropertyName("postal_code")]
        public required string PostalCode { get; set; }
        public required string country { get; set; }
    }
}