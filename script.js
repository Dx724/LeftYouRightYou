const video = document.getElementById("localVideo");
const canvas1 = document.getElementById("rightCanvas");
const canvas2 = document.getElementById("leftCanvas");
const canvasS = document.getElementById("sourceCanvas");
const ctx1 = canvas1.getContext("2d");
const ctx2 = canvas2.getContext("2d");
const ctxS = canvasS.getContext("2d");
const aButton = document.getElementById("activateButton");
var vFrozen = false;
aButton.onclick = function() {
	vFrozen = !vFrozen;
	aButton.innerText = vFrozen ? "Unfreeze Video" : "Freeze Video";
}
tFunc = function() {
	if (vFrozen) return;
	canvas1.width = video.videoWidth;
	canvas1.height = video.videoHeight;
	canvas2.width = video.videoWidth;
	canvas2.height = video.videoHeight;
	canvasS.width = video.videoWidth;
	canvasS.height = video.videoHeight;
	
	ctx1.drawImage(video, 0, 0, canvas1.width/2, canvas1.height, 0, 0, canvas1.width/2, canvas1.height);
	ctx1.scale(-1,1);
	ctx1.drawImage(video, 0, 0, canvas1.width/2, canvas1.height, -canvas1.width, 0, canvas1.width/2, canvas1.height);
	
	ctx2.drawImage(video, canvas2.width/2, 0, canvas2.width/2, canvas2.height, canvas2.width/2, 0, canvas2.width/2, canvas2.height);
	ctx2.scale(-1,1);
	ctx2.drawImage(video, canvas2.width/2, 0, canvas2.width/2, canvas2.height, -canvas2.width/2, 0, canvas2.width/2, canvas2.height);
	
	ctxS.scale(-1,1);
	ctxS.drawImage(video, -canvasS.width, 0, canvasS.width, canvasS.height);
	ctxS.scale(-1,1);
	ctxS.beginPath();
	ctxS.moveTo(canvasS.width / 2, 0);
	ctxS.lineTo(canvasS.width / 2, canvasS.height);
	ctxS.stroke();
};

setInterval(tFunc, 33);

function handleSuccess(stream) {
	video.srcObject = stream;
}

function handleError(error) {
	console.log("Video error: " + error.message);
}

navigator.mediaDevices.getUserMedia({audio: false, video: true}).then(handleSuccess).catch(handleError);