//========================================================
// 전역변수
//자바스크립트 api 받아오기
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGQxZjM0MDg0ZjUyYzA0ZGYyOTM3MTYyNjZlMzI1OSIsInN1YiI6IjY1OGUxOTI3NjRmNzE2MGFjZDNmNTBmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K6jzQUO3-0t0vq93dO_JAZQuyr5iD2T2VDys5owyNUw'
  },
};
fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
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
              window.location.href = "index2.html";
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
//렌더링

//카드 생성함수s
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




//const pageContent = (movie) => {
//const Content = document.getElementById("section").addEventListener("click", (event) => {
//console.log('card',card);
 //const genre = movie.genres.map((genre) => genre.name).join(", ");
 //const card = event.target.closest(".card");
 //const homepageDisplay = movie.homepage ? "block" : "none";
 //const { title, release_date, runtime, vote_average, overview  } = movie;
//  if (card) {
//   const movieId = card.getAttribute("data-id"); 
//   const { id, title, poster_path, vote_average} = movie;s
//   Content.innerHTML= `
//   <div class="card" data-id="${id}">
//    <div class="title">title${title}</div>>
//    <div class="genres">${movie.genre}</div>>
//    <div class="date">release_date${release_date}</div>>
//    <div class="runtime">runtime${runtime}분</div>>
//    <div class="vote">Rate${vote_average}</div>>
//    <button class="reviewBtn">Review${overview}</button>
//  `;
// };
// });
// }

//페이지 열기
const openPage = (movie) => {
  const info = document.querySelector(".info");
  const bg = document.querySelector(".bg");
};

//========================================================

//========================================================
// 이벤트

//검색기능 이벤트
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
// section.addEventListener("click", (e) => {
//   const closeBtn = document.querySelector(".closeBtn");
//   if (
//     e.target.classList.contains("closeBtn") ||
//     e.target.classList.contains("bg")
//   ) {
//     const modal = document.querySelector(".modal");
//     const bg = document.querySelector(".bg");
//     modal.style.top = "150%";
//     bg.style.display = "none";
//   }
// });

//========================================================

// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGQxZjM0MDg0ZjUyYzA0ZGYyOTM3MTYyNjZlMzI1OSIsInN1YiI6IjY1OGUxOTI3NjRmNzE2MGFjZDNmNTBmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K6jzQUO3-0t0vq93dO_JAZQuyr5iD2T2VDys5owyNUw'
//   },
// };

// fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
//   .then((response) => response.json())
//   .then((response) => {
//     const movies = response.results;
//     movies.forEach((movie) => makeCard(movie));
//     const cards1 = document.querySelectorAll(".card");
//     cards1.forEach((card) => {
//       card.addEventListener("click", () => {
//         const movieId = card.getAttribute("data-id");
//         fetch(
//           "https://api.themoviedb.org/3/movie/" + movieId + "?language=en-US",
//           options
//         )
//           .then((response) => response.json())
//           .then((response) => {
//             location.href = `index2.html?id=${response.id}`;
//           })
//           .catch((err) => console.error(err));
//       });
//     });
//     input.focus();
//   })
//   .catch((err) => console.error(err));

// // const btn = document.getElementById("searchBtn");
// // const input = document.getElementById("search");

// const makeCard = (movie) => {
//   const section = document.getElementById("section");
//   const { id, title, release_date, poster_path, vote_average, overview } = movie;
//   const card = `
//     <div class="card" data-id="${id}">
//       <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="" />
//       <h2 class="title">${title}</h2>
//       <p class="rating">Rating : ${vote_average}</p>
//     </div>
//   `;
//   section.innerHTML += card;
// };
