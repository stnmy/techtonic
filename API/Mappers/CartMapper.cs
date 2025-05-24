using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOS;
using API.Models.CartModels;

namespace API.Mappers
{
    public static class CartMapper
    {
        public static CartDto toCartDto(this Cart cart)
        {
            return new CartDto
            {

                CartCookieId = cart.CartCookieId,
                CartItems = cart.CartItems.Select(item => new CartItemDto
                {
                    productId = item.Product.Id,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.ProductImages.FirstOrDefault()?.ImageUrl ?? "", // fallback if null
                    Brand = item.Product.Brand?.Name ?? "Unknown",
                    Category = item.Product.Category?.Name ?? "Unknown",
                    Quantity = item.Quantity
                }).ToList()
            };

        }
    }
}