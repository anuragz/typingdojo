var seconds=0;
var speakeron=false;
const lessons = ["abcdefghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfedcba",
	"the quick brown fox jumps over the lazy dog." 
	];
const lessonssize = lessons.reduce((acc) => acc + 1, 0);
var lessonNumber=0;
var input="z y x w v u t s r q p o n m l k j i h g f e d c b a";
var textarray=lessons.at(lessonNumber).split("");
var charcount=textarray.length;
var beep = null; 	
var currenthighlighted = null;

function main(){
beep = document.getElementById("beep"); 
alert("Place your left hand fingers on the keys A, S, D and F( left index finger). Your right hand fingers on the keys J( right index finger), K, L and semicolon. ");
document.getElementById("timer").innerHTML=seconds;

document.getElementById("lessonNumber").innerHTML=lessonNumber;
for(let e=currentindex=0;e<textarray.length;++e){
	const g=textarray[e];
	var iDiv=document.createElement("div");
	iDiv.style.display="inline-block",
	iDiv.style.margin="2px 0px 2px 0px",
	iDiv.id=e," "==g?iDiv.innerHTML="&nbsp":iDiv.innerHTML=g,
	document.getElementById("screen").appendChild(iDiv)
}

document.addEventListener("keypress",
	function(e){
	if(null!=document.getElementById(currentindex)){
		textarray[currentindex]!=e.key?(document.getElementById(currentindex).style.backgroundColor="#FF0000", playbeep()):document.getElementById(currentindex).style.backgroundColor="#00FF66",
		currentindex++;
	}
	if (e.keyCode === 13) {
           refresh();
    }
	if(e.keyCode === 8){
		alert("When speaker is on it will beep on mistakes. You can not edit mistakes, so continue typing and try to not make same mistake next time.");
	}
});
setInterval('autoRefreshTimer()', 1000);
setInterval('autoRefreshImg()', 250);
}

function autoRefreshTimer() {
	seconds++;
	document.getElementById("timer").innerHTML=seconds;
}

function loadContent(input){
	charcount=input.length;
	textarray=input.split("");
	while (document.getElementById("screen").lastElementChild){
		document.getElementById("screen").removeChild(document.getElementById("screen").lastElementChild);
	 }
	for(let e=currentindex=0;e<textarray.length;++e){
		const g=textarray[e];
		var iDiv=document.createElement("div");
		iDiv.style.display="inline-block",
		iDiv.style.margin="2px 0px 2px 0px",
		iDiv.id=e," "==g?iDiv.innerHTML="&nbsp":iDiv.innerHTML=g,
		document.getElementById("screen").appendChild(iDiv)
	}
	currentindex=0;
}

function refresh(){	
	if(lessonNumber>=lessonssize){lessonNumber=0}
	document.getElementById("lessonNumber").innerHTML=lessonNumber;
	loadContent(lessons.at(lessonNumber));
	document.getElementById("righthandimg").src="img/right-hand-No.png";
	document.getElementById("lefthandimg").src="img/left-hand-No.png";
}

function nextPage(){
	lessonNumber++;
	if(lessonNumber>=lessonssize){lessonNumber=0}
	document.getElementById("lessonNumber").innerHTML=lessonNumber;
	loadContent(lessons.at(lessonNumber));
	document.getElementById("righthandimg").src="img/right-hand-No.png";
	document.getElementById("lefthandimg").src="img/left-hand-No.png";
}

function goHome(){
	lessonNumber=0;
	document.getElementById("lessonNumber").innerHTML=lessonNumber;
	loadContent(lessons.at(lessonNumber));
	document.getElementById("righthandimg").src="img/right-hand-No.png";
	document.getElementById("lefthandimg").src="img/left-hand-No.png";
}

function backPage(){
	lessonNumber--;
	if(lessonNumber<0){lessonNumber=lessonssize-1}
	document.getElementById("lessonNumber").innerHTML=lessonNumber;
	loadContent(lessons.at(lessonNumber));
	document.getElementById("righthandimg").src="img/right-hand-No.png";
	document.getElementById("lefthandimg").src="img/left-hand-No.png";
}

function togglespeaker(){
	if(speakeron){
		document.getElementById("speakerspan").innerHTML = "&#128263;";
		speakeron=false;
	}else{
		document.getElementById("speakerspan").innerHTML = "&#128266;";
		speakeron=true;
	}
}

	
function autoRefreshImg() {
	if(null!=document.getElementById(currentindex)){
		changeHandImages(textarray[currentindex]);
		if(currenthighlighted==null){
			currenthighlighted = textarray[currentindex];
			document.getElementById(currenthighlighted).classList.add("fontLarge");
		}else{
			if(document.getElementById(currenthighlighted)!=null && isCharacterALetter(textarray[currentindex])){
				document.getElementById(currenthighlighted).classList.remove("fontLarge");
				currenthighlighted = textarray[currentindex];
				document.getElementById(currenthighlighted).classList.add("fontLarge");
			}
		}
		console.log("currentindex"+currentindex+",charcount"+charcount); 		
	}
	if(currentindex==charcount){
		document.getElementById(currenthighlighted).classList.remove("fontLarge");
		document.getElementById("lefthandimg").src="img/left-hand-No.png";
		document.getElementById("righthandimg").src="img/right-hand-No.png";
	}
}


function isCharacterALetter(char) {
	  return (/[a-zA-Z]/).test(char)
	}

function playbeep(){	
	if(speakeron){
		beep.play();
	}
}

function help(){	
	alert("Press home button to go to lesson 0. Press enter button to repeat same lesson. You can not edit mistakes, so continue typing and try to not make same mistake next time.");
}

function featureNotReady() {
	  alert("Feature is under devlopment.");
}

function changeHandImages( key){
	if(key=="a"||key=="q"||key=="z" ){
		document.getElementById("lefthandimg").src="img/left-hand-A-rows.png";
		document.getElementById("righthandimg").src="img/right-hand-No.png";
	}
	if(key=="s"||key=="w"||key=="x" ){
		document.getElementById("lefthandimg").src="img/left-hand-S-rows.png";
		document.getElementById("righthandimg").src="img/right-hand-No.png";
	}
	if(key=="e"||key=="d"||key=="c" ){
		document.getElementById("lefthandimg").src="img/left-hand-D-rows.png";
		document.getElementById("righthandimg").src="img/right-hand-No.png";
	}
	if(key=="r"||key=="f"||key=="v"||key=="t"||key=="g"||key=="b" ){
		document.getElementById("lefthandimg").src="img/left-hand-F-rows.png";
		document.getElementById("righthandimg").src="img/right-hand-No.png";
	}
	if(key=="y"||key=="h"||key=="n" || key=="u"||key=="j"||key=="m" ){
		document.getElementById("righthandimg").src="img/right-hand-J-rows.png";
		document.getElementById("lefthandimg").src="img/left-hand-No.png";
	}
	if(key=="i"||key=="k"||key=="," ){
		document.getElementById("righthandimg").src="img/right-hand-K-rows.png";
		document.getElementById("lefthandimg").src="img/left-hand-No.png";
	}
	if(key=="o"||key=="l"||key=="." ){
		document.getElementById("righthandimg").src="img/right-hand-L-rows.png";
		document.getElementById("lefthandimg").src="img/left-hand-No.png";
	}
	if(key=="p"||key==";"||key=="/" ){
		document.getElementById("righthandimg").src="img/right-hand-P-rows.png";
		document.getElementById("lefthandimg").src="img/left-hand-No.png";
	}
}