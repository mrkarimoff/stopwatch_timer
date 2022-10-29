/* Stopwatch */
let timeCont = document.querySelector(".time-cont");
let startBtn = document.getElementById("start-btn");
let stopBtn = document.getElementById("stop-btn");
let Table = document.getElementById("table");
let mlSecond1 = 0;
let mlSecond2 = 0;
let second1 = 0;
let second2 = 0;
let minute1 = 0;
let minute2 = 0;
let hour1 = 0;
let hour2 = 0;
let interval;
let isStopClicked = false;
let data = [];

draw();

function draw() {
	timeCont.innerHTML = `
    <h1 class="time-box">
    <span>${hour1}</span><span>${hour2}</span>:<span>${minute1}</span><span>${minute2}</span>:<span>${second1}</span><span>${second2}</span>.<span>${mlSecond1}</span><span>${mlSecond2}</span>
    </h1>`;
}

function handleStart() {
	interval = setInterval(function () {
		if (mlSecond2 < 9) {
			++mlSecond2;
		} else if (mlSecond2 === 9) {
			mlSecond2 = 0;
			if (mlSecond1 < 9) {
				++mlSecond1;
			} else if (mlSecond1 === 9) {
				mlSecond1 = 0;
				if (second2 < 9) {
					++second2;
				} else if (second2 === 9) {
					second2 = 0;
					if (second1 < 5) {
						++second1;
					} else if (second1 === 5) {
						second1 = 0;
						if (minute2 < 9) {
							++minute2;
						} else if (minute2 === 9) {
							minute2 = 0;
							if (minute1 < 5) {
								++minute1;
							} else if (minute1 === 5) {
								minute1 = 0;
								if (hour2 < 9) {
									++hour2;
								} else if (hour2 === 9) {
									hour2 = 0;
									if (hour1 < 9) {
										++hour1;
									}
								}
							}
						}
					}
				}
			}
		}
		draw();
	}, 10);
	isStopClicked = false;
	startBtn.setAttribute("disabled", "disabled");
}

function handleStop() {
	clearInterval(interval);
	isStopClicked = true;
	startBtn.removeAttribute("disabled");
}

function handleClear() {
	mlSecond1 = 0;
	mlSecond2 = 0;
	second1 = 0;
	second2 = 0;
	minute1 = 0;
	minute2 = 0;
	hour1 = 0;
	hour2 = 0;
	Table.innerHTML = "";
	data = [];
	draw();
	handleStop();
	startBtn.removeAttribute("disabled");
}

function handleInteval() {
	if (!isStopClicked) {
		data.push({ hour1, hour2, minute1, minute2, second1, second2, mlSecond1, mlSecond2 });
		let s = "";
		data.map((item, index) => {
			s += `
			<tr ${index > 8 ? 'class="active"' : ""}>
			   <th>${++index}</th>
			   <th>
			   <span>${item.hour1}</span><span>${item.hour2}</span>:<span>${item.minute1}</span><span>${item.minute2}</span>:<span>${item.second1}</span><span>${
				item.second2
			}</span>.<span>${item.mlSecond1}</span><span>${item.mlSecond2}</span>
			   </th>
		    </tr>
		`;
		});
		Table.innerHTML = s;
	}
}

/* Stopwatch */

/* Timer */

let timeCont2 = document.querySelector(".time-cont2");
let startBtn2 = document.getElementById("start-btn2");
let pauseBtn = document.getElementById("pause-btn");
let Note;
let Note2 = document.querySelector(".note2");
let s = false;
let interval2;
let isPauseClicked = false;

let hourInp = document.getElementById("hour-inp");
let minuteInp = document.getElementById("minute-inp");
let secondInp = document.getElementById("second-inp");
let nextHo;
let nextMi;
let nextSe;

let sec;
let min;
let hour;

function startTimer() {
	if (secondInp.value || minuteInp.value || hourInp.value || s) {
		startBtn2.style.display = "none";
		sec = nextSe ? Number(nextSe.value) : Number(secondInp.value);
		min = nextMi ? Number(nextMi.value) : Number(minuteInp.value);
		hour = nextHo ? Number(nextHo.value) : Number(hourInp.value);
		interval2 = setInterval(function () {
			if (sec < 0 || min < 0 || hour < 0) {
				Note2.style.display = "block";
			} else if (sec > 0 || min > 0 || hour > 0) {
				if (sec > 0) {
					--sec;
				} else if (sec === 0 && min > 0 && hour > 0) {
					--min;
					sec = 60;
					--sec;
				} else if (sec === 0 && min === 0 && hour > 0) {
					--hour;
					min = 60;
					--min;
					sec = 60;
					--sec;
				} else if (sec === 0 && min > 0 && hour === 0) {
					--min;
					sec = 60;
					--sec;
				}

				timeCont2.innerHTML = `
							<form>
								<input onchange="changeTrue(event)" class="next-hour" disabled type="number" placeholder="00" value="${hour === 0 ? "00" : hour}">
								<p>:</p>
								<input onchange="changeTrue(event)" class="next-minute" disabled type="number" placeholder="00" value="${min === 0 ? "00" : min}">
								<p>:</p>
								<input onchange="changeTrue(event)" class="next-second" disabled type="number" placeholder="00" value="${sec === 0 ? "00" : sec}">
							</form>
							<div class="text">
								<p class="hours-text">HOURS</p>
								<p class="minutes-text">MINUTES</p>
								<p class="seconds-text">SECONDS</p>
							</div>
							
							`;
			}
			nextHo = document.querySelector(".next-hour");
			nextMi = document.querySelector(".next-minute");
			nextSe = document.querySelector(".next-second");
			if (sec === 0 && min === 0 && hour === 0) {
				Note = document.querySelector(".note");
				Note.classList.add("active");
			}
		}, 1000);
	}
}

function changeTrue(e) {
	if (Number(e.target.value) > 0) {
		s = true;
		console.log(s);
	}
}

function pauseTimer() {
	if (isPauseClicked) {
		pauseBtn.innerText = "pause";
		startTimer();
		isPauseClicked = false;
	} else {
		pauseBtn.innerText = "resume";
		clearInterval(interval2);
		isPauseClicked = true;
	}
}

function resetTimer() {
	Note ? Note.classList.remove("active") : "";
	clearInterval(interval2);
	nextHo.removeAttribute("disabled");
	nextMi.removeAttribute("disabled");
	nextSe.removeAttribute("disabled");
	nextSe.value = "00";
	nextMi.value = "00";
	nextHo.value = "00";
	hourInp.value = "";
	minuteInp.value = "";
	secondInp.value = "";
	startBtn2.style.display = "inline";
}

/* Timer */
