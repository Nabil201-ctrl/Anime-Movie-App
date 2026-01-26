using System;

namespace Backend.Dtos;

public class Movie
{
    public Guid Id { get; set; }
    public string MovieName { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string NumberEpisodes {get; set;} = string.Empty;
    public DateTime CreatedAt { get; set; }

}
