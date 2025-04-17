using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Models.Product
{
public class Brand
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public string? Slug { get; set; }

    [JsonIgnore]
    public ICollection<Product> Products { get; set; } = new List<Product>();
}

}