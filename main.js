//set default degree (360*5)
var degree = 1800;
//number of clicks = 0
var clicks = 0;


// put array info into wheel
function defaultwheel() {
	var choiceArray = [
		{"cuisine" : "Chinese", "number": Math.random(0, 5),  "icon": '<img src="../is216-Project/media/chinese.png" height=50 width=50>' }, 
		{"cuisine" : "Korean", "number": Math.random(0, 5),  "icon": '<img src="../is216-Project/media/korean.png" height=50 width=50>' }, 
		{"cuisine" : "Japanese", "number": Math.random(0, 5), "icon": '<img src="../is216-Project/media/japanese.png" height=50 width=50>' }, 
		{"cuisine" : "Italian", "number": Math.random(0, 5), "icon": '<img src="../is216-Project/media/italian.png" height=50 width=50>' }, 
		{"cuisine" : "Indian", "number": Math.random(0, 5),  "icon": '<img src="../is216-Project/media/indian.png" height=50 width=50>' }, 
		{"cuisine" : "Mexican", "number": Math.random(0, 5),  "icon": '<img src="../is216-Project/media/mexican.png" height=50 width=50>' }, 

	];


	var mystr = '';
	for (choiceObject of choiceArray) {
		mystr += `
		<div class="sec">
			<span class="fa text">
				${choiceObject.icon}
			</span>
		</div>
			`;
	}
	document.getElementById("inner-wheel").innerHTML = mystr;
}


$(document).ready(function(){

	/*WHEEL SPIN FUNCTION*/
	$('#spin').click(function(){

		//add 1 every click
		clicks ++;

		/*multiply the degree by number of clicks
	  generate random number between 1 - 360,
    then add to the new degree*/
		var newDegree = degree*clicks;
		var extraDegree = Math.floor(Math.random() * (360 - 1 + 1)) + 1;
		totalDegree = newDegree+extraDegree;

		/*let's make the spin btn to tilt every
		time the edge of the section hits
		the indicator*/
		$('#wheel .sec').each(function(){
			var t = $(this);
			var noY = 0;

			var c = 0;
			var n = 700;
			var interval = setInterval(function () {
				c++;
				if (c === n) {
					clearInterval(interval);
				}

				var aoY = t.offset().top;
				$("#txt").html(aoY);
				console.log(aoY);

				/*23.7 is the minumum offset number that
				each section can get, in a 30 angle degree.
				So, if the offset reaches 23.7, then we know
				that it has a 30 degree angle and therefore,
				exactly aligned with the spin btn*/
				if(aoY < 23.89){
					console.log('<<<<<<<<');
					$('#spin').addClass('spin');
					setTimeout(function () {
						$('#spin').removeClass('spin');
					}, 100);
				}
			}, 10);

			$('#inner-wheel').css({
				'transform' : 'rotate(' + totalDegree + 'deg)'
			});

			noY = t.offset().top;

		});
	});



});//DOCUMENT READY
