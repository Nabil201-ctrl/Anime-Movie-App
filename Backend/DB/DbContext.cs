using System;
using Microsoft.EntityFrameworkCore;

namespace Backend.DB;

public class AppDbContext: DbContext
{
    
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}

    public DbSet<Models.MovieDb> Movies { get; set; }
}
