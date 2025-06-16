using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.OrderModels;

namespace API.DTOS.Order
{
    public class OrderCardDto
    {
        public int OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }

        public decimal Subtotal { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public OrderStatus Status { get; set; }  // If you add it to Order

        public string UserEmail { get; set; } // Optional if admin views
    }
}