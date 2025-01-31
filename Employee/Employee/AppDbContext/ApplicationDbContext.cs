using Microsoft.EntityFrameworkCore;
using EmployeeNamespace.Models;

namespace EmployeeNamespace.AppDbContext
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Department)
                .WithMany(d => d.Employees)
                .HasForeignKey(e => e.DepartmentId)
                .OnDelete(DeleteBehavior.Restrict); // Deleting a Department will not delete its Employees

            modelBuilder.Entity<Employee>()
                .ToTable("Employees") // Table name
                .HasKey(e => e.EmployeeId); // Primary Key

            modelBuilder.Entity<Employee>()
                .Property(e => e.EmployeeId)
                .HasColumnName("EmployeeId") // Column name
                .ValueGeneratedOnAdd(); // Auto-increment

            modelBuilder.Entity<Employee>()
                .Property(e => e.FirstName)
                .HasColumnName("FirstName") // Column name
                .IsRequired()  // Not Null
                .HasMaxLength(100);  // Max length of 100 characters

            modelBuilder.Entity<Employee>()
                .Property(e => e.LastName)
                .HasColumnName("LastName") // Column name
                .IsRequired()  // Not Null
                .HasMaxLength(100);  // Max length of 100 characters

            modelBuilder.Entity<Employee>()
                .Property(e => e.Email)
                .HasColumnName("Email") // Column name
                .IsRequired()  // Not Null
                .HasMaxLength(100);  // Max length of 100 characters

            modelBuilder.Entity<Employee>()
                .Property(e => e.Salary)
                .HasColumnName("Salary")  // Column name
                .IsRequired();  // Not Null

            modelBuilder.Entity<Employee>()
                .Property(e => e.DepartmentId)
                .HasColumnName("DepartmentId") // Column name
                .IsRequired();  // Foreign Key, not Null

            // Unique constraint on Email
            modelBuilder.Entity<Employee>()
                .HasIndex(e => e.Email)
                .IsUnique();  // Ensure Email is unique

            // Configuring the Department entity
            modelBuilder.Entity<Department>()
                .ToTable("Departments")  // Table name
                .HasKey(d => d.DepartmentId); // Primary Key

            modelBuilder.Entity<Department>()
                .Property(d => d.DepartmentId)
                .HasColumnName("DepartmentId") // Column name
                .ValueGeneratedOnAdd();  // Auto-increment

            modelBuilder.Entity<Department>()
                .Property(d => d.DepartmentName)
                .HasColumnName("DepartmentName") // Column name
                .IsRequired()  // Not Null
                .HasMaxLength(100);  // Max length of 100 characters

            base.OnModelCreating(modelBuilder);
        }
    }
}
