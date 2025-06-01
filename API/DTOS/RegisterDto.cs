using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOS
{
    public class RegisterDto
    {
        [Required]
        public string Email { get; set; } = string.Empty;
        public required string Password { get; set; }
    }
}