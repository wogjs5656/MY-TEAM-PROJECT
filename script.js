//========================================================
// 전역변수
// api 받아오기
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGQxZjM0MDg0ZjUyYzA0ZGYyOTM3MTYyNjZlMzI1OSIsInN1YiI6IjY1OGUxOTI3NjRmNzE2MGFjZDNmNTBmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K6jzQUO3-0t0vq93dO_JAZQuyr5iD2T2VDys5owyNUw'
  },
};
fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    const movies = response.results;
    movies.map((movie) => makeCard(movie));
    const cards1 = document.querySelectorAll(".card");
    cards1.forEach((card) => {
      card.addEventListener("click", () => {
        const movieId = card.getAttribute("data-id");
        fetch(
          "https://api.themoviedb.org/3/movie/" + movieId + "?language=en-US",
          options
        )
          .then((response) => response.json())
          .then((response) => {
             window.location.href = `movieCollection_2.html?${movieId}`;
            //openModal(response);
          })
          .catch((err) => console.error(err));
      });
    });
    input.focus();
  })
  .catch((err) => console.error(err));

const btn = document.getElementById("searchBtn");
const input = document.getElementById("search");

//========================================================

//========================================================
// 렌더링

// 카드 생성함수
const makeCard = (movie) => {
  const section = document.getElementById("section");
   //console.log('movie', movie);
  const { id, title, poster_path, vote_average} = movie;
  const card = `
  <div class="card" data-id="${id}">
  <img src="https://image.tmdb.org/t/p/w500/${poster_path}"  alt="" />
    <h2 class="title" >${title} </h2>
    <p class="rating"> Rating : ${vote_average}</p>
  </div>
  `;
  section.innerHTML += card;
};

//========================================================

//========================================================
// 이벤트

// 검색기능 이벤트
btn.addEventListener("click", () => searchClick());
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchClick();
  }
});
const searchClick = () => {
  const cards = document.getElementsByClassName("card");
  let text = input.value.toLowerCase();
  Array.from(cards).forEach((item) => {
    const title = item.querySelector(".title").innerHTML.toLowerCase();
    if (text.length > 0) {
      if (title.includes(text)) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    } else {
      item.style.display = "flex";
    }
  });
};

//========================================================
