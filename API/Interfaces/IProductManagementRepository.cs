using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOS.Product;
using API.DTOS.ProductManagement;
using API.Models.ProductModels;

namespace API.Interfaces
{
    public interface IProductManagementRepository
    {
        Task<Product> CreateProductAsync(CreateProductDto productDto);
        Task<UpdateProductViewDto?> GetProductForUpdateAsync(int id);
        Task<Product?> UpdateProductAsync(UpdateProductDto productDto);
        Task<bool> DeleteProductAsync(int productId);
        Task<List<BrandDto>> GetBrandsAsync();
        Task<Brand> CreateBrandAsync(CreateBrandDto dto);
        Task<FilterAttribute> CreateFilterAttributeAsync(CreateFilterAttributeDto dto);
        Task<FilterAttributeValue> AddFilterValueAsync(int filterId, CreateFilterAttributeValueDto dto);
    }
}