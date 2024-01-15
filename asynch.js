// synch (동기적) :실행중인 코드가 끝나야 다음 코드를 실행하는 방식 (일으 순서가 중요)
//                  :cpu가 계산하는데에 오래 걸리는 코드 
// & async(비동기적) :실행중인 콛의 완료여부와 무관하게 즉시 다음 코드로 넘어가는 방식
//               e.g. setTimeout, addEventListner 등 
//      요청, 실행, 대기, 보류 등 (서버 클라이언트통신, 웹통신) '통신'이 들어가면
//               대부분 다 비동기적 코드

// 비동기적 코드의 이해 + 콜백지옥!!!
setTimeout(function(){
    console.log('hi');
}, 1000);

console.log('bye');
//////////////////////////
setTimeout(
    function (name) {
      var coffeeList = name;
      console.log(coffeeList);
  
      setTimeout(
        function (name) {
          coffeeList += ", " + name;
          console.log(coffeeList);
  
          setTimeout(
            function (name) {
              coffeeList += ", " + name;
              console.log(coffeeList);
  
              setTimeout(
                function (name) {
                  coffeeList += ", " + name;
                  console.log(coffeeList);
                },
                500,
                "카페라떼"
              );
            },
            500,
            "카페모카"
          );
        },
        500,
        "아메리카노"
      );
    },
    500,
    "에스프레소"
  );

  //callback 지옥 해결책(이지만 좀 비효율적)
  var coffeeList = '';

var addEspresso = function (name) {
	coffeeList = name;
	console.log(coffeeList);
	setTimeout(addAmericano, 500, '아메리카노');
};

var addAmericano = function (name) {
	coffeeList += ', ' + name;
	console.log(coffeeList);
	setTimeout(addMocha, 500, '카페모카');
};

var addMocha = function (name) {
	coffeeList += ', ' + name;
	console.log(coffeeList);
	setTimeout(addLatte, 500, '카페라떼');
};

var addLatte = function (name) {
	coffeeList += ', ' + name;
	console.log(coffeeList);
};

setTimeout(addEspresso, 500, '에스프레소');