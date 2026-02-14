using Backend.Dtos;

namespace Backend.Service
{
    public interface IAnimeService
    {
        Task<AnimeListResponse> SearchAnimeAsync(string title, int page = 1, int size = 10);
        Task<AnimeListResponse> GetRankingsAsync(int page = 1, int size = 10);
        Task<AnimeDto> GetAnimeByIdAsync(string id);
        Task<List<string>> GetGenresAsync();
        Task<AnimeListResponse> GetAnimeByGenreAsync(string genre, int page = 1, int size = 10);

        Task<AnimeListResponse> HealthCheckAsync();
    }
}
