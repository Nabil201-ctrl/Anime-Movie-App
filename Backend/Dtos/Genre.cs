using System;

namespace Backend.Dtos;

public class Genre
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
}
