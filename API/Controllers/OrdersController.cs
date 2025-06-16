using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOS.Order;
using API.Extentions;
using API.Interfaces;
using API.Mappers;
using API.Models.OrderModels;
using API.Repository;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class OrdersController : BaseApiController
    {
        private readonly IOrderRepository _orderRepository;
        public OrdersController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderCardDto>>> GetOrders()
        {
            var username = User.GetUsername();
            var orderDtos = await _orderRepository.GetOrders(username);

            if (orderDtos == null || orderDtos.Count == 0)
            {
                return NotFound("No Orders Found");
            }

            return orderDtos;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<OrderDto>> GetOrderDetails(int id)
        {
            var username = User.GetUsername();
            var orderDto = await _orderRepository.GetOrderDetails(username, id);

            if (orderDto == null)
            {
                return NotFound("Cant find the order");
            }

            return orderDto;
        }

        [HttpPost]
        public async Task<ActionResult<OrderDto>> CreateOrder([FromBody] CreateOrderDto orderDto)
        {
            var cartId = Request.Cookies["cartCookieId"];
            var userId = User.GetUserId();
            if (string.IsNullOrEmpty(cartId))
            {
                return BadRequest("Invalid Cart");
            }
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var order = await _orderRepository.CreateOrder(cartId, userId, orderDto);

            if (order == null)
            {
                return BadRequest("Order could not be created. Check stock or cart status.");
            }

            return CreatedAtAction(nameof(GetOrderDetails), new { id = order.Id }, order.ToOrderDto());
        }
    }
}