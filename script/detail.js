//상세페이지 구현 
//뒤로가기 버튼 추가
const movieId1 = window.location.search;
const movieId = movieId1.slice(1);

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: 'Bearer ' + config.accessToken,
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/" + movieId + "?language=en-US",
  options
)
  .then((response) => response.json())
  .then((response) => {
    const section = document.getElementsByTagName("section")[0];
    const genre = response.genres.map((genre) => genre.name).join(", ");
    const { title, release_date, poster_path, vote_average, overview } =
      response;
      
    const content = `
    <h1>${title}</h1>
    <img src="https://image.tmdb.org/t/p/w300/${poster_path}" alt="" />
    <p>Release Date: ${release_date}</p>
    <p>Genre: ${genre}</p>
    <p>Rating: ${vote_average}</p>
    <p>Overview: ${overview}</p>
    <input type="button" value="뒤로가기!!" onclick="history.back();" />
  `;

    section.innerHTML += content;
  })
  .catch((err) => console.error(err));