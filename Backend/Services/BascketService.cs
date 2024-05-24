using HandCrafter.DataBase;
using HandCrafter.Model;
using System.Data.Entity;

namespace HandCrafter.Services
{
    public class BascketService
    {
        private readonly ApplicationContext _db;
        private readonly ProductService _productService;
        public BascketService(ApplicationContext db, ProductService productService) => (_db, _productService) = (db, productService);

        public bool addNeItemBascketService(BasketRequest newItem)
        {
            var product = _productService.getProductByIdService(newItem.IdProduct);
            if (product != null)
            {
                if(newItem.Quantity > product.Quantity)
                {
                    newItem.Quantity = product.Quantity;
                }
                else if(newItem.Quantity == 0)
                {
                    newItem.Quantity = 1;
                }
                var item = new BasketDB
                {
                    IdUser = newItem.IdUser,
                    IdProduct = newItem.IdProduct,
                    Price = product.Price * newItem.Quantity,
                    Quantity = newItem.Quantity,
                    Discount = newItem.Discount
                };
                _db.Baskets.Add(item);
                _db.SaveChanges();
                return true;
            }

            return false;
        }

        public List<BasketDB> getAllItemsBasketService(int id)
        {
            var allItems = _db.Baskets
                .Include(b => b.Product)
                .Where(b => b.IdUser == id)
                .GroupBy(b => b.IdProduct)
                .Select(b => new BasketDB
                {
                    Id = b.Select(b => b.Id).FirstOrDefault(),
                    IdUser = b.Select(b => b.IdUser).FirstOrDefault(),
                    IdProduct = b.Select(b=>b.IdProduct).FirstOrDefault(),
                    Quantity = b.Select(b=>b.Quantity).FirstOrDefault(),
                    Price = b.Select(b=>b.Price).FirstOrDefault(),
                    Product = b.Select(b => b.Product).FirstOrDefault()
                }).ToList();
            return allItems;
        }
        public bool updateQuentityBasketService(BasketQuantityRequest basketQuantity)
        {
            var item = _db.Baskets
                .Include(b => b.Product)
                .GroupBy(b => b.IdProduct)
                .Select(b => new BasketDB
                {
                    Id = b.Select(b => b.Id).FirstOrDefault(),
                    IdUser = b.Select(b => b.IdUser).FirstOrDefault(),
                    IdProduct = b.Select(b => b.IdProduct).FirstOrDefault(),
                    Quantity = b.Select(b => b.Quantity).FirstOrDefault(),
                    Price = b.Select(b => b.Price).FirstOrDefault(),
                    Product = b.Select(b => b.Product).FirstOrDefault()
                })
                .Where(b => b.Id == basketQuantity.Id).FirstOrDefault();
            if (item != null)
            {
                item.Quantity = basketQuantity.Quentity;
                item.Price = basketQuantity.Quentity * item.Product.Price;
                _db.Baskets.Update(item);
                _db.SaveChanges();
                return true;
            }
            return false;
        }

        public bool deleteBasketItemService(GetIdModel id)
        {
            var basket = _db.Baskets.FirstOrDefault(b => b.Id == id.Id);

            if (basket == null)
            {
                return false;
            }

            // Удаление элемента
            _db.Baskets.Remove(basket);
            _db.SaveChanges();

            return true;
        }

        public BasketDB getItemBasketService(int idProduct, int idUser)
        {
            var basket = _db.Baskets
               .FirstOrDefault(b => b.IdProduct == idProduct && b.IdUser == idUser);
            return basket;
        }
    }
}
