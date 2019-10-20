/*
我現在應該要做什麼呢？
1.語言選擇的功能
她的使用流程是
使用者輸入文字後->選擇語言->按下enter鍵，
我就應該要按照使用者所選擇的語言回傳查詢結果
所以我應該要獲取使用者輸入語言的值
在按下submit時，若使用者沒有另外去選擇語言，則撈取設為default語言選項的語言結果
*/
const timeContainer = document.querySelector('.time');
const greetingContainer = document.querySelector('.greeting');
const formElement = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const resultContainer = document.querySelector('.result');
const resultDef = document.querySelector('.result-def');
const resultEx = document.querySelector('.result-ex');
const selectElement = document.getElementById('lang-select');

/* Events */
// 輸入單字觸發的事件，send request to google dictionary api並抓取相關資料
formElement.addEventListener('submit', e => {
	e.preventDefault();
	
	const inputValue = searchInput.value;
	const langValue = selectElement.options[selectElement.selectedIndex].value;
	const BASE_URL = 'https://googledictionaryapi.eu-gb.mybluemix.net/?define=';
	if (inputValue == null || inputValue == null) {
		return;
	} else {
		axios
			.get(`${BASE_URL}${inputValue}&lang=${langValue}`)
			.then(function (e) {
				resultContainer.style.display = 'block';
				console.log(e.data[0]);
				resultDef.innerText = 'Definition: ' + e.data[0].meaning.noun[0].definition || 'Sorry, we cant not find definition for this word.';
				resultEx.innerText = 'Example: ' + e.data[0].meaning.noun[0].example + '.' || 'Sorry, we cant not find example for this word.';
			})
			.catch(error => console.log(error))
	}
	clearInputValue();
	showResult(inputValue);
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

function showResult(inputValue) {
	const textContainer = document.querySelector('.result-word');
	textContainer.innerText = inputValue;
}

/* Invokes functions below */
//要讓時間與當地時間一致，需要使用setInterval在背景不斷地調用這個showTime函數
setInterval(showTime, 1000);

greeting();

