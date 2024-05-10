﻿// <auto-generated />
using System;
using HandCrafter;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace HandCrafter.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    partial class ApplicationContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("HandCrafter.DataBase.AddressDB", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Entrance")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("House")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("IdUser")
                        .HasColumnType("int");

                    b.Property<string>("Intercom")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Region")
                        .HasColumnType("longtext");

                    b.Property<string>("Room")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Street")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("ID");

                    b.HasIndex("IdUser");

                    b.ToTable("Addesses");
                });

            modelBuilder.Entity("HandCrafter.DataBase.BasketDB", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<double>("Discount")
                        .HasColumnType("double");

                    b.Property<int>("IdProduct")
                        .HasColumnType("int");

                    b.Property<int>("IdUser")
                        .HasColumnType("int");

                    b.Property<double>("Price")
                        .HasColumnType("double");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("IdProduct");

                    b.HasIndex("IdUser");

                    b.ToTable("Baskets");
                });

            modelBuilder.Entity("HandCrafter.DataBase.CategoryDB", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("HandCrafter.DataBase.ColorDB", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Colors");
                });

            modelBuilder.Entity("HandCrafter.DataBase.CompositionDB", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Compositions");
                });

            modelBuilder.Entity("HandCrafter.DataBase.ContactDB", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("IdUser")
                        .HasColumnType("int");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("IdUser")
                        .IsUnique();

                    b.ToTable("Contacts");
                });

            modelBuilder.Entity("HandCrafter.DataBase.ProductCategoryDB", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("IdCategory")
                        .HasColumnType("int");

                    b.Property<int>("IdProduct")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("IdCategory");

                    b.HasIndex("IdProduct");

                    b.ToTable("ProductsCategories");
                });

            modelBuilder.Entity("HandCrafter.DataBase.ProductColorDB", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("IdColor")
                        .HasColumnType("int");

                    b.Property<int>("IdProduct")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("IdColor");

                    b.HasIndex("IdProduct");

                    b.ToTable("ProductsColors");
                });

            modelBuilder.Entity("HandCrafter.DataBase.ProductCompositionDB", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("IdComposition")
                        .HasColumnType("int");

                    b.Property<int>("IdProduct")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("IdComposition");

                    b.HasIndex("IdProduct");

                    b.ToTable("ProductsCompositions");
                });

            modelBuilder.Entity("HandCrafter.DataBase.ProductDB", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<double>("Discount")
                        .HasColumnType("double");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<double>("Price")
                        .HasColumnType("double");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("HandCrafter.DataBase.RoleDB", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("HandCrafter.DataBase.UserDB", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateOnly>("Birthday")
                        .HasColumnType("date");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ImgName")
                        .HasColumnType("longtext");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Patronymic")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("HandCrafter.DataBase.UserRoleDB", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("IdRole")
                        .HasColumnType("int");

                    b.Property<int>("IdUser")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("IdRole");

                    b.HasIndex("IdUser");

                    b.ToTable("UserRoles");
                });

            modelBuilder.Entity("HandCrafter.DataBase.AddressDB", b =>
                {
                    b.HasOne("HandCrafter.DataBase.UserDB", "User")
                        .WithMany("Address")
                        .HasForeignKey("IdUser")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("HandCrafter.DataBase.BasketDB", b =>
                {
                    b.HasOne("HandCrafter.DataBase.ProductDB", "Product")
                        .WithMany("Basket")
                        .HasForeignKey("IdProduct")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HandCrafter.DataBase.UserDB", "User")
                        .WithMany("Basket")
                        .HasForeignKey("IdUser")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Product");

                    b.Navigation("User");
                });

            modelBuilder.Entity("HandCrafter.DataBase.ContactDB", b =>
                {
                    b.HasOne("HandCrafter.DataBase.UserDB", "User")
                        .WithOne("Contact")
                        .HasForeignKey("HandCrafter.DataBase.ContactDB", "IdUser")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("HandCrafter.DataBase.ProductCategoryDB", b =>
                {
                    b.HasOne("HandCrafter.DataBase.CategoryDB", "Category")
                        .WithMany("ProductCategory")
                        .HasForeignKey("IdCategory")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HandCrafter.DataBase.ProductDB", "Product")
                        .WithMany("ProductCategory")
                        .HasForeignKey("IdProduct")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("HandCrafter.DataBase.ProductColorDB", b =>
                {
                    b.HasOne("HandCrafter.DataBase.ColorDB", "Color")
                        .WithMany("ProductColor")
                        .HasForeignKey("IdColor")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HandCrafter.DataBase.ProductDB", "Product")
                        .WithMany("ProductColor")
                        .HasForeignKey("IdProduct")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Color");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("HandCrafter.DataBase.ProductCompositionDB", b =>
                {
                    b.HasOne("HandCrafter.DataBase.CompositionDB", "Composition")
                        .WithMany("ProductComposition")
                        .HasForeignKey("IdComposition")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HandCrafter.DataBase.ProductDB", "Product")
                        .WithMany("ProductComposition")
                        .HasForeignKey("IdProduct")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Composition");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("HandCrafter.DataBase.UserRoleDB", b =>
                {
                    b.HasOne("HandCrafter.DataBase.RoleDB", "Role")
                        .WithMany("UserRoles")
                        .HasForeignKey("IdRole")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HandCrafter.DataBase.UserDB", "User")
                        .WithMany("UserRoles")
                        .HasForeignKey("IdUser")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");

                    b.Navigation("User");
                });

            modelBuilder.Entity("HandCrafter.DataBase.CategoryDB", b =>
                {
                    b.Navigation("ProductCategory");
                });

            modelBuilder.Entity("HandCrafter.DataBase.ColorDB", b =>
                {
                    b.Navigation("ProductColor");
                });

            modelBuilder.Entity("HandCrafter.DataBase.CompositionDB", b =>
                {
                    b.Navigation("ProductComposition");
                });

            modelBuilder.Entity("HandCrafter.DataBase.ProductDB", b =>
                {
                    b.Navigation("Basket");

                    b.Navigation("ProductCategory");

                    b.Navigation("ProductColor");

                    b.Navigation("ProductComposition");
                });

            modelBuilder.Entity("HandCrafter.DataBase.RoleDB", b =>
                {
                    b.Navigation("UserRoles");
                });

            modelBuilder.Entity("HandCrafter.DataBase.UserDB", b =>
                {
                    b.Navigation("Address");

                    b.Navigation("Basket");

                    b.Navigation("Contact");

                    b.Navigation("UserRoles");
                });
#pragma warning restore 612, 618
        }
    }
}
