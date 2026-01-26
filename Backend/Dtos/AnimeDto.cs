using System.Text.Json.Serialization;

namespace Backend.Dtos
{
    public class AnimeDto
    {
        [JsonPropertyName("id")]
        public string? Id { get; set; }

        [JsonPropertyName("title")]
        public string? Title { get; set; }

        [JsonPropertyName("synopsis")]
        public string? Synopsis { get; set; }

        [JsonPropertyName("ranking")]
        public int? Rank { get; set; }

        [JsonPropertyName("genres")]
        public List<string>? Genres { get; set; }

        [JsonPropertyName("episodes")]
        public int? Episodes { get; set; }

        [JsonPropertyName("image")]
        public string? Image { get; set; }
        
        [JsonPropertyName("link")]
        public string? Link { get; set; }
        
        [JsonPropertyName("type")]
        public string? Type { get; set; }
    }

    public class AnimeListResponse
    {
        [JsonPropertyName("data")]
        public List<AnimeDto>? Data { get; set; }

        [JsonPropertyName("meta")]
        public MetaData? Meta { get; set; }
    }

    public class MetaData
    {
        [JsonPropertyName("page")]
        public int Page { get; set; }

        [JsonPropertyName("size")]
        public int Size { get; set; }

        [JsonPropertyName("totalData")]
        public int TotalData { get; set; }

        [JsonPropertyName("totalPage")]
        public int TotalPage { get; set; }
    }
}
