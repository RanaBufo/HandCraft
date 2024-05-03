using HandCraft.DataBase;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace HandCrafter.DataBase
{
    public class ApplicationContext : DbContext
    {
        public DbSet<AdrdressDB> Addesses { get; set; }
        public DbSet<RolesDB> Roles { get; set; }
        public DbSet<UserRoleDB> UserRoles { get; set; }
        public DbSet<UserDB> Users { get; set; }
        public DbSet<ContactDB> Contacts { get; set; }
        public DbSet<BasketDB> Baskets { get; set; }
        public DbSet<ProductDB> Products { get; set; }
        public DbSet<ProductColorDB> ProductsColors { get; set; }
        public DbSet<ColorDB> Colors { get; set; }
        public DbSet<ProductCompositionDB> ProductsCompositions { get; set; }
        public DbSet<CompositionDB> Compositions { get; set; }
        public DbSet<ProductCategoryDB> ProductsCategories { get; set; }
        public DbSet<CategoryDB> Categories { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Связь между продуктами и категориями, через смежную таблицу
            modelBuilder.Entity<ProductDB>()
                .HasMany(e => e.ProductCategory)
                .WithOne(e => e.Product)
                .HasForeignKey(e => e.IdProduct).IsRequired();
            modelBuilder.Entity<CategoryDB>()
                .HasMany(e => e.ProductCategory)
                .WithOne(e => e.Category)
                .HasForeignKey(e => e.IdCategory).IsRequired();

            //Связь между продуктами и цветами, через смежную таблицу
            modelBuilder.Entity<ProductDB>()
                .HasMany(e => e.ProductColor)
                .WithOne(e => e.Product)
                .HasForeignKey(e => e.IdProduct).IsRequired();
            modelBuilder.Entity<ColorDB>()
                .HasMany(e => e.ProductColor)
                .WithOne(e => e.Color)
                .HasForeignKey(e => e.IdColor).IsRequired();
        }
    }
}
