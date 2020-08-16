export const ACCU_WEATHER_HOST = 'https://dataservice.accuweather.com';
export const API_KEY = 'ALY2AtsDuGp5HjSxZkHRZsfOiWmAtVco';
export const weekDayConvertor = new Array(7);
weekDayConvertor[0] = "Sunday";
weekDayConvertor[1] = "Monday";
weekDayConvertor[2] = "Tuesday";
weekDayConvertor[3] = "Wednesday";
weekDayConvertor[4] = "Thursday";
weekDayConvertor[5] = "Friday";
weekDayConvertor[6] = "Saturday";

export const debounce = (func, wait, immediate) => {
	let timeout;
	return function () {
		let context = this,
			args = arguments;
		let later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export const ID = () => {
	var dt = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (dt + Math.random() * 16) % 16 | 0;
		dt = Math.floor(dt / 16);
		return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return uuid;
}