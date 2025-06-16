using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOS.Order;
using API.Interfaces;
using API.Mappers;
using API.Models.CartModels;
using API.Models.OrderModels;
using API.Models.Users;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext _context;
        public OrderRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<OrderCardDto>> GetOrders(string username)
        {
            var orders = await _context.Orders
                .Include(x => x.User)
                .Where(x => x.User.Email == username)
                .ToListAsync();

            var orderDtos = orders.Select(x => x.toOrderCardDto()).ToList();

            return orderDtos;
        }

        public async Task<OrderDto> GetOrderDetails(string userName, int id)
        {
            var order = await _context.Orders
                .Include(x => x.Address)
                .Include(x => x.OrderItems)
                    .ThenInclude(x => x.Product)
                        .ThenInclude(x => x.ProductImages)
                .Include(x => x.User)
                .Where(x => x.User.Email == userName && x.OrderNumber == id)
                .FirstOrDefaultAsync();

            if (order == null)
            {
                return null;
            }

            var OrderDto = order.ToOrderDto();
            return OrderDto;
        }

        public async Task<Order> CreateOrder(string cartCookieId, string userId, CreateOrderDto createOrderDto)
        {
            var cart = await _context.Carts
                .Include(x => x.CartItems)
                    .ThenInclude(ci => ci.Product)
                .Where(x => x.CartCookieId == cartCookieId)
                .FirstOrDefaultAsync();


            if (cart == null || cart.CartItems.Count == 0)
            {
                return null;
            }

            var orderItems = CreateOrderItems(cart.CartItems);

            var subtotal = orderItems.Sum(x => x.UnitPrice * x.Quantity);

            var addressId = await getDeliveryAddress(userId, createOrderDto);

            var order = new Order
            {
                OrderNumber = await GetNextOrderNumber(),
                UserId = userId,
                OrderDate = DateTime.Now,
                AddressId = addressId,
                IsCustomShippingAddress = createOrderDto.IsCustomShippingAddress,
                Subtotal = subtotal,
                PaymentMethod = createOrderDto.PaymentMethod,
                PaymentStatus = (createOrderDto.PaymentMethod == PaymentMethod.CashOnDelivery) ? PaymentStatus.Pending : PaymentStatus.Completed,
                OrderItems = new List<OrderItem>()
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();


            foreach (var item in orderItems)
            {
                item.OrderId = order.Id;
                order.OrderItems.Add(item);
            }

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();

            return await _context.Orders
                .Include(o => o.Address)
                .Include(o => o.User)
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == order.Id);
        }

        private async Task<int> getDeliveryAddress(string userId, CreateOrderDto createOrderDto)
        {
            if (createOrderDto.IsCustomShippingAddress)
            {
                var address = new Address
                {
                    Line1 = createOrderDto.ShippingAddress.Line1,
                    City = createOrderDto.ShippingAddress.City,
                    PostalCode = createOrderDto.ShippingAddress.PostalCode
                };
                _context.Addresses.Add(address);
                await _context.SaveChangesAsync();

                return address.Id;
            }
            else
            {
                var user = await _context.Users.FindAsync(userId);

                var addressId = user.AddressId;
                return addressId.Value;
            }
        }

        private List<OrderItem> CreateOrderItems(List<CartItem> cartItems)
        {
            var orderItems = new List<OrderItem>();
            foreach (var cartItem in cartItems)
            {
                if (cartItem.Product.StockQuantity < cartItem.Quantity)
                {
                    return null;
                }
                var orderItem = new OrderItem
                {
                    ProductId = cartItem.ProductId,
                    ProductName = cartItem.Product.Name,
                    Quantity = cartItem.Quantity,
                    UnitPrice = cartItem.Product.Price,
                    TotalPrice = cartItem.Quantity * cartItem.Product.Price,
                };
                orderItems.Add(orderItem);
                cartItem.Product.StockQuantity -= cartItem.Quantity;
            }
            return orderItems;
        }

        private async Task<int> GetNextOrderNumber()
        {
            var lastOrder = await _context.Orders.OrderByDescending(x => x.OrderNumber).FirstOrDefaultAsync();
            var nextOrderNumber = lastOrder != null ? lastOrder.OrderNumber + 1 : 1000;
            return nextOrderNumber;
        }
    }
}