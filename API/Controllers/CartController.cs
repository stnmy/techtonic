using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOS;
using API.Mappers;
using API.Models.CartModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class CartController : BaseApiController
    {
        private readonly ApplicationDbContext _context;


        public CartController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<CartDto>> GetCart()
        {
            var cart = await RetrieveCart();
            if (cart == null)
            {
                return NoContent();
            }

            return cart.toCartDto();

        }

        [HttpPost]
        public async Task<ActionResult<CartDto>> AddItemToCart(int productId, int quantity)
        {
            var cart = await RetrieveCart();

            if (cart == null)
            {
                cart = CreateCart();
            }

            var product = await _context.Products
                .Include(p => p.Brand)
                .Include(p => p.Category)
                .Include(p => p.ProductImages)
                .FirstOrDefaultAsync(p => p.Id == productId);


            if (product == null)
            {
                return BadRequest("Could not add product to cart");
            }

            cart.AddCartItem(product, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                return CreatedAtAction(nameof(GetCart), cart.toCartDto());
            }


            return BadRequest("Product Is Already In the Cart");
        }

        private Cart CreateCart()
        {
            var cartCookieId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.UtcNow.AddDays(30)
            };
            Response.Cookies.Append("cartCookieId", cartCookieId, cookieOptions);
            var cart = new Cart { CartCookieId = cartCookieId };
            _context.Carts.Add(cart);
            return cart;

        }


        private async Task<Cart?> RetrieveCart()
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
            .FirstOrDefaultAsync(x => x.CartCookieId == Request.Cookies["cartCookieId"]);
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteItemFromCart(int productId, int quantity)
        {
            var cart = await RetrieveCart();
            if (cart == null)
            {
                return BadRequest("Unable to retrieve Cart.");

            }
            cart.RemoveItem(productId, quantity);
            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                return Ok();
            }

            return BadRequest("Problem Updating the Cart");
        }



    }
}