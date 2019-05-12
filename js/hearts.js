class Heart extends mojs.CustomShape {
	getShape () {
		return '<path xmlns="http://www.w3.org/2000/svg" d="M 65,29 C 59,19 49,12 37,12 20,12 7,25 7,42 7,75 25,80 65,118 105,80 123,75 123,42 123,25 110,12 93,12 81,12 71,19 65,29 z"/>';
	}
}

mojs.addShape( 'heart', Heart );

const main_heart = new mojs.Shape({
	left    : -9, 
	top     : -20,
	shape   : 'heart',
	fill    : '#E5214A',
	scale   : { 0 : 16 },
	angle   : -12,
	easing  : 'elastic.out',
	duration: 1600,
	delay   : 0,
	radius  : 1
});

const mini_heart = new mojs.Shape({
	left    : 20, 
	top     : -40,
	shape   : 'heart',
	fill    : '#E5214A',
	scale   : { 0 : 8 },
	angle   : 12,
	easing  : 'elastic.out',
	duration: 1600,
	delay   : 200,
	radius  : 1
});

document.body.addEventListener('click', function (e) {
	const coords = { 
		x: e.pageX, 
		y: e.pageY
	};
	
	main_heart
		.tune( coords )
		.replay();
	
	mini_heart
		.tune( coords )
		.replay();
});
