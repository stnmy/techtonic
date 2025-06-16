using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.OrderModels;
using API.Models.Users;

namespace API.DTOS.Order
{
    public class CreateOrderDto
    {
        public Address ShippingAddress { get; set; }
        public bool IsCustomShippingAddress { get; set; }
        public PaymentMethod PaymentMethod { get; set; }

    }
}