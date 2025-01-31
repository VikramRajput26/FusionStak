using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EmployeeNamespace.Models
{
    public class Department
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DepartmentId { get; set; }

        [Required(ErrorMessage = "Department Name is Mandatory!!!")]
        [MaxLength(100)]
        public string DepartmentName { get; set; }

        
        public ICollection<Employee> Employees { get; set; } = new List<Employee>();  // One Department has many Employees
    }
}
