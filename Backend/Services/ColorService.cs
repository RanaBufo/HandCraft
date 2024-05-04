using HandCrafter.DataBase;
using Microsoft.EntityFrameworkCore;

namespace HandCrafter.Services
{
    public class ColorService
    {
        private readonly ApplicationContext _db;

        public ColorService(ApplicationContext db) => (_db) = (db);

        public async Task<List<ColorDB>> GetColorsService()
        {
            var allColors = await _db.Colors.ToListAsync();
            return allColors;
        }
        public async Task AddColorService(string? Name)
        {
            var newColor = new ColorDB
            {
                Name = Name ?? "NewRole"
            };
            _db.Colors.Add(newColor);
            await _db.SaveChangesAsync();
        }

        public async Task DeleteColorService(int? id)
        {
            var allColors = await GetColorsService();
            foreach (var color in allColors)
            {
                if (color.Id == id)
                {
                    _db.Colors.Remove(color);
                    await _db.SaveChangesAsync();
                    break;
                }
            }
        }
    }
}
