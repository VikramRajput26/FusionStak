using EmployeeNamespace.AppDbContext;
using EmployeeNamespace.Models;
using EmployeeNamespace.DTO;  // Import DTOs
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeNamespace.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly ApplicationDbContext _context;

        public DepartmentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DepartmentDTO>> GetAllDepartmentsAsync()
        {
            var departments = await _context.Departments.FromSqlRaw("EXEC GetDepartments").ToListAsync();

        
            var departmentDTOs = departments.Select(d => new DepartmentDTO
            {
                DepartmentId = d.DepartmentId,
                DepartmentName = d.DepartmentName
            }).ToList();

            return departmentDTOs;
        }

        public async Task<DepartmentDTO> GetDepartmentByIdAsync(int id)
        {
          
            var department = await _context.Departments.FromSqlRaw("EXEC GetDepartmentById @DepartmentId = {0}", id).FirstOrDefaultAsync();

            if (department == null)
                return null;

           
            var departmentDTO = new DepartmentDTO
            {
                DepartmentId = department.DepartmentId,
                DepartmentName = department.DepartmentName
            };

            return departmentDTO;
        }

        public async Task AddDepartmentAsync(DepartmentDTO departmentDTO)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@DepartmentName", departmentDTO.DepartmentName)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC InsertDepartment @DepartmentName", parameters);
        }

        public async Task UpdateDepartmentAsync(DepartmentDTO departmentDTO)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@DepartmentId", departmentDTO.DepartmentId),
                new SqlParameter("@DepartmentName", departmentDTO.DepartmentName)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC UpdateDepartment @DepartmentId, @DepartmentName", parameters);
        }

        public async Task DeleteDepartmentAsync(int departmentId)
        {
            var parameter = new SqlParameter("@DepartmentId", departmentId);
            await _context.Database.ExecuteSqlRawAsync("EXEC DeleteDepartment @DepartmentId", parameter);
        }

        
    }
}
