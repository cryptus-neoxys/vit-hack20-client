let tempImgs = document.querySelector('.temp-imgs');
const previewBox = document.getElementById('Preview-box');
console.log(previewBox);
let certificateList = ['cert', 'cert2'];

let certificateName = '';

tempImgs.innerHTML = '';
for (i = 0; i < certificateList.length; ++i) {
	tempImgs.innerHTML += `<img id=${i} onclick="certNameHandler(this)" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQv5BKVXYRl8jMWGE2tHCzrai4FkWwuBDNG2Q&usqp=CAU" />`;
}

function certNameHandler(element) {
	certificateName = certificateList[element.id];
	previewBox.style.background = `url(${element.src})`;
	// console.log(element.src.toString());
}
