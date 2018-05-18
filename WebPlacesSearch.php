<?php
header('Content-type:text/html; charset=utf-8;');
header("Access-Control-Allow-Origin: *");
    if (!isset($_GET["placeid"])){
		if (isset($_GET["keyword"])&&isset($_GET["category"])&&isset($_GET["distance"])){
			if (isset($_GET["texts"])){
				$keyword = $_GET["keyword"];
		        $category = $_GET["category"];
		        $distance = $_GET["distance"];
		        $location = $_GET["texts"];
		        $api_key = "AIzaSyAnllJfkKzExzoAE9YmhfSK8itd_w30Rwo";
		        $prekeyword = str_replace(' ', '+', $keyword);
		        $prelocation = str_replace(' ', '+', $location);
		        $precategory = str_replace(' ', '+', $category);

		        $geocode = file_get_contents('https://maps.googleapis.com/maps/api/geocode/json?address='.$prelocation.'&key='.$api_key);
		        $locoutput = json_decode($geocode);
		        $loclat = ($locoutput->results[0]->geometry->location->lat);
		        $loclong = ($locoutput->results[0]->geometry->location->lng);
		        $locaddress = ($locoutput->results[0]->formatted_address);

		        $nearcode = file_get_contents('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='.$loclat.','.$loclong.'&radius='.$distance.'&type='.$precategory.'&keyword='.$prekeyword.'&key='.$api_key);
		        echo $nearcode;
		        return null;
			}
			else if(isset($_GET["herelat"])&&isset($_GET["herelong"])){
				$keyword = $_GET["keyword"];
		        $category = $_GET["category"];
		        $distance = $_GET["distance"];
		        $loclat = $_GET["herelat"];
		        $loclong = $_GET["herelong"];
		        $api_key = "AIzaSyAnllJfkKzExzoAE9YmhfSK8itd_w30Rwo";
		        $prekeyword = str_replace(' ', '+', $keyword);
		        $precategory = str_replace(' ', '+', $category);
		        $nearcode = file_get_contents('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='.$loclat.','.$loclong.'&radius='.$distance.'&type='.$precategory.'&keyword='.$prekeyword.'&key='.$api_key);
		        echo $nearcode;
		        return null;
			}
	    }
	    else if(isset($_GET["pagetoken"])){
	    	$pagetoken = $_GET["pagetoken"];
	    	$api_key = "AIzaSyAnllJfkKzExzoAE9YmhfSK8itd_w30Rwo";
		    $detcode = file_get_contents('https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken='.$pagetoken.'&key='.$api_key);
		    echo $detcode;
		    return null;
	    }
    }
    else{
    	if(isset($_GET["yelp"])){
	    	$placeid = $_GET["placeid"];
		    $api_key = "AIzaSyAnllJfkKzExzoAE9YmhfSK8itd_w30Rwo";
		    $detcode = file_get_contents('https://maps.googleapis.com/maps/api/place/details/json?placeid='.$placeid.'&key='.$api_key);
		    $detoutput = json_decode($detcode);
		    $name = $detoutput->result->name;
		    for ($i=0; $i<sizeof($detoutput->result->address_components); $i++){
		    	if ($detoutput->result->address_components[$i]->types[0]=="locality"){
		    		$city = $detoutput->result->address_components[$i]->short_name;
		    	}
		    	else if ($detoutput->result->address_components[$i]->types[0]=="administrative_area_level_1"){
		    		$state = $detoutput->result->address_components[$i]->short_name;
		    	}
		    	else if ($detoutput->result->address_components[$i]->types[0]=="country") {
		    		$country = $detoutput->result->address_components[$i]->short_name;
		    	}
		    }
		    $latitude = $detoutput->result->geometry->location->lat;
		    $longitude = $detoutput->result->geometry->location->lng;
		    $prename = str_replace(' ', '+', $name);
		    $precity = str_replace(' ', '+', $city);
		    $prestate = str_replace(' ', '+', $state);
		    $precountry = str_replace(' ', '+', $country);
		    $yelpmatch = 'https://api.yelp.com/v3/businesses/matches/lookup?name='.$prename.'&city='.$precity.'&state='.$prestate.'&country='.$precountry.'&latitude='.$latitude.'&longitude='.$longitude;
		    $options = [
		    	'http'=> [
		    		'method' => "GET",
		    		'header' => "Authorization: Bearer vLKhyzxTPRdTX1NTrC_qSEjE6w1YfbxQRo5rWIxYw3FuZtJa1BLfDoK_3Di_UMHgvKFqAlTFlELyEAWwh5-tOOu3GeyMjTSJxew5lFfmKlkMt6jmH3Sln3BNwr3CWnYx"
		    	],
		    ];
		    $context = stream_context_create($options);
		    $yelplookup = file_get_contents($yelpmatch, false, $context);
		    $yelpbest = json_decode($yelplookup);
		    if (sizeof($yelpbest->businesses)==0){
		    	echo "";
		    	return null;
		    }
		    else{
		    $reviewid = $yelpbest->businesses[0]->id;
		    $yelpreview = 'https://api.yelp.com/v3/businesses/'.$reviewid.'/reviews';
		    $options = [
		    	'http'=> [
		    		'method' => "GET",
		    		'header' => "Authorization: Bearer vLKhyzxTPRdTX1NTrC_qSEjE6w1YfbxQRo5rWIxYw3FuZtJa1BLfDoK_3Di_UMHgvKFqAlTFlELyEAWwh5-tOOu3GeyMjTSJxew5lFfmKlkMt6jmH3Sln3BNwr3CWnYx"
		    	],
		    ];
		    $context = stream_context_create($options);
		    $reviews = file_get_contents($yelpreview, false, $context);
		    echo $reviews;
		    return null;
		    }
	    	}
	    	else{
		$placeid = $_GET["placeid"];
		$api_key = "AIzaSyAnllJfkKzExzoAE9YmhfSK8itd_w30Rwo";
		$detcode = file_get_contents('https://maps.googleapis.com/maps/api/place/details/json?placeid='.$placeid.'&key='.$api_key);
		echo $detcode;
		return null;}
		}  
?>