using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using HandCraft.DataBase;

namespace HandCrafter.DataBase
{
    public class CategorieDB
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public ICollection<ProductCategoryDB> ProductCategories { get; set; } = new List<ProductCategoryDB>();
    }
}
