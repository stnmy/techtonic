using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data.Enums;

namespace API.Models.Utility
{
    public record IdentifiedSlug(string Slug, SlugType Type);  
}