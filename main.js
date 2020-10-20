//set default degree (360*5)
var degree = 1800;
//number of clicks = 0
var clicks = 0;

// Cat Array

var catArray = ["media/memes/bear_cat.jpg", "media/memes/cute_cat.jpg", "media/memes/dude_cat.jpg", "media/memes/frown_cat.jpg", "media/memes/grumpy_cat.jpg", "media/memes/polite_cat.jpg", "media/memes/shocked_cat.jpg"];

// Part 1: Wheel Info - cuisines and relevant icons

var choiceArray = [
    {"cuisine" : "Chinese", "icon": '<img src="media/wheel_icons/chinese.png" height="50" width="50">' }, 
    {"cuisine" : "Korean", "icon": '<img src="media/wheel_icons/korean.png" height="50" width="50">' }, 
    {"cuisine" : "Japanese", "icon": '<img src="media/wheel_icons/japanese.png" height="50" width="50">' }, 
    {"cuisine" : "Italian", "icon": '<img src="media/wheel_icons/italian.png" height="50" width="50">' }, 
    {"cuisine" : "Indian", "icon": '<img src="media/wheel_icons/indian.png" height="50" width="50">' }, 
    {"cuisine" : "Mexican", "icon": '<img src="media/wheel_icons/mexican.png" height="50" width="50">' }, 
];

const filterArray = ["vegetarian", "halal", "vegan"];

// Filter, Wheel, Text beside wheel
function defaultview(choiceArray) {

	// Part 1: Filter
	var filterstr = `
	<h3>Food Restrictions</h3> 
	`;
	for (var option of filterArray) {
		console.log(option);
		filterstr += `
		<div class="form-check">
			<input type="checkbox" class="form-check-input" id="${option}">
			<label class="form-check-label" for="${option}">${option}</label>
	  	</div>
		`;
		console.log(filterstr);
	}
	filterstr += `
	<button type="button" class="btn" id="filter_button">Filter</button>
	`;

	document.getElementById("filterdiv").innerHTML = filterstr;

	var wheelstr = '';
	for (var choiceObject of choiceArray) {
		wheelstr += `
		<div class="sec">
			<span class="fa text wheelIcon">
				${choiceObject.icon}
			</span>
		</div>
			`;
	}
	// Part 2: Wheel - add cuisines into wheel html
	document.getElementById("inner-wheel").innerHTML = wheelstr;


	// Part 3: Text beside the wheel
	var beside_wheel_str = `
	<i class='fas fa-utensils' style='font-size:48px;' id='fork_knife'></i>
	<div id="beside_wheel_text">
		<h4>Welcome!</h4> 
		Click the ✋ icon on the wheel to randomise your food choice!
	</div>
	`;

	document.getElementById("wheeltextdiv").innerHTML = beside_wheel_str;

}

var count_repeat = 1;

// This function is called when user chooses the "I dont want this cuisine!!" button
function repeatspin(choiceArray) {
	var wheelstr = '';
	for (var choiceObject of choiceArray) {
		wheelstr += `
		<div class="sec">
			<span class="fa text wheelIcon">
				${choiceObject.icon}
			</span>
		</div>
			`;
	}
	// add into wheel html
	document.getElementById("inner-wheel").innerHTML = wheelstr;

	// text beside wheel
	
	//get random cat
	var random_cat = randomCat(catArray);

	// repeat once
	if (count_repeat == 1) {
		console.log("You have spinned " + count_repeat + " times!!!!");
		var beside_wheel_str = `
		<i class='fas fa-utensils' style='font-size:48px;' id='fork_knife'></i>
		<div id="beside_wheel_text">
			<h4>You choose to spin again!</h4> 
			Click the ✋ icon on the wheel to randomise your food choice!
			<br>
			Hope you will like the choice this time!
		</div>
		`;
	}
	else {
		// less than 5 times
		if (count_repeat < 5) {
			var beside_wheel_str = `
			<img src="${random_cat}" style = "height: 200px;">
			<div id="beside_wheel_text">
				<h4>You have spinned ${count_repeat} times already!!!</h4> 
				Click the ✋ icon on the wheel to randomise your food choice!
				<br>
				Hope you will like the choice this time!
			</div>
			`;
		}
		// 5 times alr - exaggerate more
		else {
			var beside_wheel_str = `
			<iframe src="https://giphy.com/embed/rN2EZm3CSXHY1QoGrq" width="200" height="200" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/hills-pet-nutrition-science-diet-rN2EZm3CSXHY1QoGrq"></a></p>
			<div id="beside_wheel_text">
				<h4>OMG! You have spinned <b>${count_repeat} times</b> already!!!</h4> 
				Click the ✋ icon on the wheel to randomise your food choice!
				<br>
				Hope you will <span style = "color: #D54B73;">FINALLY</span> like the choice this time!
			</div>
			`;
		}
		
	}

	


	document.getElementById("wheeltextdiv").innerHTML = beside_wheel_str;

	count_repeat ++;
}

function randomCat(catArray){

	// get a random number
	var r = Math.floor(Math.random() * (catArray.length-1));

	//return link of random cat
	return catArray[r];
}

// Jewel - I commented this out because theres some error in this function that idk how to fix
// Haoyue - idk how to refer to the child elements of wheel... ;-; - realised that the wheel segments
// are spinning and no the images..lol

// function getRotation(){
//     var elements = document.getElementsByClassName("wheelIcon");

//     @for $i from 1 through 6 {
//         &:nth-child(#{$i}) {
          
//         }
//     console.log(elements);
//     alert('got elements')

//     var iconAngle = new Object();

// 		for (var i=0; i<elements.length; i++){

// 			var el = elements[i];
// 			var st = window.getComputedStyle(el, null);
// 			var tr = st.getPropertyValue("-webkit-transform") ||
// 					st.getPropertyValue("-moz-transform") ||
// 					st.getPropertyValue("-ms-transform") ||
// 					st.getPropertyValue("-o-transform") ||
// 					st.getPropertyValue("transform") ||
// 					"FAIL";
		
// 			// With rotate(30deg)...
// 			// matrix(0.866025, 0.5, -0.5, 0.866025, 0px, 0px)
// 			console.log('Matrix: ' + tr);
		
// 			// rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix
		
// 			var values = tr.split('(')[1].split(')')[0].split(',');
// 			var a = values[0];
// 			var b = values[1];
// 			var c = values[2];
// 			var d = values[3];
		
// 			var scale = Math.sqrt(a*a + b*b);
		
// 			console.log('Scale: ' + scale);
		
// 			// arc sin, convert from radians to degrees, round
// 			var sin = b/scale;
// 			// next line works for 30deg but not 130deg (returns 50);
// 			// var angle = Math.round(Math.asin(sin) * (180/Math.PI));
// 			var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
		
// 			console.log('Rotate: ' + angle + 'deg');

// 			iconAngle[el] = angle;
		
// 		}
//     console.log(iconAngle);
//     return iconAngle;
    
// 	}
// }


$(document).ready(function(){
	/*WHEEL SPIN FUNCTION*/
	$('#spin').click(function(){
		// reset counter each time user spin the wheel
		var mycounter = 0;

		//add 1 every click
		clicks ++;

		/*multiply the degree by number of clicks
	  generate random number between 1 - 360,
    then add to the new degree*/
		var newDegree = degree*clicks;

		console.log(newDegree);

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
					
				}

				// console.log(document.getElementsByClassName("sec"));

				var aoY = t.offset().top;
				$("#txt").html(aoY);

				// if counter is a multiple of 6 -- considering multiple spins
				if (mycounter == 6) {
					console.log("============ mycounter reached 6 ===============");

					console.log("aoY is", aoY);

					console.log("wheel html is here");
					console.log(document.getElementById("spin"));

					console.log("spin ends here");
					chosen_view();
				}

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

    // getRotation();
    // alert('got rotation')
    var chosen_cuisine = randomize(choiceArray);
    // alert('called randomise')
    console.log(chosen_cuisine);
	// insert text
	var msg = `
	<span class="fa text">${chosen_cuisine.icon}</span>
	<div id="beside_wheel_text">
		<h4>Yay😋</h4> 
		You are fated to eat <span  class="font-weight-bold">${chosen_cuisine.cuisine}</span> food!
	</div>
	<button type="button" class="btn" id="yes_button">Confirm cuisine and proceed</button>
	<button type="button" class="btn" id="no_button" onclick="repeatspin(choiceArray)">I don't want this! Choose again!</button>
	`;
	document.getElementById("wheeltextdiv").innerHTML = msg;

	console.log("=== CHOSEN_VIEW() ends ===");
}
