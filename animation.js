const ably = new Ably.Realtime('bUKecA.F01Gsw:f6ccqlfGnZrnTbs9ZqERdlbn7AK9PwwCtsplaep_DL4')

const channel = ably.channels.get("vmix-hora")

let running=false
let frequency=30

let timerBlock
let timerClock

let currentTime
let targetTime



async function getServerTime(){

const r=await fetch("apiapilinkurl")
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

// contador
showCountdown()

setTimeout(()=>{

hideCountdown()
showLogo()

setTimeout(()=>{

hideLogo()

},5000)

},30000)


// segundo contador
setTimeout(()=>{

showCountdown()

setTimeout(()=>{

hideCountdown()
showLogo()

setTimeout(()=>{

hideLogo()

},5000)

},30000)

},35000)

}



async function startSystem(freq){

frequency=freq
running=true

await getServerTime()

startClock()

runBlock()

timerBlock=setInterval(runBlock,frequency*60000)

}



function stopSystem(){

running=false

clearInterval(timerClock)
clearInterval(timerBlock)

hideCountdown()
hideLogo()

}



// 🔵 AQUÍ ESCUCHA EL EVENTO
channel.subscribe("horaControl", function(msg){

if(msg.data.state=="on"){
startSystem(msg.data.freq)
}

if(msg.data.state=="off"){
stopSystem()
}

})
