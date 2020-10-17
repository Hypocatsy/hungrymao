//set default degree (360*5)
var degree = 1800;
//number of clicks = 0
var clicks = 0;

// Part 1: Wheel Info - cuisines and relevant icons
var choiceArray = [
    {"cuisine" : "Chinese", "icon": '<img src="media/wheel_icons/chinese.png" height="50" width="50">' }, 
    {"cuisine" : "Korean", "icon": '<img src="media/wheel_icons/korean.png" height="50" width="50">' }, 
    {"cuisine" : "Japanese", "icon": '<img src="media/wheel_icons/japanese.png" height="50" width="50">' }, 
    {"cuisine" : "Italian", "icon": '<img src="media/wheel_icons/italian.png" height="50" width="50">' }, 
    {"cuisine" : "Indian", "icon": '<img src="media/wheel_icons/indian.png" height="50" width="50">' }, 
    {"cuisine" : "Mexican", "icon": '<img src="media/wheel_icons/mexican.png" height="50" width="50">' }, 
];

// put array info into wheel
function defaultview(choiceArray) {


	var wheelstr = '';
	for (choiceObject of choiceArray) {
		wheelstr += `
		<div class="sec">
			<span class="fa text">
				${choiceObject.icon}
			</span>
		</div>
			`;
	}
	// add into wheel html
	document.getElementById("inner-wheel").innerHTML = wheelstr;


	// Part 2: Text beside the wheel
	var beside_wheel_str = `
	<i class='fas fa-utensils' style='font-size:48px;' id='fork_knife'></i>
	<div id="beside_wheel_text">
		<h4>Welcome!</h4> 
		Click the ✋ icon on the wheel to randomise your food choice!
	</div>
	`;

	document.getElementById("wheeltextdiv").innerHTML = beside_wheel_str;

}

var mycounter = 0;

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
					mycounter ++;
					console.log("===========================");
					console.log("MY COUNTER:", mycounter);
					if (mycounter == 6) {
						console.log("spin ends here");
						chosen_view();
					}
				}

				var aoY = t.offset().top;
				$("#txt").html(aoY);
				// console.log(aoY);

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
					}, 80);

				}
			}, 10);

			$('#inner-wheel').css({
				'transform' : 'rotate(' + totalDegree + 'deg)'
			});

			noY = t.offset().top;

			
		});

		


	});




});//DOCUMENT READY

function randomize(choiceArray){
    var i = Math.floor(Math.random() * 5);
    return choiceArray[i];
}

function chosen_view() {
	console.log("=== CHOSEN_VIEW() starts ===");

    var chosen_cuisine = randomize(choiceArray);
    // alert('called randomise')
    console.log(chosen_cuisine);

	// insert text
	var msg = `
	<span class="fa text">${chosen_cuisine.icon}</span>
	<div id="beside_wheel_text">
		<h4>Yay😋</h4> 
		You are fated to eat ${chosen_cuisine.cuisine} food!
	</div>
	<button type="button" class="btn" id="no_button">Confirm cuisine and proceed</button>
	`;
	document.getElementById("wheeltextdiv").innerHTML = msg;

	console.log("=== CHOSEN_VIEW() ends ===");
}
