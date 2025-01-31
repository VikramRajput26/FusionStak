using EmployeeNamespace.AppDbContext;
using EmployeeNamespace.Models;
using EmployeeNamespace.DTO;  // Import DTOs
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using Dapper;

namespace EmployeeNamespace.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly ApplicationDbContext _context;

        public EmployeeService(ApplicationDbContext context)
        {
            _context = context;
        }

        private readonly string _connectionString;

        public EmployeeService(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<IEnumerable<EmployeeDTO>> GetAllEmployeesAsync()
        {
          
            var employees = await _context.Employees.FromSqlRaw("EXEC GetEmployees").ToListAsync();

         
            var employeeDTOs = employees.Select(e => new EmployeeDTO
            {
                EmployeeId = e.EmployeeId,
                FirstName = e.FirstName,
                LastName = e.LastName,
                Email = e.Email,
                DepartmentId = e.DepartmentId,
                Salary = e.Salary
            }).ToList();

            return employeeDTOs;
        }

        public EmployeeDTO GetEmployeeById(int id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("@EmployeeId", id);

                var employee = connection.QuerySingleOrDefault<EmployeeDTO>("GetEmployeeById", parameters, commandType: CommandType.StoredProcedure);
                if (employee == null)
                {
                    throw new Exception("Employee not found");
                }

                return employee;
            }
        }



        public async Task AddEmployeeAsync(EmployeeDTO employeeDTO)
        {
           
            var parameters = new SqlParameter[]
            {
        new SqlParameter("@FirstName", SqlDbType.VarChar, 100) { Value = employeeDTO.FirstName },
        new SqlParameter("@LastName", SqlDbType.VarChar, 100) { Value = employeeDTO.LastName },
        new SqlParameter("@Email", SqlDbType.VarChar, 100) { Value = employeeDTO.Email },
        new SqlParameter("@DepartmentId", SqlDbType.Int) { Value = employeeDTO.DepartmentId },
        new SqlParameter("@Salary", SqlDbType.Decimal) { Value = employeeDTO.Salary }
            };

            
            await _context.Database.ExecuteSqlRawAsync("EXEC InsertEmployee @FirstName, @LastName, @Email, @DepartmentId, @Salary", parameters);

            
            var lastInsertedEmployee = await _context.Employees
                .Where(e => e.Email == employeeDTO.Email)  
                .OrderByDescending(e => e.EmployeeId)  
                .FirstOrDefaultAsync();

            if (lastInsertedEmployee != null)
            {
               
                employeeDTO.EmployeeId = lastInsertedEmployee.EmployeeId;
            }
        }



        public async Task UpdateEmployeeAsync(int employeeId, EmployeeDTO employeeDTO)
        {
            
            var employee = await _context.Employees.FindAsync(employeeId);

            if (employee == null)
            {
                throw new Exception("Employee not found");
            }

            
            employee.FirstName = employeeDTO.FirstName;
            employee.LastName = employeeDTO.LastName;
            employee.Email = employeeDTO.Email;
            employee.DepartmentId = employeeDTO.DepartmentId;
            employee.Salary = employeeDTO.Salary;

            
            await _context.SaveChangesAsync();
        }



        public async Task DeleteEmployeeAsync(int employeeId)
        {
            var parameter = new SqlParameter("@EmployeeId", employeeId);
            await _context.Database.ExecuteSqlRawAsync("EXEC DeleteEmployee @EmployeeId", parameter);
        }

        
    }
}
