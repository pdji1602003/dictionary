const timeContainer = document.querySelector('.time');
const greetingContainer = document.querySelector('.greeting');
const formElement = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const resultContainer = document.querySelector('.result');
const resultDef = document.querySelector('.result-def');
const resultEx = document.querySelector('.result-ex');

/* Events */
// 輸入單字觸發的事件，send request to google dictionary api並抓取相關資料
formElement.addEventListener('submit', e => {
	e.preventDefault();
	const inputValue = searchInput.value;
	const BASE_URL = 'https://googledictionaryapi.eu-gb.mybluemix.net/?define=';
	if (inputValue == null || inputValue == null) {
		return;
	} else {
		axios
			.get(`${BASE_URL}${inputValue}`)
			.then(function (e) {
				resultContainer.style.display = 'block';
				console.log(e.data[0]);
				resultDef.innerText = 'Definition: ' + e.data[0].meaning.noun[0].definition;
				resultEx.innerText = 'Example: ' + e.data[0].meaning.noun[0].example + '.';
			})
			.catch(error => console.log(error))
	}
	clearInputValue();
})


/* functions */
//抓取時間並即時反映在screen上
function showTime() {
	let time = new Date();
	let hour = time.getHours();
	let minute = ('0' + time.getMinutes()).substr(-2);
	timeContainer.innerText = `${hour} : ${minute}`;
	return hour;
}

//根據當地目前時間顯示相應問候語：早安、午安、晚安
function greeting() {
	let hour = showTime();
	if (hour >= 5 && hour < 12) {
		greetingContainer.innerText = 'Good morning!';
	} else if (hour >= 12 && hour < 17) {
		greetingContainer.innerText = 'Good afternoon!';
	} else {
		greetingContainer.innerText = 'Good evening!';
	}
}

//清除input的值
function clearInputValue() {
	searchInput.value = '';
}

/* Invokes functions below */
//要讓時間與當地時間一致，需要使用setInterval在背景不斷地調用這個showTime函數
setInterval(showTime, 1000);

greeting();