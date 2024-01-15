//========================================================
// 전역변수
// api 받아오기
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: 'Bearer ' + config.accessToken,
  },
};
fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    const movies = response.results;
    moviesArr = response.results;
    movies.map((movie) => makeCard(movie));
    const cards1 = document.querySelectorAll(".card");
    cards1.forEach((card) => {
      card.addEventListener("click", () => {
        const movieId = card.getAttribute("data-id");
        window.location.href = `./detail.html?${movieId}`;
        fetch(
          "https://api.themoviedb.org/3/movie/" + movieId + "?language=en-US",
          options
        )
          .then((response) => response.json())
          .catch((err) => console.error(err));
      });
    });
    input.focus();
  })
  .catch((err) => console.error(err));

fetch(
  "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
    config.apikey +
    "&language=ko",
  options
)
  .then((response) => response.json())
  .then((response) => {
    const genres = response.genres;
    genres.map((genre) => makeCategory(genre));
  })
  .catch((err) => console.error(err));

const btn = document.getElementById("searchBtn");
const input = document.getElementById("search");
let moviesArr = [];
//========================================================

//========================================================
// 렌더링

// 장르 카테고리 생성함수
const makeCategory = (genre) => {
  const selection = document.querySelector("#genreChoice");
  const option = `<option value=${genre.id}>${genre.name}</option>`;
  selection.innerHTML += option;
};

//선택 장르 정렬 함수
const selectGenre = (value) => {
  const cards = Array.from(document.querySelectorAll(".card"));
  let selected = [];
  let unSelected = [];

  selected = cards.filter((item) => {
    // 선택된 장르의 카드들
    let currData = item.getAttribute("data-genre");
    return currData.includes(value);
  });

  unSelected = cards.filter((item) => {
    // 선택되지 않은 장르의 카드들
    let currData = item.getAttribute("data-genre");
    return !currData.includes(value);
  });

  if (value === "all") {
    cards.forEach((item) => {
      item.style.display = "flex";
    });
  } else if (unSelected.length == 20) {
    cards.forEach((item) => {
      item.style.display = "flex";
    });
    alert("선택된 장르의 영화가 없습니다!");
  } else {
    cards.forEach((item) => {
      item.style.display = "flex";
    });
    unSelected.forEach((item) => {
      item.style.display = "none";
    });
  }
};

// 선택한 정렬 기준으로 정렬 함수
const sorting = (value) => {
  let cards = Array.from(document.querySelectorAll(".card"));
  const section = document.getElementById("section");

  // 개봉일 배열
  const release_date = moviesArr.map((movie) => {
    return movie.release_date;
  });
  const titleArr = moviesArr.map((movie) => movie.title);
  const dateObj = release_date.reduce((acc, releaseDate, index) => {
    acc[titleArr[index]] = releaseDate;
    return acc;
  }, {});

  if (value === "rate") {
    //평점순 정렬
    cards.sort((a, b) => {
      let valueA = Number(a.childNodes[5].innerHTML.slice(9));
      let valueB = Number(b.childNodes[5].innerHTML.slice(9));
      return valueB - valueA;
    });
    cards.forEach((card) => section.appendChild(card));
  } else if (value === "name") {
    // 제목순정렬
    cards.sort((a, b) => {
      let valueA = a.childNodes[3].innerHTML;
      let valueB = b.childNodes[3].innerHTML;
      return valueA.localeCompare(valueB);
    });
    cards.forEach((card) => section.appendChild(card));
  } else {
    // 발매일순 정렬
    cards.sort((a, b) => {
      let titleA = a.childNodes[3].innerHTML;
      let titleB = b.childNodes[3].innerHTML;
      return dateObj[titleA].localeCompare(dateObj[titleB]);
    });

    cards.forEach((card) => section.appendChild(card));
  }
};

// 카드 생성함수
const makeCard = (movie) => {
  const section = document.getElementById("section");
  //console.log('movie', movie);
  const { id, title, poster_path, vote_average } = movie;
  const card = `
    <div class="card" data-id="${id}" data-genre = "${movie.genre_ids}">
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


// 검색 함수
const searchClick = () => {
  const cards = document.getElementsByClassName("card");
  let text = input.value.toLowerCase();
  const genreChoice = document.querySelector("#genreChoice");
  const sorting = document.querySelector("#sorting");
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
  genreChoice.value = "all";
  sorting.value = "rate";
};

//========================================================
