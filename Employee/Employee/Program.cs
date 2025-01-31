using EmployeeNamespace.Models;
using EmployeeNamespace.Services;
using EmployeeNamespace.Models;
using EmployeeNamespace.Services;
using Microsoft.EntityFrameworkCore;
using EmployeeNamespace.AppDbContext;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IDepartmentService, DepartmentService>();

var app = builder.Build();


app.UseAuthorization();
app.MapControllers();
app.Run();
