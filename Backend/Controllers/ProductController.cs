using HandCrafter.Model;
using HandCrafter.Services;
using Microsoft.AspNetCore.Mvc;

namespace HandCrafter.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : Controller
    {
        private readonly ProductService _productService;
        public ProductController(ProductService productService) => (_productService) = (productService);

        [HttpPost("ProductRequestModel")]
        public IActionResult ProductGet(ProductRequestModel newProduct)
        {
            if (newProduct == null)
            {
                return NoContent();
            }
            _productService.addProductService(newProduct);
            return Ok();
        }

        
    }
}
