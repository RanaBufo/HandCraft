using HandCrafter;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//BD
builder.Services.AddDbContext<ApplicationContext>(options =>
{
    string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

var app = builder.Build();

app.MapGet("/", () => "Hello World!");


app.Run();
