using System;
using Backend.Dtos;
namespace Backend.Service;

public class ServiceCreateMovie : IServiceCreateMovie
{
    private readonly DB.AppDbContext _context;

    public ServiceCreateMovie(DB.AppDbContext context)
    {
        _context = context;
    }


    public async Task<Movie> CreateMovie(Movie movie)
    {
        var movieDb = new Models.MovieDb
        {
            Id = Guid.NewGuid(),
            MovieName = movie.MovieName,
            Description = movie.Description,
            NumberEpisodes = movie.NumberEpisodes,
            CreatedAt = DateTime.UtcNow
        };

        _context.Movies.Add(movieDb);
        await _context.SaveChangesAsync();

        movie.Id = movieDb.Id;
        movie.CreatedAt = movieDb.CreatedAt;

        return movie;
    }


    public Task<Movie> DeleteMovie(Guid id)
    {
        throw new NotImplementedException();
    }


    public Task<Movie> GetMovies(Movie movie)
    {
        throw new NotImplementedException();
    }


    public Task<Movie> UpdateMovies(Movie movie)
    {
        throw new NotImplementedException();
    }

    public Task<Movie> PatchMovies(Movie movie)
    {
        throw new NotImplementedException();
    }
}
