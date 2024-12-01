var seconds=0;
var speakeron=true;
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
document.getElementById(currentindex).classList.add("blinking-text");
document.addEventListener("keypress",
	function(e){
		pressedkey=e.key;
		console.log("Key pressed: "+pressedkey);
	if(null!=document.getElementById(currentindex)){
		document.getElementById(currentindex).classList.remove("blinking-text");
		textarray[currentindex]!=pressedkey?(document.getElementById(currentindex).style.backgroundColor="#FF0000", playbeep()):document.getElementById(currentindex).style.backgroundColor="#00FF66",
		analytics(textarray[currentindex],pressedkey);
		currentindex++;
		document.getElementById(currentindex).classList.add("blinking-text");
	}
	if (e.keyCode === 13) {
           refresh();
    }
	if(e.keyCode === 8){
		alert("When speaker is on it will beep on mistakes. You can not edit mistakes, so continue typing and try to not make same mistake next time.");
	}
	displayAnalytics();
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
	document.getElementById(currentindex).classList.add("blinking-text");
}

function refresh(){	
	if(lessonNumber>=lessonssize){lessonNumber=0}
	document.getElementById("lessonNumber").innerHTML=lessonNumber;
	loadContent(lessons.at(lessonNumber));
	document.getElementById("righthandimg").src="img/right-hand-No.png";
	document.getElementById("lefthandimg").src="img/left-hand-No.png";
	document.getElementById(currentindex).classList.add("blinking-text");
}

function nextPage(){
	lessonNumber++;
	if(lessonNumber>=lessonssize){lessonNumber=0}
	document.getElementById("lessonNumber").innerHTML=lessonNumber;
	loadContent(lessons.at(lessonNumber));
	document.getElementById("righthandimg").src="img/right-hand-No.png";
	document.getElementById("lefthandimg").src="img/left-hand-No.png";
	document.getElementById(currentindex).classList.add("blinking-text");
}

function goHome(){
	lessonNumber=0;
	document.getElementById("lessonNumber").innerHTML=lessonNumber;
	loadContent(lessons.at(lessonNumber));
	document.getElementById("righthandimg").src="img/right-hand-No.png";
	document.getElementById("lefthandimg").src="img/left-hand-No.png";
	document.getElementById(currentindex).classList.add("blinking-text");
}

function backPage(){
	lessonNumber--;
	if(lessonNumber<0){lessonNumber=lessonssize-1}
	document.getElementById("lessonNumber").innerHTML=lessonNumber;
	loadContent(lessons.at(lessonNumber));
	document.getElementById("righthandimg").src="img/right-hand-No.png";
	document.getElementById("lefthandimg").src="img/left-hand-No.png";
	document.getElementById(currentindex).classList.add("blinking-text");
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
		//console.log("currentindex"+currentindex+",charcount"+charcount); 		
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

let timerdisplay=true;
function toggleTimerDisplay() {
	if(timerdisplay==true){
		 /*seconds=0;*/
		 document.getElementById("timerdiv").style.display = "none";
		 timerdisplay=false;
	}else{
		 document.getElementById("timerdiv").style.display = "block";
		 timerdisplay=true;
	}	 
}


let goodLetterKeyPressCount = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
let badLetterKeyPressCount = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
//a,b,c,d,e,f,g,h,i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z
//1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26
function analytics(letter,typedletter) {
	//console.log(letter,typedletter);
if(letter==typedletter){
	switch (typedletter) {
  	case "a":
	goodLetterKeyPressCount[0]=goodLetterKeyPressCount[0]+1;
	break;
	case "b":
	goodLetterKeyPressCount[1]=goodLetterKeyPressCount[1]+1;
	break;  
	case "c":
	goodLetterKeyPressCount[2]=goodLetterKeyPressCount[2]+1;
	break; 
	case "d":
	goodLetterKeyPressCount[3]=goodLetterKeyPressCount[3]+1;
	break; 
	case "e":
	goodLetterKeyPressCount[4]=goodLetterKeyPressCount[4]+1;
	break; 
	case "f":
	goodLetterKeyPressCount[5]=goodLetterKeyPressCount[5]+1;
	break; 
	case "g":
	goodLetterKeyPressCount[6]=goodLetterKeyPressCount[6]+1;
	break; 
	case "h":
	goodLetterKeyPressCount[7]=goodLetterKeyPressCount[7]+1;
	break; 
	case "i":
	goodLetterKeyPressCount[8]=goodLetterKeyPressCount[8]+1;
	break; 
	case "j":
	goodLetterKeyPressCount[9]=goodLetterKeyPressCount[9]+1;
	break; 
	case "k":
	goodLetterKeyPressCount[10]=goodLetterKeyPressCount[10]+1;
	break; 
	case "l":
	goodLetterKeyPressCount[11]=goodLetterKeyPressCount[11]+1;
	break; 
	case "m":
	goodLetterKeyPressCount[12]=goodLetterKeyPressCount[12]+1;
	break; 
	case "n":
	goodLetterKeyPressCount[13]=goodLetterKeyPressCount[13]+1;
	break; 
	case "o":
	goodLetterKeyPressCount[14]=goodLetterKeyPressCount[14]+1;
	break; 
	case "p":
	goodLetterKeyPressCount[15]=goodLetterKeyPressCount[15]+1;
	break; 
	case "q":
	goodLetterKeyPressCount[16]=goodLetterKeyPressCount[16]+1;
	break; 
	case "r":
	goodLetterKeyPressCount[17]=goodLetterKeyPressCount[17]+1;
	break; 
	case "s":
	goodLetterKeyPressCount[18]=goodLetterKeyPressCount[18]+1;
	break; 
	case "t":
	goodLetterKeyPressCount[19]=goodLetterKeyPressCount[19]+1;
	break; 
	case "u":
	goodLetterKeyPressCount[21]=goodLetterKeyPressCount[21]+1;
	break; 
	case "v":
	goodLetterKeyPressCount[22]=goodLetterKeyPressCount[22]+1;
	break; 
	case "w":
	goodLetterKeyPressCount[23]=goodLetterKeyPressCount[23]+1;
	break; 
	case "x":
	goodLetterKeyPressCount[24]=goodLetterKeyPressCount[24]+1;
	break; 
	case "y":
	goodLetterKeyPressCount[25]=goodLetterKeyPressCount[25]+1;
	break; 
	case "z":
	goodLetterKeyPressCount[26]=goodLetterKeyPressCount[26]+1;
	break;	 
  	default:
	  //do nothing
	  }
}else{
	switch (typedletter) {
	case "a":
	badLetterKeyPressCount[0]=badLetterKeyPressCount[0]+1;
	break;
	case "b":
	badLetterKeyPressCount[1]=badLetterKeyPressCount[1]+1;
	break;  
	case "c":
	badLetterKeyPressCount[2]=badLetterKeyPressCount[2]+1;
	break; 
	case "d":
	badLetterKeyPressCount[3]=badLetterKeyPressCount[3]+1;
	break; 
	case "e":
	badLetterKeyPressCount[4]=badLetterKeyPressCount[4]+1;
	break; 
	case "f":
	badLetterKeyPressCount[5]=badLetterKeyPressCount[5]+1;
	break; 
	case "g":
	badLetterKeyPressCount[6]=badLetterKeyPressCount[6]+1;
	break; 
	case "h":
	badLetterKeyPressCount[7]=badLetterKeyPressCount[7]+1;
	break; 
	case "i":
	badLetterKeyPressCount[8]=badLetterKeyPressCount[8]+1;
	break; 
	case "j":
	badLetterKeyPressCount[9]=badLetterKeyPressCount[9]+1;
	break; 
	case "k":
	badLetterKeyPressCount[10]=badLetterKeyPressCount[10]+1;
	break; 
	case "l":
	badLetterKeyPressCount[11]=badLetterKeyPressCount[11]+1;
	break; 
	case "m":
	badLetterKeyPressCount[12]=badLetterKeyPressCount[12]+1;
	break; 
	case "n":
	badLetterKeyPressCount[13]=badLetterKeyPressCount[13]+1;
	break; 
	case "o":
	badLetterKeyPressCount[14]=badLetterKeyPressCount[14]+1;
	break; 
	case "p":
	badLetterKeyPressCount[15]=badLetterKeyPressCount[15]+1;
	break; 
	case "q":
	badLetterKeyPressCount[16]=badLetterKeyPressCount[16]+1;
	break; 
	case "r":
	badLetterKeyPressCount[17]=badLetterKeyPressCount[17]+1;
	break; 
	case "s":
	badLetterKeyPressCount[18]=badLetterKeyPressCount[18]+1;
	break; 
	case "t":
	badLetterKeyPressCount[19]=badLetterKeyPressCount[19]+1;
	break; 
	case "u":
	badLetterKeyPressCount[21]=badLetterKeyPressCount[21]+1;
	break; 
	case "v":
	badLetterKeyPressCount[22]=badLetterKeyPressCount[22]+1;
	break; 
	case "w":
	badLetterKeyPressCount[23]=badLetterKeyPressCount[23]+1;
	break; 
	case "x":
	badLetterKeyPressCount[24]=badLetterKeyPressCount[24]+1;
	break; 
	case "y":
	badLetterKeyPressCount[25]=badLetterKeyPressCount[25]+1;
	break; 
	case "z":
	badLetterKeyPressCount[26]=badLetterKeyPressCount[26]+1;
	break;
	default:
	  //do nothing
}
}
}

let analyticdisplay=true;
function toggleAnalyticDisplay() {
	if(analyticdisplay==true){
		 seconds=0;
		 document.getElementById("analyticdiv").style.display = "none";
		 analyticdisplay=false;
	}else{
		 document.getElementById("analyticdiv").style.display = "block";
		 analyticdisplay=true;
	}	 
}

var accuracyPercentage=0;
function displayAnalytics() {
	  //console.log(goodLetterKeyPressCount[0] +" & "+ badLetterKeyPressCount[0]);
	  accA=goodLetterKeyPressCount[0]/(goodLetterKeyPressCount[0]+badLetterKeyPressCount[0])*100;
	  //alert("A:"+ accA+"%" );
	  
	var goodtotal = 0;
	for (var i in goodLetterKeyPressCount) {
		if(isNaN(goodLetterKeyPressCount[i])){continue;}
		goodtotal += goodLetterKeyPressCount[i];
	}

	var badtotal = 0;
	for (var i in badLetterKeyPressCount) {
		if(isNaN(badLetterKeyPressCount[i])){continue;}
		badtotal += badLetterKeyPressCount[i];
	}
	console.log(goodtotal+", "+badtotal);
	accuracyPercentage=(goodtotal/(goodtotal+badtotal))*100;
	//alert("Accuracy:"+ accuracyPercentage +" %" );
	
	if(isNaN(accuracyPercentage)){
			document.getElementById("accuracy").innerHTML="00.00";
	}else{
			document.getElementById("accuracy").innerHTML=accuracyPercentage.toFixed(2);
	}
	  
}

