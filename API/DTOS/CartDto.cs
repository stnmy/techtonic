using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.CartModels;

namespace API.DTOS
{
    public class CartDto
    {
        // public int CartId { get; set; }
        public required string CartCookieId { get; set; }
        public List<CartItemDto> CartItems { get; set; } = [];
    }
}