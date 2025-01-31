using EmployeeNamespace.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmployeeNamespace.Services
{
    public interface IDepartmentService
    {
        Task<IEnumerable<DepartmentDTO>> GetAllDepartmentsAsync();
        Task<DepartmentDTO> GetDepartmentByIdAsync(int id);
        Task AddDepartmentAsync(DepartmentDTO departmentDTO);
        Task UpdateDepartmentAsync(DepartmentDTO departmentDTO);
        Task DeleteDepartmentAsync(int departmentId);
    }
}
