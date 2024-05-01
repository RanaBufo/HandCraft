using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HandCraft.DataBase
{
    public class Product_Composition
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int Id { get; set; }
        [Required]
        public int IdProduct { get; set; }
        [Required]
        public int IdComposition { get; set; }
    }
}
}
