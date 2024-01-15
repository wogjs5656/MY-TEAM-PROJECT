function getQueryParameters(queryString) {
  // 문자열 앞의 물음표(?)를 제거
  queryString = queryString.substring(1);

  // '&'로 문자열을 분리하여 배열로 만듦
  let queryParamsArray = queryString.split('&');

  // 결과를 담을 객체 생성
  let queryParams = {};

  // 배열을 순회하면서 각각의 키와 값을 객체에 추가
  for (let i = 0; i < queryParamsArray.length; i++) {
    const pair = queryParamsArray[i].split('=');
    const key = decodeURIComponent(pair[0]); // 키 디코딩
    const value = decodeURIComponent(pair[1] || ''); // 값 디코딩

    // 객체에 키와 값을 추가
    if (key) {
      queryParams[key] = value;
    }
  }

  return queryParams;
}

//상세페이지 구현 
//뒤로가기 버튼 추가
const queryString = getQueryParameters(window.location.search)
const movieId = queryString.movieId;
const movieTitle = queryString.title;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: 'Bearer ' + config.accessToken,
  }
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
    <div class = 'content'>
      <img src="https://image.tmdb.org/t/p/w300/${poster_path}" alt="" />
      <div class= 'wrap'>
        <h1>${title}</h1>
        <p>Release Date: ${release_date}</p>
        <p>Genre: ${genre}</p>
        <p>Rating: ${vote_average}</p>
        <p>Overview: ${overview}</p>
      </div>
    </div>
  `;

    section.innerHTML += content;
  })
  .catch((err) => console.error(err));



/** render Review */
const uuid = () => {
  let uuid = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".replace(/[x]/g, () =>
      Math.floor(Math.random() * 16).toString(16)
  );
  return uuid;
};

const renderReviewCard = async () => {
  const reviews = await getReview();
  const reviewCardsContent = document.getElementById("reviewCards");

  const card = ({ id, pw, review, review_id }) => `
    <div class="reviewCard">
      <p>작성자: ${id}</p>
      <p>리뷰 내용: ${review}</p>
      <p>확인 비밀번호: ${pw}</p>
      <button class="reviewUpdate dataBtn" name=${review_id}>리뷰 수정</button>
      <button class="deleteReviewBtn" name=${review_id}>리뷰 삭제</button>
      <div class="updateContainer" id="${review_id}" data-uuid=${review_id}>
        <input 
          class="reviewInput" 
          placeholder="리뷰 값 작성" 
          name="reviewInput" 
          value="${review}"
        />
        <input class="pwInput" placeholder="비밀번호" name="pwInput" />
        <button class="updateBtn" name=${review_id}>수정하기</button>
      </div>
    </div>
  `;

  let cards = await reviews.map((review) => card(review)).join("");

  reviewCardsContent.innerHTML = cards;
  addEvent();
};

const addEvent = async () => {
  document.querySelectorAll(".reviewCard .reviewUpdate").forEach((c) =>
      c.addEventListener("click", (evt) => {
          const uuid = evt.target.name;
          let updateContainer = document.getElementById(uuid);
          if (updateContainer.style.display === "none" || updateContainer.style.display === "") {
              updateContainer.style.display = "block";
          } else {
              updateContainer.style.display = "none";
          }
      })
  );
  document.querySelectorAll(".updateBtn").forEach((c) =>
      c.addEventListener("click", async (evt) => {
          const uuid_of_target = evt.target.name;
          const updateContainer = document.getElementById(uuid_of_target);
          const uuid = updateContainer.querySelector(".updateBtn").name;
          const content = updateContainer.querySelector(".reviewInput").value;
          const pw = updateContainer.querySelector(".pwInput").value;
          await updateReview(uuid, pw, content);
          await renderReviewCard();
      })
  );

  // deleteReviewBtn
  document.querySelectorAll(".deleteReviewBtn").forEach((deleteReviewBtn) =>
      deleteReviewBtn.addEventListener("click", async () => {
          const review_id = deleteReviewBtn.name;
          const pw = prompt("리뷰를 삭제하려면 확인 비밀번호를 입력하세요.");

          if (pw !== null && pw.trim() !== "") {
              await deleteReview(review_id, pw);
              await renderReviewCard();
          } else {
              alert("값이 입력되지 않았습니다.");
          }
      })
  );
};

const submitReview = async () => {
  const authorName = document.getElementById("authorName").value;
  const reviewText = document.getElementById("reviewText").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  await createReview(authorName, reviewText, confirmPassword);

  document.getElementById("authorName").value = "";
  document.getElementById("reviewText").value = "";
  document.getElementById("confirmPassword").value = "";
  
  await renderReviewCard();
};

document.addEventListener("DOMContentLoaded", renderReviewCard);

document.querySelector(".submitReviewBtn").addEventListener("click", async () => {
  await submitReview();
  await renderReviewCard();
});

// localStorage 초기화
if (!localStorage.getItem(movieTitle)) {
  localStorage.setItem(movieTitle, JSON.stringify([]))
}

/**
* READ Review Data
* @returns {object[]}
*/
const getReview = async () => {
  let data = JSON.parse(await localStorage[movieTitle]);
  return data;
};
/**
* CREATE Review Data
* @param {string} id - value of id_input
* @param {string} pw - value of pw_input
* @param {string} review - value of review_input
*/
const createReview = async (id, review, pw) => {
  let prevReview = await getReview();
  let review_id = uuid();
  let newReview = { id, pw, review, review_id };
  localStorage.setItem(movieTitle, JSON.stringify([...prevReview, newReview]))
};

/** delete Review */
let pw_delete = document.querySelector("input");
/**
* delete Review
* @param {string} pw - value of pw_delete
*/
const deleteReview = async (uuid, pw) => {
  let prevReview = await getReview();
  let reviewToDelete = prevReview.find((review) => review.review_id === uuid);

  if (reviewToDelete && reviewToDelete.pw === pw) {
    let updatedReviewList = prevReview.filter((review) => review.review_id !== uuid);
    localStorage.setItem(movieTitle, JSON.stringify(updatedReviewList))
  } else {
    alert("해당 비밀번호가 일치하지 않습니다.");
  }
};

/** UPDATE Review */
let pw_edit = document.querySelector("input");

/**
* UPDATE review
* @param {string} pw
* @param {string} newContent
*/
const updateReview = async (uuid, pw, newContent) => {
  let prevReview = await getReview();
  let editReview = prevReview.map((review) => {
      if (review.review_id === uuid && review.pw === pw) {
          review.review = newContent;
      } else if (review.review_id === uuid && review.pw !== pw) {
          alert("비밀번호가 틀렸습니다");
      }
      return review;
  });
  localStorage.setItem(movieTitle, JSON.stringify([...editReview]));
};
