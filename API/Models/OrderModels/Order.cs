using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.Users;

namespace API.Models.OrderModels
{
    public class Order
    {
        public int Id { get; set; }
        public int OrderNumber { get; set; }
        public required string UserId { get; set; }
        public User User { get; set; } = null!;

        public DateTime OrderDate { get; set; }

        public required int AddressId { get; set; }
        public Address Address { get; set; } = null!;

        public bool IsCustomShippingAddress { get; set; }
        public decimal Subtotal { get; set; }

        public PaymentMethod PaymentMethod { get; set; }
        public PaymentStatus PaymentStatus { get; set; }

        public bool IsCancellationRequested { get; set; } = false;
        public int? CancelApprovedByModeratorId { get; set; }

        public bool IsRefundRequested { get; set; } = false;
        public int? RefundApprovedByModeratorId { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    }
}