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
        <button class="submitReviewBtn">리뷰 수정</button>
        <button class="submitReviewBtn">리뷰 삭제</button>
      </div>
    `;

  let cards = await reviews.map((review) => card(review)).join("");

  reviewCardsContent.innerHTML = cards;
};

const submitReview = async () => {
  const authorName = document.getElementById("authorName").value;
  const reviewText = document.getElementById("reviewText").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  createReview(authorName, reviewText, confirmPassword);
  await renderReviewCard();
};

document.addEventListener('DOMContentLoaded', renderReviewCard)

document.querySelector(".submitReviewBtn").addEventListener("click", async () => {
    await submitReview()
    await renderReviewCard()
});

// localStorage 초기화
if (!localStorage.review) {
  localStorage.review = JSON.stringify([]);
}

/** save Review */
let form_review = document.querySelector("form");
let id_input = document.querySelector("input");
let pw_input = document.querySelector("input");
let review_input = document.querySelector("input");
/**
 * READ Review Data
 * @returns {object[]}
 */
const getReview = async () => {
  let data = JSON.parse(await localStorage.review);
  return data;
};
/**
 * CREATE Review Data
 * @param {string} id - value of id_input
 * @param {string} pw - value of pw_input
 * @param {string} review - value of review_input
 */
const createReview = async (id, pw, review) => {
  let prevReview = await getReview();
  let review_id = uuid();
  let newReview = { id, pw, review, review_id };
  localStorage.review = JSON.stringify([...prevReview, newReview]);
};

// form_review.addEventListener('submit', async (e) => {
//   e.preventDefault()
//   createReview();
// })

/** delete Review */
let pw_delete = document.querySelector("input");
/**
 * delete Review
 * @param {string} pw - value of pw_delete
 */
const deleteReview = async (pw) => {
  let prevReview = await getReview();
  let deletedReivew = prevReview.filter((review) => review.pw !== pw);
  localStorage.review = JSON.stringify([...deletedReivew]);
};

/** UPDATE Review */
let pw_edit = document.querySelector("input");

/**
 * UPDATE review
 * @param {string} pw
 * @param {string} newContent
 */
const updateReview = async (pw, newContent) => {
  let prevReview = await getReview();
  let editReview = prevReview.map((review) => {
    if (review.pw === pw) {
      review.text = newContent; // 오류 : pw 가 같은 모든 review 가 변경됌
    }
    return review;
  });
  localStorage.review = JSON.stringify([...editReview]);
};
