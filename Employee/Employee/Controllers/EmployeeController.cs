using EmployeeNamespace.DTO;
using EmployeeNamespace.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmployeeNamespace.Controllers
{
    [Route("api/employee")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        public EmployeeController(EmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet("getbyid/{id}")]
        public IActionResult GetEmployee(int id)
        {
            try
            {
                var employee = _employeeService.GetEmployeeById(id);
                return Ok(employee);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);  // Return 404 if employee is not found
            }
        }
        [HttpGet("getall")]
        public async Task<ActionResult<IEnumerable<EmployeeDTO>>> GetAllEmployees()
        {
            var employees = await _employeeService.GetAllEmployeesAsync();
            return Ok(employees);
        }

      

        [HttpPost("addemployee")]
        public async Task<ActionResult> CreateEmployee(EmployeeDTO employeeDTO)
        {
            
            await _employeeService.AddEmployeeAsync(employeeDTO);

            
            return CreatedAtAction(nameof(GetEmployee), new { id = employeeDTO.EmployeeId }, employeeDTO);
        }


        [HttpPut("updateemployee/{id}")]
        public async Task<ActionResult> UpdateEmployee(int id, EmployeeDTO employeeDTO)
        {
           
            await _employeeService.UpdateEmployeeAsync(id, employeeDTO);

            return NoContent(); 
        }


        [HttpDelete("deleteemployee/{id}")]
        public async Task<ActionResult> DeleteEmployee(int id)
        {
            await _employeeService.DeleteEmployeeAsync(id);
            return NoContent();
        }
    }
}
