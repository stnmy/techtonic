using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.CartModels;
using API.Models.ProductModels;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ApplicationDbContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<SubCategory> SubCategories { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<ProductAttributeValue> ProductAttributeValues { get; set; }
        public DbSet<ProductReview> ProductReviews { get; set; }
        public DbSet<ProductQuestion> ProductQuestions { get; set; }
        public DbSet<ProductVisit> ProductVisits { get; set; }

        public DbSet<Cart> Carts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

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

        }

    }
}
