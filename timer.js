const counter = document.getElementById("counter");
const logo = document.getElementById("logoBox");
const box = document.getElementById("box");

let repeatMinutes = 10;

let blockTimer=null;
let repeatTimer=null;

let running=false;

let bogotaOffset=0;

async function syncBogotaTime(){

try{

const res = await fetch("https://worldtimeapi.org/api/timezone/America/Bogota");
const data = await res.json();

const serverTime = new Date(data.datetime).getTime();
const localTime = Date.now();

bogotaOffset = serverTime - localTime;

}catch(e){
bogotaOffset = 0;
}

}

function getBogotaNow(){

return new Date(Date.now()+bogotaOffset);

}

function updateCounter(){

const now = getBogotaNow();

const target = new Date(now);

target.setHours(16);
target.setMinutes(0);
target.setSeconds(0);

let diff = target - now;

if(diff < 0) diff = 0;

const h = Math.floor(diff/3600000);
const m = Math.floor(diff%3600000/60000);
const s = Math.floor(diff%60000/1000);

counter.innerText =
String(h).padStart(2,"0")+":"+
String(m).padStart(2,"0")+":"+
String(s).padStart(2,"0");

}

setInterval(updateCounter,1000);

function showCounter(){

logo.style.opacity=0;
counter.style.opacity=1;
box.style.opacity=1;

}

function showLogo(){

counter.style.opacity=0;
logo.style.opacity=1;
box.style.opacity=1;

}

function hideAll(){

box.style.opacity=0;

}

function runBlock(){

showCounter();

blockTimer=setTimeout(()=>{

showLogo();

setTimeout(()=>{

showCounter();

setTimeout(()=>{

showLogo();

scheduleNext();

},30000);

},5000);

},30000);

}

function scheduleNext(){

repeatTimer=setTimeout(()=>{

runBlock();

},repeatMinutes*60000);

}

function startSystem(){

if(running) return;

running=true;

runBlock();

}

function stopSystem(){

running=false;

clearTimeout(blockTimer);
clearTimeout(repeatTimer);

hideAll();

}

function updateFrequency(min){

repeatMinutes=min;

}

syncBogotaTime();
