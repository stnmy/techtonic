using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.CartModels;
using API.Models.OrderModels;
using API.Models.ProductModels;
using API.Models.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ApplicationDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<FilterAttributeValue> FilterAttributeValues { get; set; }
        public DbSet<SubCategory> SubCategories { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<ProductAttributeValue> ProductAttributeValues { get; set; }
        public DbSet<ProductReview> ProductReviews { get; set; }
        public DbSet<ProductQuestion> ProductQuestions { get; set; }
        public DbSet<ProductVisit> ProductVisits { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<FilterAttribute> FilterAttributes { get; set; }

        public DbSet<Cart> Carts { get; set; }
        public DbSet<Address> Addresses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<IdentityRole>()
                .HasData(
                    new IdentityRole { Id = "fa72adec-45b1-46f2-b08f-5c8fa426a5e6", Name = "Customer", NormalizedName = "CUSTOMER" },
                    new IdentityRole { Id = "92b2c167-3a86-4467-9580-5f7c53294001", Name = "Moderator", NormalizedName = "MODERATOR" },
                    new IdentityRole { Id = "c7960a54-b394-4669-877b-d152f26416bf", Name = "Admin", NormalizedName = "ADMIN" }
                );

            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasColumnType("decimal(18, 2)")
                .IsRequired();

            modelBuilder.Entity<Product>()
                .Property(p => p.DiscountPrice)
                .HasColumnType("decimal(18, 2)")
                .IsRequired(false);


            modelBuilder.Entity<ProductAttributeValue>()
                .HasOne<Product>() // or pav => pav.Product if navigation kept
                .WithMany(p => p.AttributeValues)
                .HasForeignKey(pav => pav.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ProductVisit>()
                .HasOne(pv => pv.Product)
                .WithMany(p => p.Visits)
                .HasForeignKey(pv => pv.ProductId)
                .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<Order>()
                .Property(o => o.Subtotal)
                .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<Order>()
                .HasOne(o => o.User)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<OrderItem>()
                .Property(oi => oi.UnitPrice)
                .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<OrderItem>()
                .Property(oi => oi.TotalPrice)
                .HasColumnType("decimal(18, 2)");
        }

    }
}
