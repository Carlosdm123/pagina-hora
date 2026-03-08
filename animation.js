const ably = new Ably.Realtime('YOURABLYKEY');

const channel = ably.channels.get("vmix-hora");

let interval;
let cycleTimer;

let cycles = 0;
let frequencyMinutes = 30;

let targetTime;
let currentTime;



async function getServerTime(){

const response = await fetch("apiapilinkurl");

const data = await response.json();

currentTime = new Date(data.datetime);

targetTime = new Date(currentTime);

targetTime.setHours(16,0,0,0);

}



function updateCountdown(){

const diff = targetTime - currentTime;

if(diff<=0){

document.getElementById("countTextBottom").innerText="00:00:00";

return;

}

const h=Math.floor(diff/3600000);
const m=Math.floor((diff%3600000)/60000);
const s=Math.floor((diff%60000)/1000);

document.getElementById("countTextBottom").innerText =
String(h).padStart(2,'0')+":"+
String(m).padStart(2,'0')+":"+
String(s).padStart(2,'0');

currentTime = new Date(currentTime.getTime()+1000);

}



function startClock(){

interval = setInterval(updateCountdown,1000);

}



function showCountdown(){

const box=document.getElementById("countBox");

box.style.transition="width 0.7s ease, opacity 0.5s";

box.style.opacity=1;

box.style.width="520px";

}



function hideCountdown(){

const box=document.getElementById("countBox");

box.style.opacity=0;

box.style.width="0px";

}



function showLogo(){

const logo=document.getElementById("logoBox");

logo.style.transition="opacity 0.5s";

logo.style.opacity=1;

}



function hideLogo(){

const logo=document.getElementById("logoBox");

logo.style.opacity=0;

}



function runCycle(){

showCountdown();

setTimeout(()=>{

hideCountdown();

showLogo();

setTimeout(()=>{

hideLogo();

},5000);

},30000);

cycles++;

if(cycles>=2){

clearInterval(cycleTimer);

setTimeout(()=>{

cycles=0;

cycleTimer=setInterval(runCycle,frequencyMinutes*60000);

runCycle();

},frequencyMinutes*60000);

}

}



channel.subscribe(function(msg){

if(msg.data.type==="on"){

frequencyMinutes = msg.data.freq;

startSystem();

}

if(msg.data.type==="off"){

stopSystem();

}

});



async function startSystem(){

await getServerTime();

startClock();

runCycle();

cycleTimer = setInterval(runCycle,frequencyMinutes*60000);

}



function stopSystem(){

clearInterval(interval);

clearInterval(cycleTimer);

hideCountdown();

hideLogo();

}