using System;
using Backend.Dtos;

namespace Backend.Service;

public interface IServiceCreateMovie
{
    Task<Movie> CreateMovie(Movie movie);

    Task<Movie> DeleteMovie(Guid id);


    Task<Movie> GetMovies(Movie movie);

    Task<Movie> UpdateMovies(Movie movie);

    Task <Movie> PatchMovies(Movie movie);
}
