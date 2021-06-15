using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PopUpModalWindow.Models
{
    public class Student
    {
        [Required]
        public string FullName { get; set; }
        public string Email { get; set; }
    }
}
