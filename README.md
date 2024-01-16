# 내배캠 인기영화 콜렉션 ( 상세페이지 구현 )

이 프로젝트는 내배캠에서 진행된 1조의 팀 프로젝트로, 인기 영화 목록을 보여주는 웹 애플리케이션입니다. 상세페이지가 구현되어 있습니다.

## Installation

1. 저장소 클론
    ```bash
      git clone https://github.com/wogjs5656/MY-TEAM-PROJECT.git
    ```

2. apikey.js를 script 디렉터리에 추가
    ```js
      const config = {
            apikey: "YOUR APIKEY",
            accessToken: "YOUR AccessToken",
      };
    ```
    <u>**참고: API 키와 액세스 토큰은 TMDB API에서 발급받을 수 있습니다.**</u>

3. index.html  실행

## Description

저희조는 기능적인 부분에서 깔끔함과 틀이 잘 잡혀져 있는 다빈님의 과제를 베이스로 채택해서 프로젝트를 진행 했습니다.

이후 디자인 재정비와 몇가지 기능들을 추가했고 그렇게 지금의  프로젝트가 완성이 되었습니다.

[사진]

전체적인 디자인은 기존의 베이스에서 크게 벗어나지 않음과 동시에
다른 영화 검색 사이트들이나 ott 사이트 들과는 방식으로 하고 싶었고,

Back-end 반에서 디자인은 크게 고려사항이 아닐수는 있겠지만, 디자인 담당 뿐만 아니라 나름 다른조원 분들의 디테일적인 생각들이 녹여져 있는 부분이라고 말해드릴 수 있겠습니다.
## Feature
  - 페이지 이동
    - Query String 이용
  - 카테고리
  - API 사용
    - TMDB
  - 리뷰
    - 데이터 형태
      ```json
      [
        {
          id: ""<String>,
          pw: ""<String>,
          review: ""<String>,
          review-id: ""<String>,
        }
      ]
      ```
    - review-id
      - uuid
        ```js
        xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx 
        // 8-4-4-4-12
        ```
    - localStorage 사용
      - 조회
        ```js
          const getReview = async () => {
            let data = JSON.parse(await localStorage.review);
            return data;
          };
        ```
      - 추가
        ```js
          const createReview = async (id, review, pw) => {
            let prevReview = await getReview();
            let review_id = uuid();
            let newReview = { id, pw, review, review_id };
            localStorage.review = JSON.stringify([...prevReview, newReview]);
          };
        ```
      - 제거
        ```js
          const deleteReview = async (uuid, pw) => {
            let prevReview = await getReview();
            let reviewToDelete = prevReview.find((review) => review.review_id === uuid);

            if (reviewToDelete && reviewToDelete.pw === pw) {
              let updatedReviewList = prevReview.filter((review) => review.review_id !== uuid);
              localStorage.review = JSON.stringify(updatedReviewList);
            } else {
              alert("해당 비밀번호가 일치하지 않습니다.");
            }
          };
        ```
      - 수정
        ```js
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
            localStorage.review = JSON.stringify([...editReview]);
          };
        ```

## Project Review
