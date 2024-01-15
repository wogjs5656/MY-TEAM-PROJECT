// 콜백지옥 해결책 비동기적 코드 Promise
// 비동기적인 작업을 동기적으로(동기적인 것 처럼 보이도록) 처리해주는 
// Promise , Generator(ES6)& async/await(ES7)

// Promise는 비동기 처리에 대해, 처리가 끝나면 알려달라는 '약속'임
// new 연산자로 호출한 Promise의 인자로 넘어가는ㄴ 콜백은 바로 실행된다.
// 그 내부에는 resolve(성공), reject(실패)가 함수를 호출 할 경우 
// 둘 중 하나가 실행되기 전 까지는 다음(then), 오류(catch)로 너머가지 않는다.
// 비동기작업이 완료될 때 resolve, reject를 호출한다는 것.

new Promise(function (resolve) {
	setTimeout(function () {
		var name = '에스프레소';
		console.log(name);
		resolve(name);
	}, 500);
}).then(function (prevName) {
	return new Promise(function (resolve) {
		setTimeout(function () {
			var name = prevName + ', 아메리카노';
			console.log(name);
			resolve(name);
		}, 500);
	});
}).then(function (prevName) {
	return new Promise(function (resolve) {
		setTimeout(function () {
			var name = prevName + ', 카페모카';
			console.log(name);
			resolve(name);
		}, 500);
	});
}).then(function (prevName) {
	return new Promise(function (resolve) {
		setTimeout(function () {
			var name = prevName + ', 카페라떼';
			console.log(name);
			resolve(name);
		}, 500);
	});
});