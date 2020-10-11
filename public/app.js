let tempImgs = document.querySelector('.temp-imgs');
let prevtext = document.querySelector('#prev-text');
const previewBox = document.getElementById('Preview-box');
let lowerbuts = document.getElementById('lowerbuts');
let fileDiv = document.getElementById('fileupload');
// document.getElementById("upup").addEventListener("click",addingConvertBut);
let reqTemplateName;
var count=0;

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
	lowerbuts.innerHTML = `<label class="button" onclick="addingDownloadBut()">Select this template</label>`
	count=0;
	reqTemplateName=certificateName;
	
}

function addingDownloadBut() {
	count=1;
	console.log(reqTemplateName);
	console.log(count);
	lowerbuts.innerHTML = `<label class="button" onclick="alert2()" >Download Your File</label>`
}

// function addingConvertBut() {
// 	fileDiv.innerHTML = `<label class="button" >CONVERT</label>`
// }

function alert1() {
	if( count===0) {
		alert("Select Template First")
		event.preventDefault();
	}
	else {
		count=2;
	}
}

function alert2() {
	if( count != 2) {
		alert("Upload your excel file first")
		event.preventDefault();
	}
}

let data=[{
    "name":"jayanth",
    "data":"scd",
    "abc":"sdef"
}]
document.getElementById('input').addEventListener("change", (event) => {
	selectedFile = event.target.files[0];
	var ch=reqTemplateName
		console.log(ch)
		XLSX.utils.json_to_sheet(data, 'out.xlsx');
		if(selectedFile){
			let fileReader = new FileReader();
			fileReader.readAsBinaryString(selectedFile);
			fileReader.onload = (event)=>{
			 let data = event.target.result;
			 let workbook = XLSX.read(data,{type:"binary"});
			 console.log(workbook);
			 workbook.SheetNames.forEach(sheet => {
				  let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
				  console.log(rowObject);
				  c = JSON.stringify(rowObject,undefined,4)
				  s = JSON.parse(c)
				  console.log(c)
				  fetch("/temp1",{ 
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'option':ch
					},
					body:JSON.stringify(rowObject,undefined,4),
					redirect: 'follow'
				})
				.then(resp=>resp.json())
				.then(result=>{
					console.log(result)
				})
				.catch(function(error) {
					console.log(error);
				});
	
			 });
			}
		}
})

// document.getElementById('generate').addEventListener("click", () => {

// })


