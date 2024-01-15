// 전역변수
// api 받아오기
const movieId1 = window.location.search;
const movieId = movieId1.slice(1);
console.log(movieId);

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGQxZjM0MDg0ZjUyYzA0ZGYyOTM3MTYyNjZlMzI1OSIsInN1YiI6IjY1OGUxOTI3NjRmNzE2MGFjZDNmNTBmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K6jzQUO3-0t0vq93dO_JAZQuyr5iD2T2VDys5owyNUw',
  },
};
fetch(
  "https://api.themoviedb.org/3/movie/" + movieId + "?language=en-US",
  options
)
  .then((response) => response.json())
  .then((response) => {
    window.location.href=`index2.html?${movieId}`;
    subPage();
  })
  .catch((err) => console.error(err));