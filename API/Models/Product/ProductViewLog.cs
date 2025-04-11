using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.Product
{public class ProductViewLog
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public DateTime ViewedAt { get; set; }

}

}