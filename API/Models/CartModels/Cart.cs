using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.ProductModels;

namespace API.Models.CartModels
{
    public class Cart
    {
        public int Id { get; set; }
        public required string CartCookieId { get; set; }
        public List<CartItem> CartItems { get; set; } = [];


        public void AddCartItem(Product product, int quantity)
        {
            if (product == null)
            {
                ArgumentNullException.ThrowIfNull(product);
            }

            if (quantity <= 0)
            {
                throw new ArgumentException("Quantity should be greater than zero", nameof(quantity));
            }

            var existingItem = FindItem(product.Id);

            if (existingItem == null)
            {
                CartItems.Add(new CartItem
                {
                    Product = product,
                    ProductId = product.Id,
                    Quantity = quantity
                });
            }
            else
            {
                existingItem.Quantity += quantity;
            }
        }


        public void RemoveItem(int productId, int quantity)
        {
            var item = FindItem(productId);
            if (item == null) return;

            item.Quantity -= quantity;
            if (item.Quantity < 0 || item.Quantity == 0)
            {
                CartItems.Remove(item);
            }
        }

        private CartItem? FindItem(int productId)
        {
            return CartItems.FirstOrDefault(item => item.ProductId == productId);
        }
    }


}