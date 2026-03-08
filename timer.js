const counter = document.getElementById("counter");
const box = document.getElementById("box");

let bogotaOffset = 0;

async function syncBogotaTime(){

try{

const r = await fetch("https://worldtimeapi.org/api/timezone/America/Bogota");
const j = await r.json();

const server = new Date(j.datetime).getTime();
const local = Date.now();

bogotaOffset = server - local;

}catch(e){

bogotaOffset = 0;

}

}

function getBogota(){
return new Date(Date.now() + bogotaOffset);
}

function updateCounter(){

const now = getBogota();

const target = new Date(now);

target.setHours(16);
target.setMinutes(0);
target.setSeconds(0);

let diff = target - now;

if(diff < 0) diff = 0;

const h = Math.floor(diff/3600000);
const m = Math.floor((diff%3600000)/60000);
const s = Math.floor((diff%60000)/1000);

counter.innerText =
String(h).padStart(2,"0")+":"+
String(m).padStart(2,"0")+":"+
String(s).padStart(2,"0");

}

setInterval(updateCounter,1000);

function startSystem(){

updateCounter();   // 👈 esto hace que aparezca inmediatamente
box.style.opacity = 1;

}

function stopSystem(){

box.style.opacity = 0;

}

syncBogotaTime();
