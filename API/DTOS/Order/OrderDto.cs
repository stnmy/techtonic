using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.OrderModels;

namespace API.DTOS.Order
{
    public class OrderDto
    {
        public int OrderNumber { get; set; }
        public string UserEmail { get; set; } = null!;

        public string OrderDate { get; set; }
        public string ShippingAddress { get; set; } = string.Empty;
        public decimal Subtotal { get; set; }

        public PaymentMethod PaymentMethod { get; set; }
        public PaymentStatus PaymentStatus { get; set; }

        public List<OrderItemDto> OrderItems { get; set; } = new();
    }
}