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

![Alt text](image.png)

전체적인 디자인은 기존의 베이스에서 크게 벗어나지 않음과 동시에
다른 영화 검색 사이트들이나 ott 사이트 들과는 다른 방식으로 하고 싶었고,

Back-end 반에서 디자인은 크게 고려사항이 아닐수는 있겠지만, 디자인 담당 뿐만 아니라 나름 다른조원 분들의 디테일적인 의견들이 녹여져 있는 부분이라고 생각합니다.
## Feature
  - 페이지 이동
    - Query String 이용
  - 카테고리
    - 장르와 발매일,이름,평점 순으로 정렬은 기존 받아온 api를 기반으로 정렬하되 발매일은 각 카드에서 바로 비교할 수 없어서 객체에 저장 후 다시 비교하는 방식을 사용했습니다.
  - API 사용
    - TMDB의 최고평점순 api와 각 movieID를 기준으로 상세정보를 받아오는 api를 사용했습니다.
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
조민근

좋았던 점 : Git 이라는 거에 대해 무지한 상태였는데 이번 협업으로 기본적인 부분들은 알게 되어서 좋았고, CSS의 기본적인 부분들을 다시 한번 다지게 되어 좋았습니다.

아쉬웠던 점 : 일단 어려운 강의를 들으면서 이해하고, 머릿속에 저장한 다음 짧은 기간의 팀 프로젝트까지 해야 한다는게 너무 별로였습니다. 시간에 쫓기다보니 현실적으로 가능한 거만 생각하게 되어 결과적으로 평소에 어려움을 겪던 자바스크립트 기능 구현에 대해 돌파구를 전혀 찾지 못한 기간이었다고 생각하기 때문에 너무 아쉽습니다.