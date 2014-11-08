document.addEventListener("DOMContentLoaded", init);

var canvas;
var ctx;

function init() { 
	
	canvas = document.getElementById("leap-canvas");

	// fullscreen
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;

	// create a rendering context
	ctx = canvas.getContext("2d");
	ctx.translate(canvas.width/2,canvas.height);

	//change color of pointable at interval
	setInterval(color, 50);
	
	
	// listen to Leap Motion
	Leap.loop(draw);
	
}

function color() {

	//rgb color
	this.r = Math.floor(Math.random() * 255);
	this.g = Math.floor(Math.random() * 255);
	this.b = Math.floor(Math.random() * 255);
	
    ctx.fillStyle = "rgb("+ this.r +", "+ this.g +", "+ this.b +")";
    
}

// render each frame
function draw(obj) {
  // clear last frame
  ctx.clearRect(-canvas.width/2,-canvas.height,canvas.width,canvas.height);
  
  // render circles based on pointable positions
  var pointablesMap = obj.pointablesMap;
  for (var i in pointablesMap) {
    // get the pointable's position
    var pointable = pointablesMap[i];
    var pos = pointable.tipPosition;

    // create a circle for each pointable
    var radius = Math.min(600/Math.abs(pos[2]),20);
    ctx.beginPath();
    ctx.arc(pos[0]-radius/2,-pos[1]-radius/2,radius,0,2*Math.PI);
    ctx.fill();	

   }	

}
