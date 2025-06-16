using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOS.Order;
using API.Models.OrderModels;

namespace API.Interfaces
{
    public interface IOrderRepository
    {

        Task<List<OrderCardDto>> GetOrders(string userName);
        Task<OrderDto> GetOrderDetails(string username, int id);
        Task<Order> CreateOrder(string cartCookieId, string username, CreateOrderDto createOrderDto);
    }
}