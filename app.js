let tempImgs = document.querySelector('.temp-imgs');
let prevtext = document.querySelector('#prev-text');
const previewBox = document.getElementById('Preview-box');
let lowerbuts = document.getElementById('lowerbuts');
let reqTemplateName;
var count = 0;

var certificateList = []
for(i=0; i<52; i++) {
	certificateList[i] = `cert${i+1}`;
}

let sourcelist = []
for(i=1; i<certificateList.length+1; i++) {
	sourcelist[i] = `./Templates/cert${i}.png`;
}



let certificateName = '';

tempImgs.innerHTML = '';
for (i = 1; i < certificateList.length+1; ++i) {
	sr = sourcelist[i]
	tempImgs.innerHTML += `<img id=${i} onclick="certNameHandler(this)" src="${sr}" />`;
}

prevtext.innerHTML = '';
function certNameHandler(element) {
	certificateName = certificateList[element.id-1];
	previewBox.style.backgroundImage = `url(${element.src})`;
	prevtext.innerHTML = `<i>This looks nice </i>&#9749;`
	lowerbuts.innerHTML = `<label class="button" onclick="addingDownloadBut()">Select this theme</label>`
	
	reqTemplateName=certificateName;
	
}

function addingDownloadBut() {
	console.log(reqTemplateName);
	lowerbuts.innerHTML = `<label class="button" onclick="returningTemplateName()">Download Your File</label>`
}

function returningTemplateName() {
	
}

