var w = window.innerWidth, h = window.innerHeight;
function setup() {
	createCanvas(w, h);
	frameRate(60);
	// filter(BLUR,30);
}


var r = (w<h) ? w / 3 : h / 3; // radius is a third of the smaller screen dimension
var x_off = 1000, y_off = 1000, z_off = 1000;
var vertices_amount = 180; //amount of vertices

var px_offset = 120;    // amplitude
var NOISE_SCALE = 450;  // the higher the softer


var Z_SPEED = .01; // noise change per frame

var X_SPEED = 0;
var Y_SPEED = 0;


var MOUSE_FORCE = -100;
// positive 'push', negative 'pull'


var dom_fps = document.getElementById("fps");
var prevTime;

// console.logMath.sqrt((Math.pow(centerCurX, 2) + Math.pow(centerCurY, 2)));

function draw() {

	// change noise direction with mouse
	var mouseVector = createVector(mouseX / w - .5, mouseY / h - .5);
	mouseVector.mult(MOUSE_FORCE);
	X_SPEED = mouseVector.x;
	Y_SPEED = mouseVector.y;

	var rgb = sqrt(sq(mouseX - w / 2) + sq(-(mouseY - h / 2))) / 3.3;
	if (rgb>=255)
		rgb = 255;
	else if (rgb<=72)
		rgb = 72;
	// console.log(rgb);


	// draw shape:
	push();
	translate(w / 2, h / 2);
	background(219, 217, 201);
	noStroke();
	fill(rgb, 115, 133);    // color
	beginShape();
	drawingContext.shadowOffsetX = 0;
	drawingContext.shadowOffsetY = 0;
	drawingContext.shadowBlur = 1000;
	drawingContext.shadowColor = "rgba(255 , 115, 133, 0.2)";
	// console.log(drawingContext.shadowColor);
	for (var a = 0; a<TWO_PI; a += TWO_PI / vertices_amount) {
		// var x = r * sin(a)*mouseVector.y/-10;
		// var y = r * cos(a)*mouseVector.x/10;
		var x = r * sin(a);
		var y = r * cos(a);

		var new_x = x + (
			noise(
				((x_off + x) / NOISE_SCALE),
				((y_off + y) / NOISE_SCALE),
				z_off) * px_offset * sin(a));

		var new_y = y + (
			noise(
				((x_off + x) / NOISE_SCALE),
				((y_off + y) / NOISE_SCALE),
				z_off) * px_offset * cos(a))
		vertex(new_x, new_y);
	}
	endShape();
	pop();


	// update NOISE offsets
	z_off += Z_SPEED;
	x_off += X_SPEED;
	y_off += Y_SPEED;
}