using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Interfaces;
using API.Models.CartModels;
using API.Models.ProductModels;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class CartRepository : ICartRepository
    {
        private readonly ApplicationDbContext _context;
        public CartRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void AddCart(Cart cart)
        {
            _context.Carts.Add(cart);
        }

        public async Task<Product?> GetProduct(int productId)
        {
            return await _context.Products
                .Include(p => p.Brand)
                .Include(p => p.Category)
                .Include(p => p.ProductImages)
                .FirstOrDefaultAsync(p => p.Id == productId);
        }

        public async Task<Cart?> RetrieveCart(string cartCookieId)
        {
            return await _context.Carts
            .Include(x => x.CartItems)
                .ThenInclude(x => x.Product)
                    .ThenInclude(x => x.Brand)
            .Include(x => x.CartItems)
                .ThenInclude(x => x.Product)
                    .ThenInclude(x => x.Category)
            .Include(x => x.CartItems)
                .ThenInclude(x => x.Product)
                    .ThenInclude(x => x.ProductImages)
            .FirstOrDefaultAsync(x => x.CartCookieId == cartCookieId);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}