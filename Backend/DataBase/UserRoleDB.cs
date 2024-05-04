using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HandCrafter.DataBase
{
    public class UserRoleDB
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public int IdUser { get; set; }
        [Required]
        public int IdRole { get; set; }
        public UserDB? User { get; set; } = null!;
        public RoleDB? Role { get; set; } = null!;
    }
}
