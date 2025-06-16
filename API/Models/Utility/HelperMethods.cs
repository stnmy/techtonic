using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.Utility
{
    public static class HelperMethods
    {
        public static string GenerateSlug(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                return string.Empty;

            return name.ToLower().Replace(" ", "-");
        }
        public static string GetRelativeImagePath(string inputPath)
        {
            if (string.IsNullOrWhiteSpace(inputPath)) return inputPath;

            // Normalize slashes and extract file name
            var fileName = Path.GetFileName(inputPath.Replace("\\", "/"));
            return $"/images/products/{fileName}";
        }
    }
}