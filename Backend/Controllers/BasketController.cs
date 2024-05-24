using HandCrafter.Model;
using HandCrafter.Services;
using Microsoft.AspNetCore.Mvc;

namespace HandCrafter.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BasketController : Controller
    {
        private readonly BascketService _basketService;
        public BasketController(BascketService basketService) => (_basketService) = (basketService);

        [HttpPost("BasketPost")]
        public IResult BasketPost(BasketRequest newItem)
        {
            if (_basketService.addNeItemBascketService(newItem))
            {
                return Results.Ok();
            }
            return Results.NotFound();
        }

        [HttpGet("BasketGet")]
        public IActionResult BasketGet(int id)
        {
            var allItems = _basketService.getAllItemsBasketService(id);
            if(allItems.Count > 0)
            {
                return Json(allItems);
            }
            return NotFound();
        }

        [HttpGet("BasketItemGet")]
        public IActionResult BasketItemGet(int idProduct, int idUser)
        {
            var allItems = _basketService.getItemBasketService(idProduct, idUser);
            if (allItems != null)
            {
                return Json(allItems);
            }
            return NotFound();
        }

        [HttpPut("BasketPut")]
        public IActionResult BasketPut(BasketQuantityRequest basketQuantity)
        {
            if (_basketService.updateQuentityBasketService(basketQuantity))
            {
                return Ok();
            }
            return NotFound();
        }

        [HttpDelete("BasketDelete")]
        public IActionResult BasketDelete(GetIdModel id)
        {
            if (_basketService.deleteBasketItemService(id))
            {
                return Ok();
            }
            return NotFound();
        }
    }
}
