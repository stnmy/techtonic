using API.Data;
using API.Interfaces;
using API.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(opt => 
{
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
builder.Services.AddScoped<IProductRepository, ProductRepository>();

var app = builder.Build();

app.UseCors(opt =>{
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:5000");
});
app.MapControllers();
DbInitializer.InitDb(app);

app.Run();
