﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HandCraft.DataBase
{
    public class UserDB
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public string? Patronymic { get; set; }
        public string? Description { get; set; }
        [property: Required]
        public DateTime Birthday { get; set; }
        public ICollection<UserRoleDB> UserRoles { get; set; } = new List<UserRoleDB>();
        public ICollection<BasketDB> Basket { get; set; } = new List<BasketDB>();
        public ICollection<AddressDB> Address { get; set; } = new List<AddressDB>();
        public ContactDB? Contact { get; set; } = null;

    }
}
