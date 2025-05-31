using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOS;
using API.Interfaces;
using API.Mappers;
using API.Models.CartModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class CartController : BaseApiController
    {
        private readonly ICartRepository _cartRepository;


        public CartController(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
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

            var product = await _cartRepository.GetProduct(productId);


            if (product == null)
            {
                return BadRequest("Could not add product to cart");
            }

            cart.AddCartItem(product, quantity);
            var result = await _cartRepository.SaveChangesAsync();
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
            _cartRepository.AddCart(cart);
            return cart;

        }


        private async Task<Cart?> RetrieveCart()
        {
            var cartCookieId = Request.Cookies["cartCookieId"];
            if (cartCookieId == null)
            {
                return null;
            }
            return await _cartRepository.RetrieveCart(cartCookieId);

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
            var result = await _cartRepository.SaveChangesAsync();

            if (result)
            {
                return Ok();
            }

            return BadRequest("Problem Updating the Cart");
        }



    }
}