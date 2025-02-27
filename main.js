/*

A SUMMARY OF THE FUNCTIONS IN THIS JS FILE
============================================================

FORM PART

1. guest_user() function 
	- This is called when user clicks on 'Continue as a guest' button
	- What it does:
		-> auto-scroll user to the 'How hungrymao's randomiser works' section

2. login_user() function 
	- This is called when user clicks on 'Help me decide again' button
	- What it does:
		-> validate login details
		-> if all successful, auto-scroll user to the 'How hungrymao's randomiser works' section

=================================================================================================

WHEEL INFORMATION

1. default_wheel() function 
	- This is called when page loads
	- What it does:
		-> Display the randomiser wheel

2. default_view(username='') function 
	- This is called by guest_user() OR login_user() function; it is also displayed onload
	- What it does:
		-> Display food restriction options
			- When user clicks 'Filter' button, it leads to getRestrictions() function
		-> Display wheel icons
		-> Display text beside wheel

3. $(document).ready(function()... (approx line 272-360)
	- This allows wheel to spin properly when user clicks on the middle of the wheel
	- If this is a repeated spin, it calls repeatspin() function

=================================================================================================

USE GEOLOCATION API

1. initMap() function
	- if can retrieve location -> call getLocation() function
	- else, call 
		a. handleLocationError() function
		b. manual_geo() function

2. handleLocationError() function
	- call manual_geo() function

3. manual_geo() function 
	- tell user in 'current_location' div that you cannot find location
	- user has to input manually

4. geolocate() function

5. onGeolocateSuccess() function

6. onGeolocateError() function
	- call manual_geo() function

7. getLocation() function
	- make xhttp request from API
	- if successful -> retrieve postal code, then store in global variable global_postal_code
	- else -> call manual_geo()

8. getPostCode() function

9. postcodeHelper() function

=================================================================================================
AFTER USER FILL IN POSTAL CODE AND CLICK "FIND ME FOOD"

1. validate_postal() function
	- perform validation on postal code
	- 3 types of errors:
		a. input is empty
		b. input is Not a Number
		3. input is not 6 digits (aka invalid)
	- displays errors to user so that user retype postal code

=================================================================================================
AFTER USER SPINS WHEEL 

**FOR FIRST TIME**

1. chosen_view() function
	- This is called when wheel stops
	- What it does:
		-> calls randomize(choiceArray) function which randomizes a cuisine
		-> Displays the chosen cuisine and some text for user
		-> 2 buttons
			- 'Confirm cuisine and proceed' -> call_api(cuisine)
			- 'I dont want this! Choose again!'

** FOR REPEATED SPINS**

1. repeatspin() function 
	- This is called when wheel stops
	- What it does:
		-> similar to chosen_view() function but it shows user different text bc they are so indecisive :')

=================================================================================================

RETRIEVE FOOD RESTRICTIONS

1. getRestrictions() function 
	- What it does:
		-> retrieve user's restrictions and stores it for later use in call_api()

=================================================================================================

RETRIEVE API FROM YELP 

1. call_api(cuisine) function 
	- What it does:
		-> Retrieve a restaurant which fits the following criteria:
			a. User's food restrictions
			b. Within 3000 radius of user's location

2. select_restaurant() function 
	- What it does:
		-> Chooses a restaurant from the returned list from api
=================================================================================================

OTHERS

1. show_restaurant_data() function
	- What it does:
		-> Display these information:
			1. Photo
			2. Name 
			3. Rating (with the stars)
			4. Price Range
			5. Address
			6. Link to Yelp 

2. food_selected() function 
	- What it does:
		-> Alert user that they have found food when they click "yes" button

3. no_more_food() function 
	- What it does:
		-> Alert user that they have exhausted all food options
=================================================================================================
*/
// global username & pw

// var username = document.getElementById('username').value;
// var password = document.getElementById('password').value;
// alert(`user is ${username} ${password}`);
//fill in the page before form


// FORM part - username and password

// Scenario 1: User clicks 'Continue as guest' button
function guest_user() {
	// auto-scroll to the 'how it works' section
	document.getElementById('pink_container').scrollIntoView();
	// call default_view function
	var username = '';
	// console.log(`username is ${username}`)

	default_view(username);
	return false;
}

// Scenario 2: User clicks 'Help me decide again' button
function login_user(username, password) {
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	var errorstring = '';

	// Error 1: Empty user or pw
	if ( username == '' || password == '') {
		// console.log("Username / Password is empty!!");
		errorstring += "Your username/password is empty!";
	}

	// Error 2: Filled but Wrong password 
	else if ( password != '' && password != 'opensesame' ) {
		// show the placeholder again
		document.getElementById('password').value = '';
		document.getElementById('password').setAttribute("placeholder", "(hint: it's opensesame)");

		errorstring += "Wrong Password! Refer to the hint!";

	}

	// NO ERRORS YAYYY
	else {
		// reset login-errors div to empty
		document.getElementById("login-errors").innerText = '';
		// call default_view function
		// console.log(`username is ${username}`);
		var usernamestring = " " + username;
		default_view(usernamestring);

		// auto-scroll to 'How it Works' section 
		document.getElementById('pink_container').scrollIntoView();
		return false;
	}

	// Have Error 
	if ( errorstring != '' ) {
		document.getElementById("login-errors").innerHTML = `<b class="animate__animated animate__flash text-danger">${errorstring}</b>`;
	}

	return false;
}
// ============== F O R M   V A L I D A T I O N   I S   C O M P L E T E ===================

//SOME GLOBAL VARIABLES

var cuisine = '';
var restaurant_objects = '';
var count_repeat = 1;
var r_count = 0;
var selected_restaurant = '';
var restaurant_length = 0;
//set default degree (360*5)
var degree = 1800;
//number of clicks = 0
var clicks = 0;


// Cat Array

var catArray = ["media/memes/bear_cat.jpg", "media/memes/cute_cat.jpg", "media/memes/dude_cat.jpg", "media/memes/frown_cat.jpg", "media/memes/grumpy_cat.jpg", "media/memes/polite_cat.jpg", "media/memes/shocked_cat.jpg", "media/memes/close_cat.jpg", "media/memes/halloween_cat.jpg", "media/memes/heart_cat.jpg", "media/memes/thumbsup_cat.jpg"];

//set eventlistener if id exists

// var round_button_no = document.getElementById("round_button_no");
// if (round_button_no){
// 	round_button_no.addEventListener("click", function(){
// 		show_restaurant_data();
// 	});
// 	round_button_no.onclick = function(){
// 		alert(1);
// 	}
// }



// Part 1: Wheel Info - cuisines and relevant icons

var choiceArray = [
    {"cuisine" : "Chinese", "icon": '<img src="media/wheel_icons/chinese.png" height="50" width="50">' }, 
    {"cuisine" : "Korean", "icon": '<img src="media/wheel_icons/korean.png" height="50" width="50">' }, 
    {"cuisine" : "Japanese", "icon": '<img src="media/wheel_icons/japanese.png" height="50" width="50">' }, 
    {"cuisine" : "Italian", "icon": '<img src="media/wheel_icons/italian.png" height="50" width="50">' }, 
    {"cuisine" : "Indian", "icon": '<img src="media/wheel_icons/indian.png" height="50" width="50">' }, 
    {"cuisine" : "Mexican", "icon": '<img src="media/wheel_icons/mexican.png" height="50" width="50">' }, 
];

var catArrayForWheel = ['<img src="media/wheel_icons_cats/black_cat.png" height="50" width="50">',
						'<img src="media/wheel_icons_cats/brown_cat.png" height="50" width="50">',
						'<img src="media/wheel_icons_cats/cat_with_yarn.png" height="50" width="50">',
						'<img src="media/wheel_icons_cats/grey_cat.png" height="50" width="50">',
						'<img src="media/wheel_icons_cats/orange_cat.png" height="50" width="50">',
						'<img src="media/wheel_icons_cats/yellow_cat.png" height="50" width="50">' 					
];

const filterArray = ["vegetarian", "halal", "vegan"];

// Filter, Wheel
/* Jewel - my rationale for this new function

	i separate the wheel and its icons part from default_view function
	because when page loads, i want to SHOW THE FULL WHEEL but i dont want to show the text!!!
	When page loads, user HAS NOT logged in / continue as guest so i cannot retrieve the username, thats why idw to call default view
	So now i split wheel part into this new function
*/	
function default_wheel() {
	// document.getElementById("current_location").innerHTML = 
	// `
	// 	<h3>Current Location</h3> 
    //     <input type="text" name="location" id="location" placeholder="633702">
	// `;

	// document.getElementById("inner-spin").innerHTML = 
	// `
	// 	<img src='../is216-Project/media/damnhungry_cat.png' height='55' width='55'>
	// `;

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
	for (var catpic of catArrayForWheel) {
		wheelstr += `
		<div class="sec">
			<span class="fa text wheelIcon">
				${catpic}
			</span>
		</div>
			`;
	}
	// Part 2: Wheel - add cuisines into wheel html
	document.getElementById("inner-wheel").innerHTML = wheelstr;

}

// Text beside wheel
function default_view(myUsername) {

	// Part 3: Text beside the wheel

	var beside_wheel_str = `
	
	<div id="beside_wheel_text">
		<img src="media/gifs/meow.gif" style = "width: 40%;"></img>
		<h4>Welcome${myUsername}!</h4> 
		Click the middle of the wheel to randomise your food choice!
	</div>
	`;

	document.getElementById("wheeltextdiv").innerHTML = beside_wheel_str;

}

// my audio for wheel
var audio = new Audio();
audio.src = "media/nyan_cat.mp3";
audio.preload = "auto";

// my wheel
$(document).ready(function(){
	/*WHEEL SPIN FUNCTION*/
	// when user clicks the greedy cat which is inside the div with 'spin' id
	$('#spin').click(function(){
		// reset counter each time user spin the wheel
		var mycounter = 0;

		// play my cat music
		audio.src = "media/nyan_cat.mp3";
		audio.preload = "auto";
		audio.play();

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

				// if counter is a multiple of 6 -- considering 6 of 360degree spins
				// this is when the wheel stops spinning
				if (mycounter == 6) {
					// console.log("aoY is", aoY);
					// console.log("spin ends here");

					// stop nyancat and celebrate
					// console.log(Date())
					// console.log("========================================")
					// console.log("STOP MY MUSIC!!!!")

					// stop nyan cat
					audio.pause();
					// change source to celebrate.mp3
					audio.src = "media/celebrate.mp3";
					// play celebrate.mp3
					audio.play();
				

					chosen_view();
				}

				/*23.7 is the minumum offset number that
				each section can get, in a 30 angle degree.
				So, if the offset reaches 23.7, then we know
				that it has a 30 degree angle and therefore,
				exactly aligned with the spin btn*/
				if(aoY < 23.89){
					// console.log('<<<<<<<<');
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

//==============================================================================
// Geolocation API

var global_postal_code = "";

function initMap(postal_code) {
	// alert('in initmap');
	
	if (navigator.geolocation) {
		
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			}; // -> this pos value is used to extract user's postal code 

			// console.log(pos);
			
			
			// Step 4 (if user chooses Allow)
			// get postal code (& address) given lat, lng
			
			getLocation(pos);
			
		

	
		});
	} else { // error handling
		// Browser doesn't support Geolocation
		// handleLocationError(false, infoWindow, map.getCenter());
		console.log(" Browser doesn't support Geolocation");
		manual_geo();
		// handleLocationError();
	}
}


// } 

// Step 4 (if user chooses Block)
function handleLocationError() {
	console.log("Error: Geolocation service failed!");
	manual_geo();
}

//let user key in postal code if geolocation fails

function manual_geo(){
	document.getElementById('postal_stuff').innerHTML = `                
	<h4>
		We couldn't find your location, so please key in your postal code
	</h4> 
	<input type="text" name="location" id="location" placeholder="633702">
	<br>
	<button class="btn" id="validate_button" onclick="validate_postal()">Find my food!!</button>

	`;
}


  var googleAPIKey = "AIzaSyCqEH558hbj5Du9-80nKZsP9GJARaYmJug";

  function getLocation(pos) {
       
	var addr =  pos.lat + ", " + pos.lng;
	// console.log(addr);
	var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + addr + "&key=" + googleAPIKey;
	var xhttp = new XMLHttpRequest();
	var postal_code = "";
	xhttp.onreadystatechange = function() {
		// console.log(`${this.readyState},${this.status}`);
		if (this.readyState == 4 && this.status == 200) {
			// following code may throw error if user input is invalid address
			// so we use try-catch block to handle errors
			try { 
				// expected response is JSON data
				var data = JSON.parse(this.responseText);
				// console.log(data);
				postal_code = getPostCode(data); // Retrieve postal code
				// alert('got postal code');
				// console.log("Postal Code: " + postal_code);
				
				
				if(postal_code=="") {
					console.log("can't get location")
					// handleLocationError();
				} else {
					// alert('got location')
				}
			   
			} catch(err) { // show error message
				
				console.log("can't get location")
				//handleLocationError();
				manual_geo();
			}
		}
		if (postal_code != true){
			// alert(`postal code is ${postal_code}`);
			global_postal_code += postal_code;
			document.getElementById("location").setAttribute("placeholder", global_postal_code);
			// console.log(`global postal code is ${global_postal_code}`);
			return postal_code;
		}


		
	};
	
	xhttp.open("GET", url, true);
	xhttp.send();
}
function getPostCode(data) {
	//console.log('in getPostCode')
	//console.log(data)
	var addrcomponents = data["results"][0]["address_components"];
	var postal_code = addrcomponents.filter(postcodeHelper);
	// country is an array but there should be only one element
	// console.log(postal_code)
	return postal_code[0]["long_name"];
}

function postcodeHelper(addr) {  
	return addr["types"][0] == "postal_code" ;
}


// =========================================================================================

// Validate user's postal code
function validate_postal(my_postalcode) {
	my_postalcode = document.getElementById("location").value;
	// console.log(my_postalcode);
	var invalid_str = '';
	// empty of full of white space
	if (my_postalcode.trim() == '') {
		invalid_str = `
		<b class="animate__animated animate__flash text-danger">
				Postal code is empty!
				<br>
				Please help hungrymao find the right place!
		</b>`;
	}
	// not a number
	else if (isNaN(my_postalcode)) {
		invalid_str = `
			<b class="animate__animated animate__flash text-danger">
				Postal code should be a number!
				<br>
				Please help hungrymao find the right place!
			</b>`;
	}
	// invalid postal code
	else if (my_postalcode.length != 6) {
		invalid_str = `
			<b class="animate__animated animate__flash text-danger">
				Oh no! Doesn't look like a postal code!
				<br>
				Please help hungrymao find the right place!
			</b>`;
	}
	// postal code is valid
	else {
		invalid_str = `
			Yay! Hungrymao is satisfied with your postal code!`;
	}
	document.getElementById("invalid_postal").innerHTML = invalid_str;
}

// =========================================================================================
function randomize(choiceArray){
	var i = Math.floor(Math.random() * (choiceArray.length));
	// console.log(i);
    return choiceArray[i];
}


function chosen_view() {
	// console.log("=== CHOSEN_VIEW() starts ===");

    // getRotation();
    // alert('got rotation')
    var chosen_cuisine = randomize(choiceArray);
	cuisine = chosen_cuisine.cuisine;
    // alert('called randomise')
    // console.log(chosen_cuisine);
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

	// console.log("=== CHOSEN_VIEW() ends ===");
	// console.log('test');
}


// This function is called when user chooses the "I dont want this cuisine!!" button
function repeatspin(choiceArray) {
	document.getElementById("happycat").innerHTML = '';

	if (document.getElementById("yelp_result")){
		document.getElementById("yelp_result").innerHTML = ''; 
	}
	
	r_count = 0;
	// document.getElementById("alert_").innerHTML = ''; 
	// document.getElementById("alert").innerHTML = ''; 
	var wheelstr = '';
	for (var catpic of catArrayForWheel) {
		wheelstr += `
		<div class="sec">
			<span class="fa text wheelIcon">
				${catpic}
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
		// console.log("You have spinned " + count_repeat + " times!!!!");
		var beside_wheel_str = `
		<img src="media/gifs/white.gif" style = "width: 40%;"></img>
		<div id="beside_wheel_text">
			<h4>You choose to spin again!</h4> 
			Click the middle of the wheel to randomise your food choice!
			<br>
			Hope you will like the choice this time!
			</br>p.s. hungrymao is very dizzy!🥺 
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
				Click the middle of the wheel to randomise your food choice!
				<br>
				Hope you will like the choice this time!
				</br>p.s. hungrymao is very dizzy!🥺 
			</div>
			`;
		}
		// 5 times alr - exaggerate more
		else {
			var beside_wheel_str = `
			<iframe src="https://giphy.com/embed/rN2EZm3CSXHY1QoGrq" width="200" height="200" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/hills-pet-nutrition-science-diet-rN2EZm3CSXHY1QoGrq"></a></p>
			<div id="beside_wheel_text">
				<h4>OMG! You have spinned <b>${count_repeat} times</b> already!!!</h4> 
				Click the middle of the wheel to randomise your food choice!
				<br>
				Hope you will <span style = "color: #D54B73;">FINALLY</span> like the choice this time!
				</br> p.s. hungrymao is very dizzy!🥺 
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


function getRestrictions(){
	document.getElementById('all_wheel_stuff').scrollIntoView();

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

// var api_here = false;

// function loading(){

// 		document.getElementById("api_results").innerHTML = `
// 		<img class = "mx-auto" src="media/gifs/loading.gif" style = "width: 60%;"></img>
// 		`;
// };




function call_api(cuisine){
	
	var api_retrieved = false;

	// show the pink div only when api is called, if not theres a weird pink part initially when theres nth inside
	document.getElementById("api_results").style.backgroundColor = '#FDE6E6';

	
	document.getElementById("loadcat").innerHTML = `
		<img src="media/loading_cat.gif" height="100" width="100">
		<br>
		<p style="vertical-align:bottom; color:#56713A;">Hungrymao is finding a restaurant. . . . . .</p>
	`;
	// console.log(document.getElementById("loadcat").innerHTML);

	// console.log(Date());

	const country = 'singapore';
	const radius = '3000';
	const locale = 'en_SG';
	let restrictions = getRestrictions();
	// console.log("Restrictions:", restrictions);
	// console.log("Cuisine",cuisine);
	
	let postal_code = document.getElementById('location').value;
	if (postal_code == ""){
		postal_code = global_postal_code;
		// console.log(postal_code);
		// console.log(global_postal_code);
	}
	// console.log("Postal Code:", postal_code);


	//gerry's key
	let API_KEY = "Jr3jT_un64Dlz67LnS7SWPFgd-U4dHn54djDo5laW_qsaVcyecReYcobd2QUYSdK4f2_FYfrx4kc41CavEwd8NIzXvp7G6DvPYXDfkSL9srtiwrgcyuoPnB0_JF0X3Yx";
	//haoyue's key
	// let API_KEY = "ecoDlzYBGkeG6bfeg8T0hm4cwLDDvkU1CIPt6r7PAkOG90utpmbN6wjsXrMA4gj6QV3hG-dwo70InJCLU5nsg7c2-AA090ZOfjBlHlzl6tzw8aRkUrnW8d-6m6OX3Yx";

	// console.log(API_KEY);
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

	axios.get(`${'https://cors-anywhere.herokuapp.com/'}${final_url}`, 
	{
		headers: {
			Authorization: `Bearer ${API_KEY}`
		},
		// params: {
		// 	// categories: 'breakfast_brunch',
		// }
	})
	.then((res) => {
		document.getElementById("api_results").scrollIntoView();
		// console.log("i am inside .then res");
		// console.log(res);

		//API json response
		// console.log(res.data.businesses)
		restaurant_objects = res.data.businesses;
		// console.log(restaurant_objects);
		// return restaurant_objects;
		// api_here = true;
		// console.log(document.getElementById("my_cats").innerHTML);

		// remove loading cat when food is retrieved
		document.getElementById("loadcat").innerHTML = '';
		// console.log(document.getElementById("loadcat").innerHTML);
		// console.log(document.getElementById("api_results").innerHTML);
		// document.getElementById("api_results").innerHTML = `
		// 	<img src="media/gifs/happy.gif" height="100" width="100" style="position: absolute; bottom: 0; left: 40px;">
		// `;; 

		// remove all yellow alerts and happy cat when user find food again
		document.getElementById("happycat").innerHTML = '';

		document.getElementById("alerts_").innerHTML = '';
		document.getElementById("alerts").innerHTML = '';

		select_restaurant(restaurant_objects);
		// display_data(restaurant_objects);
		
		
	})
	.catch((err) => {
		// console.log ('error');
		// alert('error - no food to specifications');
		if (err.response) {
			console.log(err.response.status);
		}
		
		document.getElementById("alerts_").innerHTML = '';
		document.getElementById("alerts").innerHTML = '';
		document.getElementById("alerts").innerHTML += 
		`<div class="alert alert-warning alert-dismissible fade show" role="alert">
			<strong>Oh no! hungrymao could not find any food matching your specifications.</strong> Hint: sometimes too many restrictions could starve poor mao. Maybe try again!
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
		  		<span aria-hidden="true">&times;</span>
			</button>
		</div>
		`;
	})
	// 	//tried to add vid in alert but it's not really necessary 
	// 	// <br>
	// 	// <video width="300" height="200" autoplay="autoplay">
	// 	// 	<source src="media/sad_cat.mp4" type="video/mp4" />
	// 	// </video>

	// 	//have to prompt a message like "sorry, no food with your specifications could be found"
	// })

}




// function display_data(restaurant_objects, r_count, selected_restaurant)
function select_restaurant(restaurant_objects){
	


	// alert('in display_data')
	
	if (restaurant_objects.length > 10){
		restaurant_objects.length = 10;
	}
	restaurant_length = restaurant_objects.length;
	// console.log(restaurant_length);
	// console.log(restaurant_objects);
	// alert('10 objects retrieved in display_data');
	// console.log(r_count);


	// //remove first restaurant of ten
	// let selected_restaurant = restaurant_objects.shift();
	
	

	// if (continue_display && count< restaurant_objects.length){
	if (r_count >= restaurant_length - 1){
		r_count = restaurant_length - 1;
		no_more_food();
	} 

	selected_restaurant = restaurant_objects[r_count];
	// console.log(selected_restaurant);
	// console.log(r_count);

	// show_restaurant_data(selected_restaurant, r_count);
	show_restaurant_data();
	// return selected_restaurant;
	// }

}

function show_restaurant_data(){
	// alert('in show_restaurant_data')
	// console.log('selected restaurant in srd')
	// console.log(selected_restaurant);
	r_count += 1;
	// console.log(r_count);
	// console.log(image_url);
	var got_img = true;
	let id = selected_restaurant.id;
	let name = selected_restaurant.name;
	let image_url = selected_restaurant.image_url;
	let yelp_url = selected_restaurant.url;
	let rating = selected_restaurant.rating;
	let address = selected_restaurant.location.address1;
	let postal_code = selected_restaurant.location.zip_code;
	let price = selected_restaurant.price;

	// alert(`this is ${price}`)
	
	var star = "";
	if (image_url == ""){
		image_url = "media/no_food_sad_cat.jpg";
		var no_food_txt = "We could not find a picture of the food so here's a cat pic!";
		got_img = false;
	}

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

	 
	var str = document.getElementById("yelp_result").innerHTML = '';
	// document.getElementById("yelp_result").innerHTML += 
	// `
	// 	<button type="button" class="btn btn-circle btn-lg" id="no_thanks" style="margin-top: 5%;"></button><br>
	// `;
	str += 
	`<div class="row mt-4 mb-2">
		<div class="col-md-6 my-auto">
			<p class="text-left"><b>hungry</b>mao <em>suggests</em><br></p>`;
	// next/ yes buttons

	// alert(cuisine);
	str+= 
	`
		<img src='media/buttons/next.svg' class="animate__animated animate__bounce mt-2 mb-2" id="round_button_no" onclick=call_api("${cuisine}") style="margin-top: 5px; width: 20%;"></img>
		
		<img src='media/buttons/yes.svg' class="animate__animated animate__bounce mt-2 mb-2" id="round_button_yes" onclick=food_selected() style="margin-top: 5px; width: 20%;"></img></br>
	`;
	
	// document.getElementById("round_button_no").addEventListener("click", function(){
	// 	show_restaurant_data();
	// });


	str += 
	`<img src="${image_url}" height="200" width="300"><br><br>`;

	if (got_img == false ){
		str += no_food_txt + "<br>";
	}
	
	str += 
	`	</div>
		<div class="col-md-6 my-auto pb-4">
			<h4 class="mb-3 font-weight-bold">${name}</h4>
			<b>Rating</b><br>
			<img src="${star}"><br>
			<b>Price: ${price}</b><br>
			<b>Address: ${address} Singapore ${postal_code}</b><br>
			<button style="margin-top: 5%;" type="button" class="btn text-nowrap" id="yelp_button"><a href="${yelp_url}" target="_blank"><b>Go to Yelp</b></a></button><br>
		</div>
	</div>
	`;
	document.getElementById("yelp_result").innerHTML = str;
	// console.log(document.getElementById("yelp_result").innerHTML)
	// return count;
	// document.getElementById('yelp_results').scrollIntoView();
	
	// display happy cats 
	document.getElementById("happycat").innerHTML = `
		<div class="row">
			<div class="col">
				<img src="media/gifs/happy.gif" height="100" width="100" style="text-align:left;">
				<img src="media/gifs/happy.gif" height="100" width="100" style="text-align:left;">
				<img src="media/gifs/happy.gif" height="100" width="100" style="text-align:left;">
			</div>
		</div>
		`;
	// console.log(document.getElementById("happycat").innerHTML);

}


function food_selected(continue_display){
	continue_display = false;
	document.getElementById("alerts_").innerHTML = '';
	document.getElementById("alerts_").innerHTML += 
	`
	<div class="alert alert-success alert-dismissible fade show" role="alert">
		<strong>You have found food! Hope you enjoy it!</strong>
		<button type="button" class="close" data-dismiss="alert" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
	</div>
	`;
}

function no_more_food(){
	document.getElementById("alerts_").innerHTML = '';
	document.getElementById("alerts_").innerHTML += 
	`
	<div class="alert alert-warning alert-dismissible fade show" role="alert">
		<strong>There's no more food!</strong> Maybe this cuisine is just not for you... try again with another cuisine?
		<button type="button" class="close" data-dismiss="alert" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
	</div>
	`;
}

// function fill_data_again(){

// }

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

	// google maps
// 	let latitude = selected_restaurant.coordinates.latitude;
// 	let longitude = selected_restaurant.coordinates.longitude;

//    if (!image_url==""){
// 	   alert('call maps');
// 	   initMap(latitude, longitude);
// 	   alert('initmap done')
//    }
//    google maps end

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
