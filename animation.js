const ably = new Ably.Realtime("bOKecA.F01Gsw:f6ccqlfGnZrnTbs9ZqERdlbn7AK9PwwCtsplaep_DL4")

const channel = ably.channels.get("vmix-hora")

let running=false
let frequency=30

let timerBlock
let timerClock

let currentTime
let targetTime

let animating=false



async function getServerTime(){

const r=await fetch("https://worldtimeapi.org/api/timezone/America/Bogota")

const d=await r.json()

currentTime=new Date(d.datetime)

targetTime=new Date(currentTime)

targetTime.setHours(16,0,0,0)

}



function updateClock(){

const diff=targetTime-currentTime

if(diff<=0){
document.getElementById("countTextBottom").innerText="00:00:00"
return
}

const h=Math.floor(diff/3600000)
const m=Math.floor((diff%3600000)/60000)
const s=Math.floor((diff%60000)/1000)

document.getElementById("countTextBottom").innerText =
String(h).padStart(2,'0')+":"+
String(m).padStart(2,'0')+":"+
String(s).padStart(2,'0')

currentTime=new Date(currentTime.getTime()+1000)

}



function startClock(){

updateClock()

timerClock=setInterval(updateClock,1000)

}



function showCountdown(){

const box=document.getElementById("countBox")

box.style.opacity=1
box.style.width="520px"

}



function hideCountdown(){

const box=document.getElementById("countBox")

box.style.opacity=0
box.style.width="0px"

}



function showLogo(){

document.getElementById("logoBox").style.opacity=1

}



function hideLogo(){

document.getElementById("logoBox").style.opacity=0

}



function runBlock(){

if(!running)return

animating=true



// contador 1

showCountdown()

setTimeout(()=>{

hideCountdown()
showLogo()

setTimeout(()=>{

hideLogo()

},5000)

},30000)



// contador 2

setTimeout(()=>{

showCountdown()

setTimeout(()=>{

hideCountdown()
showLogo()

setTimeout(()=>{

hideLogo()

animating=false

scheduleNext()

},5000)

},30000)

},35000)

}



function scheduleNext(){

if(!running)return

timerBlock=setTimeout(()=>{

runBlock()

},frequency*60000)

}



async function startSystem(freq){

frequency=freq

running=true

await getServerTime()

startClock()

// animación inmediata

runBlock()

}



function stopSystem(){

running=false

clearInterval(timerClock)

clearTimeout(timerBlock)

hideCountdown()

hideLogo()

}



function updateFrequency(freq){

frequency=freq

if(!animating){

clearTimeout(timerBlock)

scheduleNext()

}

}



channel.subscribe("update", function(message){

const data = message.data

if(data.action==="on"){
startSystem(data.freq)
}

if(data.action==="off"){
stopSystem()
}

if(data.action==="freq"){
updateFrequency(data.freq)
}

})
