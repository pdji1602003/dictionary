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
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close');
let outputContainer = document.getElementById('output');

/* Events */
// 輸入單字觸發的事件，send request to google dictionary api並抓取相關資料
formElement.addEventListener('submit', e => {
	e.preventDefault();
	fetchData();


})

closeBtn.addEventListener('click', event => {
	overlay.setAttribute('data-active', 'false');
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

//顯示使用者輸入查找的單字
function showResult(inputValue) {
	const textContainer = document.querySelector('.result-word');
	textContainer.innerText = inputValue;
}

//抓取API
function fetchData() {
	const inputValue = searchInput.value;
	const langValue = selectElement.options[selectElement.selectedIndex].value;
	const BASE_URL = 'https://googledictionaryapi.eu-gb.mybluemix.net/?define=';
	if (inputValue == null || inputValue === '') return;
	clearInputValue();
	axios
		.get(`${BASE_URL}${inputValue}&lang=${langValue}`)
		.then(function (e) {
			const { data } = e;
			if (data[0]) {
				const firstData = data[0];//將在data獲取的第一筆資料設為firstData
				const firstDataKeys = Object.keys(firstData);//取得firstData的所有keys，返回形式為一array
				const meaningsIndex = firstDataKeys.indexOf("meaning");//取得meaning在firstDataKeys中的index
				const meaningsData = firstData[firstDataKeys[meaningsIndex]]//取得meaning底下的所有data
				const meaningsKeys = Object.keys(meaningsData);//取得meaning裡的所有key
				const meaningFirstData = meaningsData[meaningsKeys[0]][0]//whatever the first data is, I'm fetching it!
				let listItem = "";
				for ( let i in meaningFirstData ){
					listItem += `<li class="result-sentence">${i} : ${meaningFirstData[i]}</li>`
				}
				outputContainer.innerHTML = listItem;
				resultContainer.style.display = 'block';
				showResult(inputValue);
				//同時有definition跟example就回傳
				// resultDef.innerText = 'Definition: ' + data[0].meaning.noun[0].definition || '我是真值';
				// resultEx.innerText = 'Example: ' + data[0].meaning.noun[0].example + '.';
				return;
			}

			if (data[1]) {

				return;
			}
		})
		.catch(error => {
			console.log(error);
			showAlert();
		})
}

//當使用者輸入有誤所出現的彈跳視窗
function showAlert() {
	overlay.setAttribute('data-active', 'true');
}

/* Invokes functions below */
//要讓時間與當地時間一致，需要使用setInterval在背景不斷地調用這個showTime函數
setInterval(showTime, 1000);

greeting();

