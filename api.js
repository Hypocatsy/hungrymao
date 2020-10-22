//maybe we can use axios? <script src="https://unpkg.com/axios/dist/axios.min.js"></script>


// Yelp API


//Header:
// Key: Authorization
// Value: Bearer _ecoDlzYBGkeG6bfeg8T0hm4cwLDDvkU1CIPt6r7PAkOG90utpmbN6wjsXrMA4gj6QV3hG-dwo70InJCLU5nsg7c2-AA090ZOfjBlHlzl6tzw8aRkUrnW8d-6m6OX3Yx


// Mexican + Halal
// https://api.yelp.com/v3/businesses/search?term=mexican+halal&location=singapore
//Example JSON response

// {
//     "id": "yNHd99TxJZcrUYGGQNDtUg",
//     "alias": "afterwit-singapore-2",
//     "name": "Afterwit",
//     "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/5G5HwSQnZHheJGF2cS6pDA/o.jpg",
//     "is_closed": false,
//     "url": "https://www.yelp.com/biz/afterwit-singapore-2?adjust_creative=HZOe14TfcZQRNBg8AC4NQg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=HZOe14TfcZQRNBg8AC4NQg",
//     "review_count": 5,
//     "categories": [
//         {
//             "alias": "cafes",
//             "title": "Cafes"
//         },
//         {
//             "alias": "mexican",
//             "title": "Mexican"
//         },
//         {
//             "alias": "halal",
//             "title": "Halal"
//         }
//     ],
//     "rating": 4.0,
//     "coordinates": {
//         "latitude": 1.30354,
//         "longitude": 103.85992
//     },
//     "transactions": [],
//     "price": "$$",
//     "location": {
//         "address1": "778 North Bridge Rd",
//         "address2": null,
//         "address3": "",
//         "city": "Singapore",
//         "zip_code": "198746",
//         "country": "SG",
//         "state": "SG",
//         "display_address": [
//             "778 North Bridge Rd",
//             "Singapore 198746",
//             "Singapore"
//         ]
//     },
//     "phone": "+6562993508",
//     "display_phone": "+65 6299 3508",
//     "distance": 1704.9651647201476
// },

//Japanese and within 1km of SMU (postal code 178903) and open now
//https://api.yelp.com/v3/businesses/search?term=japanese&location=singapore+178903&radius=2000&open_now=true


//Call getFinalUrl(base_url) to get final Url

function getRestrictions(){

    var restrictionsArr = [];
    var items = document.querySelectorAll('input[type=checkbox]:checked')

    for (var i = 0; i < items.length; i++) {
        restrictionsArr.push(items[i].value);
    }
    return restrictionsArr;
}


function getFinalUrl(base_url){

    var restrictionsArr = getRestrictions();

    var chosen_cuisine = randomize(choiceArray);

    final_url = base_url.concat('', chosen_cuisine);

    restrictionsArr.forEach(restriction => {
        
        final_url.concat('+',restriction);
    });

    var postal_code = document.getElementById('location').value;

    final_url.concat('&',`location=singapore+${postal_code}&radius=2000&open_now=true`);

    return final_url;
}




function business_search_yelp_api(){
	// https://www.yelp.com/developers/documentation/v3/business_search (click for documentation)
    // Step 1
    var request = new XMLHttpRequest();

    // Step 2
    // Register function
    request.onreadystatechange = function() {
        // Step 5
        if( request.readyState == 4 && request.status == 200 ) {
            // Response is ready
           
            var json_obj = JSON.parse(request.responseText);

        }

    }

	// Step 3
	var base_url = "https://api.yelp.com/v3/businesses/search"; 
	var final_url = base_url + ""; //many things like terms, long/lat...
    
    request.open("GET", final_url, true); // Asynch

    // Step 4
    request.send();	
}

function autocomplete_yelp_api(){
	// https://www.yelp.com/developers/documentation/v3/autocomplete (click for documentation)
    // Step 1
    var request = new XMLHttpRequest();

    // Step 2
    // Register function
    request.onreadystatechange = function() {
        // Step 5
        if( request.readyState == 4 && request.status == 200 ) {
            // Response is ready
           
            var json_obj = JSON.parse(request.responseText);

        }

    }

	// Step 3
	var final_url = "https://api.yelp.com/v3/autocomplete"; 
    
    request.open("GET", final_url, true); // Asynch

    // Step 4
    request.send();	
}

function business_id_yelp_api(id){
	// https://www.yelp.com/developers/documentation/v3/business (click this for documentation)
    // Step 1
    var request = new XMLHttpRequest();

    // Step 2
    // Register function
    request.onreadystatechange = function() {
        // Step 5
        if( request.readyState == 4 && request.status == 200 ) {
            // Response is ready
           
            var json_obj = JSON.parse(request.responseText);

        }

    }

	// Step 3
	var base_url = "https://api.yelp.com/v3/businesses/"; //{id}
    var final_url = base_url + "";
    
    request.open("GET", final_url, true); // Asynch

    // Step 4
    request.send();	
}