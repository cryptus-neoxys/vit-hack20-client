let tempImgs = document.querySelector('.temp-imgs');
let prevtext = document.querySelector('#prev-text');
const previewBox = document.getElementById('Preview-box');


var certificateList = []
for(i=0; i<52; i++) {
	certificateList[i] = `cert${i+1}`;
}

console.log(certificateList);


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
	certificateName = certificateList[element.id];
	previewBox.style.backgroundImage = `url(${element.src})`;
	prevtext.innerHTML = `<i>This looks nice </i>&#9749;`
}
