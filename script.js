//========================================================
// 전역변수
// api 받아오기
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${config.accessToken}`,
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

/** render Review */
const submitReview = () => {
  const authorName = document.getElementById("authorName").value;
  const reviewText = document.getElementById("reviewText").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  let reviewCard;

// input을 전부 입력해야 실행됨. 하나라도 비었을 경우 경고창 표시
  if(authorName && reviewText && confirmPassword) {
    reviewCard = {
      author: authorName,
      text: reviewText,
      password: confirmPassword,
    };

  } else {
    alert("[오류] 빠진 내용이 있습니다.");
  }  
  makeReviewCard(reviewCard);
  createReview(authorName, reviewText, confirmPassword);
};

const makeReviewCard = (reviewCard) => {
  const reviewCardsContent = document.getElementById("reviewCards");
  const cardElement = document.createElement("div");
  cardElement.classList.add("reviewCard");

  const cardContent = `
    <p>작성자: ${reviewCard.author}</p>
    <p>리뷰 내용: ${reviewCard.text}</p>
    <p>확인 비밀번호: ${reviewCard.password}</p>
  `;

  cardElement.innerHTML = cardContent;
  reviewCardsContent.appendChild(cardElement);
};

// localStorage 초기화
if (!localStorage.review) {
  localStorage.review = JSON.stringify([]);
}

/** save Review */
let form_review = document.querySelector('form');
let id_input = document.querySelector('input');
let pw_input = document.querySelector('input');
let review_input = document.querySelector('input');
/**
 * READ Review Data
 * @returns {object[]}
 */
const getReview = async () => {
  let data = JSON.parse(await localStorage.review)
  return data;
}
/**
 * CREATE Review Data
 * @param {string} id - value of id_input
 * @param {string} pw - value of pw_input
 * @param {string} review - value of review_input
 */
const createReview = async (id, pw, review) => {
  let prevReview = await getReview();
  let newReview = {id, pw, review}
  localStorage.review = JSON.stringify([...prevReview, newReview]);
}

form_review.addEventListener('submit', async (e) => {
  e.preventDefault()
  createReview();
})

/** delete Review */
let pw_delete = document.querySelector('input')
/**
 * delete Review
 * @param {string} pw - value of pw_delete
 */
const deleteReview = async (pw) => {
  let prevReview = await getReview();
  let deletedReivew = prevReview.filter(review => review.pw !== pw);
  localStorage.review = JSON.stringify([...deletedReivew]);
}

/** UPDATE Review */
let pw_edit = document.querySelector('input');

/**
 * UPDATE review
 * @param {string} pw 
 * @param {string} newContent 
 */
const updateReview = async (pw, newContent) => {
  let prevReview = await getReview();
  let editReview = prevReview.map(review =>{
    if (review.pw === pw) {
      review.text = newContent; // 오류 : pw 가 같은 모든 review 가 변경됌
    }
    return review;
  });
  localStorage.review = JSON.stringify([...editReview]);
}