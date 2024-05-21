using HandCrafter.DataBase;
using HandCrafter.Model;

namespace HandCrafter.Services
{
    public class ProductService
    {
        private readonly ApplicationContext _db;
        public ProductService(ApplicationContext db) => (_db) = (db);

        public void addProductService(ProductRequestModel newProduct)
        {
            var addProduct = new ProductDB
            {
                Name = newProduct?.Name ?? "Новый продукт",
                Description = newProduct.Description,
                Price = newProduct?.Price ?? 5000,
                Discount = newProduct?.Discount ?? 0,
                Quantity = newProduct?.Quantity ?? 0
            };
            _db.Products.Add(addProduct);


            _db.SaveChanges();
            if (newProduct.ProductColor != null)
            {
                var colors = _db.Colors;
                foreach (var colorId in newProduct.ProductColor)
                {
                    if (colors.Any(c => c.Id == colorId.Id))
                    {
                        _db.ProductsColors.Add(new ProductColorDB
                        {
                            IdProduct = addProduct.Id,
                            IdColor = colorId.Id
                        });


                        _db.SaveChanges();
                    }

                }
            }
            if (newProduct.ProductCategory != null)
            {

                var categories = _db.Categories;
                foreach (var categoryId in newProduct.ProductCategory)
                {
                    
                        if (categories.Any(c => c.Id == categoryId.Id))
                        {
                            _db.ProductsCategories.Add(new ProductCategoryDB
                            {
                                IdProduct = addProduct.Id,
                                IdCategory = categoryId.Id
                            });


                        _db.SaveChanges();
                    }                   
                    
                }
            }
            if (newProduct.ProductComposition != null)
            {
                var composition = _db.Compositions;
                foreach (var compositionId in newProduct.ProductComposition)
                {
                    if (composition.Any(c => c.Id == compositionId.Id))
                    {
                        _db.ProductsCompositions.Add(new ProductCompositionDB
                        {
                            IdProduct = addProduct.Id,
                            IdComposition = compositionId.Id
                        });

                        _db.SaveChanges();
                    }
                    
                }
            }

        }
    }
}
