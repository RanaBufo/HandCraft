using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HandCraft.DataBase
{
    public class RoleDB
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public ICollection<UserRoleDB> UserRoles { get; set; } = new List<UserRoleDB>();
    }
}
