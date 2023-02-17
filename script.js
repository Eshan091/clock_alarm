const currentTime = document.querySelector("h1");
content = document.querySelector(".content");
selectMenu = document.querySelectorAll("select");
const imgclock = document.getElementById("img-clock");
let btnprimary = document.querySelector('#alarm_btn');
btnprimary.addEventListener('click', () => btnprimary.style.backgroundColor = 'red')
setAlarmBtn = document.querySelector("button");
let alarmTime, isalarmset = false,
    ringtone = new Audio("files/Alarm Clock Alarm.mp3");
for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}
setInterval(() => {
    //get hours mins seconds
    let date = new Date();
    h = date.getHours();
    m = date.getMinutes();
    s = date.getSeconds();
    ampm = "AM";
    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;
    if (alarmTime == `${h}:${m} ${ampm}`) {
        ringtone.play();
        ringtone.loop = true;
        // console.log("alarm ringing...");
        imgclock.classList.add("shake");

    }



}, 1000);
function setAlarm() {
    if (isalarmset) {
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        return isalarmset = false;
    }
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Please,select a valid time to set alarm!");
    }
    alarmTime = time;
    isalarmset = true;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";
    setAlarmBtn.addEventListener('click', () => setAlarmBtn.style.backgroundColor = 'rgb(13, 208, 13)')
    setAlarmBtn.addEventListener('click', () => {
        // Remove the shake class from the alarm clock image
        imgclock.classList.remove("shake");
    });

}
setAlarmBtn.addEventListener("click", setAlarm);
