using System.Net.Http.Headers;
using System.Text.Json;
using Backend.Dtos;
using Microsoft.Extensions.Configuration;

namespace Backend.Service
{
    public class AnimeService : IAnimeService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        private readonly string _baseUrl;
        private readonly string _apiKey;
        private readonly string _host;

        public AnimeService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            
            _baseUrl = _configuration["AnimeApi:BaseUrl"];
            _apiKey = _configuration["AnimeApi:ApiKey"];
            _host = _configuration["AnimeApi:Host"];

            _httpClient.DefaultRequestHeaders.Add("x-rapidapi-key", _apiKey);
            _httpClient.DefaultRequestHeaders.Add("x-rapidapi-host", _host);
        }

        public async Task<AnimeListResponse> SearchAnimeAsync(string title, int page = 1, int size = 10)
        {
            var url = $"{_baseUrl}/anime?page={page}&size={size}&search={Uri.EscapeDataString(title)}";
            return await GetAsync<AnimeListResponse>(url);
        }

        public async Task<AnimeListResponse> GetRankingsAsync(int page = 1, int size = 10)
        {
            var url = $"{_baseUrl}/anime?page={page}&size={size}&sortBy=ranking&sortOrder=asc";
            return await GetAsync<AnimeListResponse>(url);
        }

        public async Task<AnimeDto> GetAnimeByIdAsync(string id)
        {
            var url = $"{_baseUrl}/anime/by-id/{id}";
            return await GetAsync<AnimeDto>(url);
        }

        public async Task<List<string>> GetGenresAsync()
        {
            var url = $"{_baseUrl}/genre";

            
            var response = await _httpClient.GetStringAsync(url);
            using var doc = JsonDocument.Parse(response);
            var root = doc.RootElement;
            
            var genres = new List<string>();
            if (root.ValueKind == JsonValueKind.Array)
            {
                foreach (var element in root.EnumerateArray())
                {
                    // If it's just strings
                    if (element.ValueKind == JsonValueKind.String)
                        genres.Add(element.GetString());
                    // If it's objects
                    else if (element.TryGetProperty("_id", out var idProp))
                        genres.Add(idProp.GetString());
                    else if (element.TryGetProperty("name", out var nameProp))
                        genres.Add(nameProp.GetString());
                }
            }
            return genres;
        }

        public async Task<AnimeListResponse> GetAnimeByGenreAsync(string genre, int page = 1, int size = 10)
        {
            var url = $"{_baseUrl}/anime?page={page}&size={size}&genres={Uri.EscapeDataString(genre)}";
            return await GetAsync<AnimeListResponse>(url);
        }

        private async Task<T> GetAsync<T>(string url)
        {
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();
            var content = await response.Content.ReadAsStringAsync();
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            return JsonSerializer.Deserialize<T>(content, options);
        }
    }
}
