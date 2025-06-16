using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOS;
using API.DTOS.Product;
using API.DTOS.ProductManagement;
using API.Interfaces;
using API.Mappers;
using API.Models.ProductModels;
using API.Models.Utility;
using API.Service;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class ProductManagementRepository : IProductManagementRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ImageService _imageService;
        public ProductManagementRepository(ApplicationDbContext context, ImageService imageService)
        {
            _context = context;
            _imageService = imageService;
        }

        public async Task<Product> CreateProductAsync(CreateProductDto productDto)
        {
            await ValidateForeignKeysAsync(productDto);

            // Upload images to Cloudinary
            var uploadedImages = new List<ProductImage>();
            foreach (var file in productDto.ProductImages)
            {
                var uploadResult = await _imageService.AddImageAsync(file);
                if (uploadResult.Error != null)
                {
                    throw new ArgumentException($"Image upload failed: {uploadResult.Error.Message}");
                }

                uploadedImages.Add(new ProductImage
                {
                    ImageUrl = uploadResult.SecureUrl.AbsoluteUri,
                    publicId = uploadResult.PublicId
                });
            }

            var product = productDto.mapToProduct(uploadedImages);

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return product;
        }



        public async Task<Product?> UpdateProductAsync(UpdateProductDto dto)
        {
            var product = await _context.Products
                .Include(p => p.ProductImages)
                .Include(p => p.AttributeValues)
                .FirstOrDefaultAsync(p => p.Id == dto.Id);

            if (product == null)
                return null;

            // 1. Delete Cloudinary-hosted images only
            foreach (var image in product.ProductImages)
            {
                if (!string.IsNullOrEmpty(image.publicId) && image.ImageUrl.StartsWith("https://res.cloudinary.com"))
                {
                    await _imageService.DeleteImageAsync(image.publicId);
                }
            }

            // 2. Remove all image records and attribute values
            _context.ProductImages.RemoveRange(product.ProductImages);
            _context.ProductAttributeValues.RemoveRange(product.AttributeValues);

            // 3. Upload new images from the update DTO
            var uploadedImages = new List<ProductImage>();
            foreach (var file in dto.ProductImages)
            {
                var uploadResult = await _imageService.AddImageAsync(file);
                if (uploadResult.Error != null)
                {
                    throw new ArgumentException($"Image upload failed: {uploadResult.Error.Message}");
                }

                uploadedImages.Add(new ProductImage
                {
                    ImageUrl = uploadResult.SecureUrl.AbsoluteUri,
                    publicId = uploadResult.PublicId
                });
            }

            // 4. Map new attribute values
            var attributeEntities = dto.AttributeValues
                .Select(attr => new ProductAttributeValue
                {
                    FilterAttributeValueId = attr.FilterAttributeValueId,
                    Name = attr.Name,
                    Slug = HelperMethods.GenerateSlug(attr.Name),
                    Value = attr.Value,
                    SpecificationCategory = attr.SpecificationCategory
                }).ToList();

            // 5. Apply field updates
            product.UpdateProductFromDto(dto);
            product.ProductImages = uploadedImages;
            product.AttributeValues = attributeEntities;

            await _context.SaveChangesAsync();
            return product;
        }


        public async Task<bool> DeleteProductAsync(int productId)
        {
            var product = await _context.Products.FindAsync(productId);

            if (product == null || product.IsDeleted)
                return false;

            product.IsDeleted = true;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<BrandDto>> GetBrandsAsync()
        {
            return await _context.Brands
                .Select(b => new BrandDto { Id = b.Id, Name = b.Name, Slug = b.Slug })
                .ToListAsync();
        }

        public async Task<Brand> CreateBrandAsync(CreateBrandDto dto)
        {
            var brand = new Brand
            {
                Name = dto.Name,
                Slug = HelperMethods.GenerateSlug(dto.Name)
            };

            _context.Brands.Add(brand);
            await _context.SaveChangesAsync();

            return brand;
        }

        public async Task<FilterAttribute> CreateFilterAttributeAsync(CreateFilterAttributeDto dto)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Slug == "laptop");
            if (category == null) throw new ArgumentException("Laptop category not found.");

            var filter = new FilterAttribute
            {
                FilterName = dto.FilterName,
                FilterSlug = HelperMethods.GenerateSlug(dto.FilterName),
                CategoryId = category.Id,
                DefaultValues = dto.Values.Select(v => new FilterAttributeValue { Value = v }).ToList()
            };

            _context.FilterAttributes.Add(filter);
            await _context.SaveChangesAsync();

            return filter;
        }

        public async Task<FilterAttributeValue> AddFilterValueAsync(int filterId, CreateFilterAttributeValueDto dto)
        {
            var filterExists = await _context.FilterAttributes.AnyAsync(f => f.Id == filterId);
            if (!filterExists) throw new ArgumentException("Filter attribute not found.");

            var value = new FilterAttributeValue
            {
                FilterAttributeId = filterId,
                Value = dto.Value
            };

            _context.FilterAttributeValues.Add(value);
            await _context.SaveChangesAsync();

            return value;
        }

        private async Task ValidateForeignKeysAsync(CreateProductDto productDto)
        {
            if (!await _context.Brands.AnyAsync(b => b.Id == productDto.BrandId))
                throw new ArgumentException($"Brand with ID {productDto.BrandId} does not exist.");

            if (!await _context.Categories.AnyAsync(c => c.Id == productDto.CategoryId))
                throw new ArgumentException($"Category with ID {productDto.CategoryId} does not exist.");

            if (productDto.SubCategoryId.HasValue)
            {
                if (!await _context.SubCategories.AnyAsync(s => s.Id == productDto.SubCategoryId.Value))
                    throw new ArgumentException($"SubCategory with ID {productDto.SubCategoryId.Value} does not exist.");
            }
        }

        public async Task<UpdateProductViewDto?> GetProductForUpdateAsync(int id)
        {
            var product = await _context.Products
                .Include(p => p.ProductImages)
                .Include(p => p.AttributeValues)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return null;

            return product.ToUpdateProductViewDto();
        }
    }
}