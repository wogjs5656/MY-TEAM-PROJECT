//========================================================
// 전역변수
// api 받아오기
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: config.apikey,
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
            modalLoad(response);
            openModal(response);
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
  const card = `
  <div class="card" data-id="${movie.id}">
    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="" />
    <h2 class="title">${movie.title}</h2>
    <p class="rating">Rating : ${movie.vote_average}</p>
    <p class="overview">
      ${movie.overview}
      <span class='more'>더 알아보기</span>
    </p>
  </div>
  `;
  section.innerHTML += card;
};
// 모달창 로드
const modalLoad = (movie) => {
  const modalContent = document.querySelector(".modal");
  const genre = movie.genres.map((genre) => genre.name).join(", ");
  const homepageDisplay = movie.homepage ? "block" : "none";

  modalContent.innerHTML = `
    <p>제목 : <span class="motitle">${movie.title}</span></p>
    <p>장르 : <span class="mogenres">${genre}</span></p>
    <p>개봉일 : <span class="modate">${movie.release_date}</span></p>
    <p>런타임 : <span class="moruntime">${movie.runtime}분</span></p>
    <p>평점 : <span class="movote">${movie.vote_average}</span></p>
    <p class="page" style="display: ${homepageDisplay}">
      홈페이지 : <a href="${movie.homepage}" class="mohomepage" target="_blank">${movie.homepage}</a>
    </p>
    <button class="closeBtn">닫기</button>
  `;
};

// 모달창 열기
const openModal = (movie) => {
  const modal = document.querySelector(".modal");
  const bg = document.querySelector(".bg");
  modal.style.top = "50%";
  bg.style.display = "block";
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

// 모달창 닫기
section.addEventListener("click", (e) => {
  const closeBtn = document.querySelector(".closeBtn");
  if (
    e.target.classList.contains("closeBtn") ||
    e.target.classList.contains("bg")
  ) {
    const modal = document.querySelector(".modal");
    const bg = document.querySelector(".bg");
    modal.style.top = "150%";
    bg.style.display = "none";
  }
});

//========================================================
