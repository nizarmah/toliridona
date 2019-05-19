function drawRandom( coords ) {
	var rand = Math.random();

	if (rand > 0.5)
		drawHearts( coords );
	else
		drawRose( coords );
}

document.body.addEventListener('click', function (e) {
	const coords = { 
		x: e.pageX, 
		y: e.pageY
	};

	drawRose( coords );
});

window.addEventListener('load', function () {
	const coords = { 
		x: 0, 
		y: 0
	};

	coords.x	= document.getElementById("dearcard").offsetLeft +
					document.getElementById("dearcard").offsetWidth - 50;
	coords.y	= document.getElementById("dearcard").offsetTop +
					document.getElementById("dearcard").offsetHeight - 18;
	
	drawHearts( coords );
});

window.addEventListener('resize', function () {
	const coords = { 
		x: 0, 
		y: 0
	};

	coords.x	= document.getElementById("dearcard").offsetLeft +
					document.getElementById("dearcard").offsetWidth - 50;
	coords.y	= document.getElementById("dearcard").offsetTop +
					document.getElementById("dearcard").offsetHeight - 18;
	
	drawHearts( coords );
});