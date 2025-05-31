using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.CartModels;
using API.Models.ProductModels;

namespace API.Interfaces
{
    public interface ICartRepository
    {
        Task<Cart?> RetrieveCart(string cartCookieId);
        Task<bool> SaveChangesAsync();
        void AddCart(Cart cart);
        Task<Product?> GetProduct(int productId);
    }
}