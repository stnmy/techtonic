using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.Product;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ApplicationDbContext(DbContextOptions options) : DbContext(options)
    {
        public required DbSet<Product> Products { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
                modelBuilder.Entity<ProductSpecificationValue>()
                    .HasOne<SpecificationField>(psv => psv.SpecificationField)
                    .WithMany()
                    .HasForeignKey(psv => psv.SpecificationFieldId)
                    .OnDelete(DeleteBehavior.Restrict);
            
            // Configure ProductKeyFeature -> Product relationship
            modelBuilder.Entity<ProductKeyFeature>()
                .HasOne<KeyFeatureDefinition>(pkf => pkf.KeyFeatureDefinition)
                .WithMany()
                .HasForeignKey(pkf => pkf.KeyFeatureDefinitionId)
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascading delete

            modelBuilder.Entity<ProductKeyFeature>()
                .HasOne<Product>()
                .WithMany(p => p.KeyFeatures)
                .HasForeignKey(pkf => pkf.ProductId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Product>()
                .Property(p => p.DiscountPrice)
                .HasPrecision(18, 2);

            base.OnModelCreating(modelBuilder);
        }


    }
}