using EmployeeNamespace.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmployeeNamespace.Services
{
    public interface IEmployeeService
    {
        Task<IEnumerable<EmployeeDTO>> GetAllEmployeesAsync();
        EmployeeDTO GetEmployeeById(int id);
        Task AddEmployeeAsync(EmployeeDTO employeeDTO);
        Task UpdateEmployeeAsync(int employeeId, EmployeeDTO employeeDTO);
        Task DeleteEmployeeAsync(int employeeId);
    }
}
