using Backend.Dtos;
using Backend.Service;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Endpoints
{
    [ApiController]
    [Route("api")]
    public class AnimeController : ControllerBase
    {
        private readonly IAnimeService _animeService;

        public AnimeController(IAnimeService animeService)
        {
            _animeService = animeService;
        }

        [HttpGet("health")]
        public async Task<IActionResult>HealthCheck(){
            try
            {
                var result = await _animeService.HealthCheckAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        
        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string title, [FromQuery] int page = 1, [FromQuery] int size = 10)
        {
            if (string.IsNullOrWhiteSpace(title))
            {
                // Can also return all if no title, but "search by title" implies title is needed.
                return BadRequest("Title is required");
            }

            try
            {
                var result = await _animeService.SearchAnimeAsync(title, page, size);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("rankings")]
        public async Task<IActionResult> GetRankings([FromQuery] int page = 1, [FromQuery] int size = 10)
        {
            try
            {
                var result = await _animeService.GetRankingsAsync(page, size);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("anime/{id}")]
        public async Task<IActionResult> GetAnimeById(string id)
        {
            try
            {
                var result = await _animeService.GetAnimeByIdAsync(id);
                if (result == null) return NotFound();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("genres")]
        public async Task<IActionResult> GetGenres()
        {
            try
            {
                var result = await _animeService.GetGenresAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("genre/{name}")]
        public async Task<IActionResult> GetAnimeByGenre(string name, [FromQuery] int page = 1, [FromQuery] int size = 10)
        {
            try
            {
                var result = await _animeService.GetAnimeByGenreAsync(name, page, size);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
