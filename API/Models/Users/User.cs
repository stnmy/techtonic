using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.OrderModels;
using Microsoft.AspNetCore.Identity;

namespace API.Models.Users
{
    public class User : IdentityUser
    {
        public int? AddressId { get; set; }
        public Address? Address { get; set; }
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}