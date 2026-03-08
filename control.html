<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">
<script src="https://cdn.ably.com/lib/ably.min-1.js"></script>

<style>

body{
background:#1e1e1e;
color:#e6e6e6;
font-family:sans-serif;
margin:40px;
display:flex;
}

.version{
width:18px;
height:18px;
border-radius:50%;
background:#666;
margin-right:20px;
margin-top:5px;
}

.container{
flex:1;
}

/* PREVIEW */

.preview{
width:854px;
height:480px;
border:4px solid white;
margin:auto;
overflow:hidden;
}

iframe{
width:1920px;
height:1080px;
transform:scale(0.444);
transform-origin:top left;
border:none;
}

/* CONTROLES */

.panel{
width:854px;
margin:auto;
margin-top:30px;
text-align:center;
background:#2a2a2a;
padding:20px;
border-radius:8px;
}

.panel input{
width:120px;
padding:8px;
font-size:16px;
background:#1e1e1e;
color:white;
border:1px solid #555;
border-radius:4px;
text-align:center;
}

.panel button{
margin-left:10px;
padding:8px 16px;
background:#2c8f6b;
border:none;
color:white;
cursor:pointer;
border-radius:4px;
}

.panel button:hover{
background:#38a77f;
}

/* SWITCH */

.switch{
position:relative;
display:inline-block;
width:60px;
height:28px;
margin-top:20px;
}

.switch input{
display:none;
}

.slider{
position:absolute;
cursor:pointer;
top:0;
left:0;
right:0;
bottom:0;
background:#555;
transition:.3s;
border-radius:28px;
}

.slider:before{
position:absolute;
content:"";
height:22px;
width:22px;
left:3px;
bottom:3px;
background:white;
transition:.3s;
border-radius:50%;
}

input:checked + .slider{
background:#2c8f6b;
}

input:checked + .slider:before{
transform:translateX(32px);
}

.status{
margin-top:10px;
font-size:18px;
font-weight:bold;
}

</style>

</head>

<body>

<div class="version" id="connectionDot"></div>

<div class="container">

<!-- PREVIEW -->

<div class="preview">
<iframe src="overlayhora.html"></iframe>
</div>

<!-- CONTROLES -->

<div class="panel">

<h3>CONTADOR CIERRE DE VOTACIONES</h3>

<p>Repetir bloque cada (minutos)</p>

<input id="freq" type="number" value="30">

<button onclick="setFreq()">Aceptar</button>

<br><br>

<label class="switch">
<input type="checkbox" id="toggle">
<span class="slider"></span>
</label>

<div class="status" id="status">OFF</div>

</div>

</div>

<script>

const ably = new Ably.Realtime("bOKecA.F01Gsw:f6ccqlfGnZrnTbs9ZqERdlbn7AK9PwwCtsplaep_DL4")

const channel = ably.channels.get("vmix-hora")

const connectionDot=document.getElementById("connectionDot")

ably.connection.on((stateChange)=>{

if(stateChange.current==="connected"){
connectionDot.style.background="#00ff7a"
}

if(stateChange.current==="connecting" || stateChange.current==="disconnected"){
connectionDot.style.background="#ffaa00"
}

if(stateChange.current==="suspended" || stateChange.current==="failed"){
connectionDot.style.background="#ff0033"
}

})

let state=false

const toggle=document.getElementById("toggle")
const status=document.getElementById("status")

toggle.onchange=function(){

state=this.checked

const freq=parseInt(document.getElementById("freq").value)

if(state){

status.innerText="ON"

channel.publish("hora",{
action:"on",
freq:freq
})

}else{

status.innerText="OFF"

channel.publish("hora",{
action:"off"
})

}

}

function setFreq(){

const freq=parseInt(document.getElementById("freq").value)

channel.publish("hora",{
action:"freq",
freq:freq
})

}

</script>

</body>

</html>
