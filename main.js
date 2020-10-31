

//set default degree (360*5)
var degree = 1800;
//number of clicks = 0
var clicks = 0;

// Cat Array

var catArray = ["media/memes/bear_cat.jpg", "media/memes/cute_cat.jpg", "media/memes/dude_cat.jpg", "media/memes/frown_cat.jpg", "media/memes/grumpy_cat.jpg", "media/memes/polite_cat.jpg", "media/memes/shocked_cat.jpg", "media/memes/close_cat.jpg", "media/memes/halloween_cat.jpg", "media/memes/heart_cat.jpg", "media/memes/thumbsup_cat.jpg"];

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
		// console.log(option);
		filterstr += `
		<div class="form-check">
			<input type="checkbox" class="form-check-input" name="restrictions" value="${option}" id="${option}">
			<label class="form-check-label" for="${option}">${option}</label>
	  	</div>
		`;
		// console.log(filterstr);
	}
	filterstr += `
	<button type="button" class="btn text-nowrap" id="filter_button" onclick="getRestrictions()">Filter</button>
	`;

	// console.log(filterstr);

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
	document.getElementById("yelp_result").innerHTML = ''; 
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

		// console.log(newDegree);

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
					// console.log("===========================");
					// console.log("MY COUNTER:", mycounter);
					
				}

				// console.log(document.getElementsByClassName("sec"));

				var aoY = t.offset().top;
				// $("#txt").html(aoY);

				// if counter is a multiple of 6 -- considering multiple spins
				if (mycounter == 6) {
					// console.log("============ mycounter reached 6 ===============");

					// console.log("aoY is", aoY);

					// console.log("wheel html is here");
					// console.log(document.getElementById("spin"));

					// console.log("spin ends here");
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
	<button type="button" class="btn text-nowrap" id="yes_button" onclick=call_api("${chosen_cuisine.cuisine}")>Confirm cuisine and proceed</button>
	<button type="button" class="btn text-nowrap" id="no_button" onclick="repeatspin(choiceArray)">I don't want this! Choose again!</button>
	`;
	document.getElementById("wheeltextdiv").innerHTML = msg;

	console.log("=== CHOSEN_VIEW() ends ===");
	// console.log('test');
}

function getRestrictions(){
	// console.log("test");
    const restrictionsArr = [];
	var items = document.querySelectorAll('input[name="restrictions"]:checked');
	// console.log(items);

    for (item of items) {
		restrictionsArr.push(item.value);
		// console.log(item);
	}
	return restrictionsArr;
}


function call_api(cuisine){

	const country = 'singapore';
	const radius = '3000';
	const locale = 'en_SG';
	let restrictions = getRestrictions();
	// console.log(restrictions);
	// console.log(cuisine);
	let postal_code = document.getElementById('location').value;
	// console.log(postal_code);
	let API_KEY = "Jr3jT_un64Dlz67LnS7SWPFgd-U4dHn54djDo5laW_qsaVcyecReYcobd2QUYSdK4f2_FYfrx4kc41CavEwd8NIzXvp7G6DvPYXDfkSL9srtiwrgcyuoPnB0_JF0X3Yx";
	base_url = "https://api.yelp.com/v3/businesses/search?term=";
	url_with_cuisine = base_url + cuisine;

	// console.log(url_with_cuisine);

	if (restrictions.length != 0){
		for (restriction of restrictions){
			url_with_cuisine += "+" + restriction;
		}
	}

	// console.log(url_with_cuisine);

	url_with_location = url_with_cuisine + "&location=" + country;
	
	if (postal_code.trim() != ""){
		url_with_location += "+" + postal_code;
	}

	final_url = url_with_location + "&radius=" + radius + "&locale=" + locale;

	
	// console.log(final_url);

	axios.get(`${'https://cors-anywhere.herokuapp.com/'}${final_url}`, {
	headers: {
		Authorization: `Bearer ${API_KEY}`
	},
	params: {
		// categories: 'breakfast_brunch',
	}
	})
	.then((res) => {
		
		// console.log(res);
		display_data(res.data);
		
		
	})
	.catch((err) => {
		console.log ('error');
		alert('error - no food to specifications');
		//have to prompt a message like "sorry, no food with your specifications could be found"
	})

}

function display_data(data){
	// console.log(data);
	business_arr = data.businesses
	// console.log(business_arr);
	let selected_restaurant = randomize(business_arr);
	business_arr.pop(selected_restaurant);
	// console.log(business_arr);
	// console.log(selected_restaurant);
	var got_img = true;
	let id = selected_restaurant.id;
	let name = selected_restaurant.name;
	let image_url = selected_restaurant.image_url;
	// console.log(image_url);
	let yelp_url = selected_restaurant.url;
	let rating = selected_restaurant.rating;
	let address = selected_restaurant.location.address1;
	let postal_code = selected_restaurant.location.zip_code;
	let price = selected_restaurant.price;

	var star = "";
	if (image_url == ""){
		image_url = "media/no_food_sad_cat.jpg";
		var no_food_txt = "We could not find a picture of the food so here's a cat pic!";
		got_img = false;
	}
	
	// google maps
// 	let latitude = selected_restaurant.coordinates.latitude;
// 	let longitude = selected_restaurant.coordinates.longitude;

//    if (!image_url==""){
// 	   alert('call maps');
// 	   initMap(latitude, longitude);
// 	   alert('initmap done')
//    }
//    google maps end
	console.log(image_url);

	if (rating == 0){
		star = "media/yelp_stars/large_0.png";	
	} else if (rating == 1){
		star = "media/yelp_stars/large_1.png";
	} else if (rating == 1.5){
		star = "media/yelp_stars/large_1_half.png";
	} else if (rating == 2){
		star = "media/yelp_stars/large_2.png";
	} else if (rating == 2.5){
		star = "media/yelp_stars/large_2_half.png";
	} else if (rating == 3){
		star = "media/yelp_stars/large_3.png";
	} else if (rating == 3.5){
		star = "media/yelp_stars/large_3_half.png";
	} else if (rating == 4){
		star = "media/yelp_stars/large_4.png";
	} else if (rating == 4.5){
		star = "media/yelp_stars/large_4_half.png";
	} else if (rating == 5){
		star = "media/yelp_stars/large_5.png";
	}

	if (price == undefined){
		price = "Not Stated";
	}

	document.getElementById("yelp_result").innerHTML = ''; 

	document.getElementById("yelp_result").innerHTML += 
	`<img style="margin-top: 5%;" src="${image_url}" height="200" width="300"><br><br>`;

	if (got_img == false ){
		document.getElementById("yelp_result").innerHTML += no_food_txt + "<br>";
	}

	document.getElementById("yelp_result").innerHTML += 
	`<b>${name}</b><br>
	 <b>Rating</b><br>
	 <img src="${star}"><br>
	 <b>Price: ${price}</b><br>
	 <b>Address: ${address} Singapore ${postal_code}</b><br>
	 <button style="margin-top: 3%;" type="button" class="btn text-nowrap" id="yelp_button"><a href="${yelp_url}" target="_blank"><b>Go to Yelp</b></a></button><br>
	`

	;
}



// Initialize and add the map
// function initMap(latitude, longitude, name) {

// 	var api_results = document.getElementById("api_results");  
// 	api_results.innerHTML += `<div id="map" style = "width: 200px; height: 400px;"></div>`;
	
// 	const myLocation = { lat: latitude, lng: longitude };
// 	console.log(myLocation);
// 	// The map, centered at myLocation
// 	const map = new google.maps.Map(document.getElementById("map"), {
// 	zoom: 10,
// 	center: myLocation,
// 	});
// 	// The marker, positioned at myLocation
// 	const marker = new google.maps.Marker({
// 	position: myLocation,
// 	map: map,
// 	draggable: false
// 	});

// 	var information = new google.maps.InfoWindow();
// 	infoWindow.setPosition(myLocation);
// 	infoWindow.setContent(`${name}is here!`);
// 	infoWindow.open(map);
// 	map.setCenter(myLocation);

// 	marker.addListener('click', function() {
// 		information.open(map, marker);
// 	});

// 	// var information = new google.maps.InfoWindow({
// 	// 	content: `<h4>${name} is here!</h4>`
// 	// 	});
		

//   }