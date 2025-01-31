using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace EmployeeNamespace.Models
{
    [Index(nameof(Email), IsUnique = true)]  
    public class Employee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EmployeeId { get; set; }

        [Required(ErrorMessage = "First Name is Mandatory!!!")]
        [MaxLength(100)]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last Name is Mandatory!!!")]
        [MaxLength(100)]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Email is Mandatory!!!")]
        [EmailAddress(ErrorMessage = "Email format is Invalid!!!")]
        [MaxLength(100)]
        public string Email { get; set; } 

        [Required(ErrorMessage = "Department is Mandatory!!!")]
        public int DepartmentId { get; set; }  

        public Department Department { get; set; }

        [Required(ErrorMessage = "Salary is Mandatory!!!")]
        [Range(0, double.MaxValue, ErrorMessage = "Salary must be a positive number")]
        public double Salary { get; set; }  
    }

  
}
