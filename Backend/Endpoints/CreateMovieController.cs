using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Dtos;

namespace Backend.Endpoints
{
    [Route("api/")]
    [ApiController]
    public class CreateMovieController : ControllerBase
    {
        [HttpPost]
        public IActionResult CreateMovie([FromBody] Movie movie)
        {
            return Ok();
        }


        /* Get data */
        [HttpGet]
        public IActionResult GetMovies([FromBody] Movie movie)
        {

            return Ok();
        }
    }
}
