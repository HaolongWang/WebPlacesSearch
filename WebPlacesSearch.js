		var app = angular.module("MyApp", ['ngAnimate']);  
        app.controller("MyCtrl", function ($scope) {  
            $scope.show01 = true; 
            $scope.notng = false; 
            $scope.checked = true;
            var index = 1;  
            $scope.nexts = function () {  
                switch(index){  
                    case 1:  
                        $scope.show01 = false;  
                        $scope.fade01 = 'fadeLeft';  
                        $scope.show02 = true;  
                        $scope.fade02 = 'fadeRight';  
                        index = 2;  
                        break;  
                    case 2:  
                        $scope.show02 = false;  
                        $scope.fade02 = 'fadeLeft';  
                        $scope.show01 = true;  
                        $scope.fade01 = 'fadeRight';  
                        index = 1;  
                        break;  
                };   
            };  
            $scope.befores = function () {  
                switch(index){  
                    case 1:  
                        $scope.show01 = false;  
                        $scope.fade01 = 'fadeRight';  
                        $scope.show02 = true;  
                        $scope.fade02 = 'fadeLeft';  
                        index = 2;  
                        break;  
                    case 2:  
                        $scope.show02 = false;  
                        $scope.fade02 = 'fadeRight';  
                        $scope.show01 = true;  
                        $scope.fade01 = 'fadeLeft';  
                        index = 1;  
                        break;  
                };  
            }; 
            $scope.next = function () {  
                
                $scope.nexts();  
            };  
            $scope.before = function () {  
                
                $scope.befores();  
            }; 

            });

            $(function () {
            $('form').bootstrapValidator({
　　　　　　　　message: 'This value is not valid',
      　      feedbackIcons: {
        　　　　　　　　valid: 'glyphicon glyphicon-ok',
        　　　　　　　　invalid: 'glyphicon glyphicon-remove',
        　　　　　　　　validating: 'glyphicon glyphicon-refresh'
      　　　　　　　　  },
              fields: {
              keyword: {
              message: 'Please enter a keyword.',
              validators: {
              notEmpty: {
              message: 'Please enter a keyword.'
              }
              }
              },
              location: {
              message: 'Please enter a location.',
              validators: {
              notEmpty: {
              message: 'Please enter a location.'
              }
              }
              }
              }
              });
              });

        $("#ajaxloads").hide(0);
        $(window).on('load', function(){
			$(document).ajaxStart(function(){
				$("#ajaxloads").show();
			}).ajaxStop(function(){
				$("#ajaxloads").hide(0);
			});
		  });

		var alls = [];
		var suphtmltext = "";
		var highlightn = 0;
		var highlightm = 1000;
		var n = 0;
		var m = 1000;
		var searchreviews = "google";
		var d = 10000;
		var supJson = [];
		var l = 0;
    var addordelete = 1;

		window.onload = function loadgeo(){

			$.ajax({
				type: "GET",
				cache: false,
				async: false,
				url: "http://ip-api.com/json",
				error: function(){
			        document.getElementById("search").disabled="true";
				}
			});
			   
			}

			function distext(){
				document.getElementById("texts").disabled="true";
			}

			function text(){
				document.getElementById("texts").disabled=false;
                document.getElementById("search").disabled="true";
			}

			function clears(){
			document.getElementById("pills-result").innerHTML="";
			document.getElementById("pills-favorite").innerHTML="<p style=\"background-color:#FFE833; width:800px; height:30px; margin:0 auto;\">No records.</p>";
			document.getElementById("info").innerHTML="";
			document.getElementById("photos").innerHTML="";
			document.getElementById("map").innerHTML="";
			document.getElementById("buttons").innerHTML="";
			document.getElementById("GYreviews").innerHTML="";
			document.getElementById("YYreviews").innerHTML="";
      document.getElementById("placedetname").innerHTML="";
      document.getElementById("birdbutton").innerHTML="";
			document.getElementById("distance").value=10;
			document.getElementById("keyword").value="";
			document.getElementById("category").value="Default";
			document.getElementById("texts").disabled="true";
			document.getElementById("choice1").checked="checked";
      document.getElementById("search").disabled="true";
			}

			var autocomplete;
			function initAutocomplete() {
               autocomplete = new google.maps.places.Autocomplete((document.getElementById('texts')), {types: ['geocode']});
            }
            function initAutocompletemap() {
            	autocomplete = new google.maps.places.Autocomplete((document.getElementById("Flocation")), {types: ['geocode']});
            }
            function geolocate() {
               if (navigator.geolocation) {
                 navigator.geolocation.getCurrentPosition(function(position) { 
                 	var geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var circle = new google.maps.Circle({
                    center: geolocation,
                    radius: position.coords.accuracy
                });
                autocomplete.setBounds(circle.getBounds());
                });
              }
            }

            function nong(){

            	var appElement = document.querySelector('[ng-controller=MyCtrl]');
            	var $scope = angular.element(appElement).scope();
            	$scope.notng = true;
            	$scope.$apply();

            }

            function ng(){

            	var appElement = document.querySelector('[ng-controller=MyCtrl]');
            	var $scope = angular.element(appElement).scope();
            	$scope.notng = false;
            	$scope.$apply();

            }

            function fadeng(){

            	var appfadeElement = document.querySelector('[ng-controller=MyCtrl]');
            	var $scope = angular.element(appfadeElement).scope();
            	$scope.checked = true;
            	$scope.$apply();

            }

            function nofadeng(){

            	var appfadeElement = document.querySelector('[ng-controller=MyCtrl]');
            	var $scope = angular.element(appfadeElement).scope();
            	$scope.checked = false;
            	$scope.$apply();

            }

            var htmltexts;
            htmltexts="<p style=\"background-color:#FFE833; width:800px; height:30px; margin:0 auto;\">No records.</p>";
            document.getElementById("pills-favorite").innerHTML=htmltexts;

			function loadjson(){

				highlightn=0;

			    $.ajax({
				type: "GET",
				cache: false,
				async: false,
				url: "http://ip-api.com/json",
				success: function(data){
					
					var herelat = data.lat;
			        var herelong = data.lon;

			        var postdata;
				    postdata="keyword="+document.getElementById("keyword").value+"&";
				    postdata+="category="+document.getElementById("category").value+"&";
				    if (document.getElementById("distance").value==""){
					postdata+="distance=16090&";
				    }
				    else{
					postdata+="distance="+((document.getElementById("distance").value)*1609)+"&";
				    }
				    if (document.getElementById("texts").disabled==false){
					postdata+="texts="+document.getElementById("texts").value;}
				    else{
					postdata+="herelat="+herelat+"&";
				    postdata+="herelong="+herelong;
				    }
				    var urlphp = "http://csci571-phps.us-west-1.elasticbeanstalk.com/?"+postdata;
				    $.ajax({
				    	type: "GET",
				    	cache: false,
				    	async: false,
				    	url: urlphp,
				    	success: function(resultdata){
				    		var jsonresponse = JSON.parse(resultdata);
				    		var jsonresp = jsonresponse.results;
                            var jsonrespnext = jsonresponse.next_page_token;
                            var htmltext;
                            var tablelists;
                if (jsonresp.length==0){
               	document.getElementById("pills-result").innerHTML="<p style=\"background-color:#FFE833; width:800px; height:30px; margin:0 auto;\">No records.</p>";
               	return false;
               }
               var htmltext;
               htmltext="<p style=\"text-align:right;\"><button class=\"btn btn-light\" type=\"button\" style=\"font-size:12px; text-align:right;\" name=\"detailss\" id=\"detailss\" disabled=\"true\" onclick=\"ng()\"> Details <i class=\"fas fa-angle-right\"></i> </button></p>";
               
               htmltext+="<table border='1' style=\"align:center; margin:auto;\" id=\"tableresult\"><tbody><tr style=\"text-align:center;\"><th style=\"width:50px\"><b>#</b></th><th style=\"width:100px\"><b>Category</b></th><th style=\"width:300px\"><b>Name</b></th><th style=\"width:400px\"><b>Address</b></th><th style=\"width:100px\"><b>Favorite</b></th><th style=\"width:100px\"><b>Details</b></th></tr>";
               var tablelistsname;
               var num;
               for (var i=0; i<jsonresp.length; i++){
               	tablelists = jsonresp[i];
               	num = i+1;
               	n++;
               	d++;
               	tablelistsname = tablelists.name;
               	tablelistsname = tablelistsname.replace(/\'/g,'\\\'');
               	htmltext+="<tr id=\'"+n+"\'>";
               	htmltext+="<td style=\"text-align:center;\"><b>"+num+"</b></td>";
                htmltext+="<td><img src="+tablelists.icon+"></td>";
               	htmltext+="<td>"+tablelists.name+"</td>";
               	htmltext+="<td>"+tablelists.vicinity+"</td>";
               	htmltext+="<td style=\"text-align:center;\"><button class=\"btn btn-light\" type=\"button\" onclick=\"starlight(\'"+d+"\'), addfavorites(\'"+tablelists.icon+"\', \'"+tablelistsname+"\', \'"+tablelists.vicinity+"\', \'"+tablelists.place_id+"\', \'"+herelat+"\', \'"+herelong+"\'), nong()\"> <div id=\'"+d+"\'><i class=\"far fa-star\"></i></div> </button></td>";
               	htmltext+="<td style=\"text-align:center;\"><button class=\"btn btn-light\" type=\"button\" onclick=\"loaddetails(\'"+tablelistsname+"\',\'"+tablelists.place_id+"\',\'"+herelat+"\',\'"+herelong+"\',\'"+d+"\'), loadbuttonres(\'"+n+"\'), ng()\"> <i class=\"fas fa-angle-right\"></i> </button></td>";
               	htmltext+="</tr>";
               }
               htmltext+="</tbody></table>";
               
               if (jsonrespnext!=null){
               htmltext+="<p style=\"text-align:center;\"><button class=\"btn btn-light\" type=\"button\" style=\"font-size:12px;\" name=\"next\" id=\"next\" onclick=\"loadothers(\'"+jsonrespnext+"\'), nong()\">Next</button></p>";}
               document.getElementById("pills-result").innerHTML=htmltext;
               suphtmltext = htmltext;
			   
				    }
				    });
			        
				}
			    });
                return false;
                
			}

			function loadothers(nextpage){

				supJson[l]=suphtmltext;
				l = l+1;

				highlightn=0;

				$.ajax({
				type: "GET",
				cache: false,
				async: false,
				url: "http://ip-api.com/json",
				success: function(data){
					
					var herelat = data.lat;
			        var herelong = data.lon;

				var postdata;
				postdata = "pagetoken="+nextpage;
				var urlphp = "http://csci571-phps.us-west-1.elasticbeanstalk.com/?"+postdata;
				$.ajax({
				    	type: "GET",
				    	cache: false,
				    	async: false,
				    	url: urlphp,
				    	success: function(resultdata){
			   var jsonresponse = JSON.parse(resultdata);
               var jsonresp = jsonresponse.results;
               var jsonrespnext = jsonresponse.next_page_token;
               var tablelists;
               var htmltext;

               htmltext="<p style=\"text-align:right;\"><button class=\"btn btn-light\" type=\"button\" style=\"font-size:12px; text-align:right;\" name=\"detailss\" id=\"detailss\" disabled=\"true\" onclick=\"ng()\"> Details <i class=\"fas fa-angle-right\"></i> </button></p>";

               htmltext+="<table border='1' style=\"align:center; margin:auto;\" id=\"tableresult\"><tbody><tr style=\"text-align:center;\"><th style=\"width:50px\"><b>#</b></th><th style=\"width:100px\"><b>Category</b></th><th style=\"width:300px\"><b>Name</b></th><th style=\"width:400px\"><b>Address</b></th><th style=\"width:100px\"><b>Favorite</b></th><th style=\"width:100px\"><b>Details</b></th></tr>";
               var tablelistsname;
               var num;
               for (var i=0; i<jsonresp.length; i++){
               	tablelists = jsonresp[i];
               	num = i+1;
               	n++;
               	d++;
               	tablelistsname = tablelists.name;
               	tablelistsname = tablelistsname.replace(/\'/g,'\\\'');
               	htmltext+="<tr id=\'"+n+"\'>";
               	htmltext+="<td style=\"text-align:center;\"><b>"+num+"</b></td>";
                htmltext+="<td><img src="+tablelists.icon+"></td>";
               	htmltext+="<td>"+tablelists.name+"</td>";
               	htmltext+="<td>"+tablelists.vicinity+"</td>";
               	htmltext+="<td style=\"text-align:center;\"><button class=\"btn btn-light\" type=\"button\" onclick=\"starlight(\'"+d+"\'), addfavorites(\'"+tablelists.icon+"\', \'"+tablelistsname+"\', \'"+tablelists.vicinity+"\', \'"+tablelists.place_id+"\', \'"+herelat+"\', \'"+herelong+"\'), nong()\"> <div id=\'"+d+"\'><i class=\"far fa-star\"></i></div> </button></td>";
               	htmltext+="<td style=\"text-align:center;\"><button class=\"btn btn-light\" type=\"button\" onclick=\"loaddetails(\'"+tablelistsname+"\',\'"+tablelists.place_id+"\',\'"+herelat+"\',\'"+herelong+"\',\'"+d+"\'), loadbuttonres(\'"+n+"\'), ng()\"> <i class=\"fas fa-angle-right\"></i> </button></td>";
               	htmltext+="</tr>";
               }
               htmltext+="</tbody></table>";
               htmltext+="<p style=\"text-align:center;\"><button class=\"btn btn-light\" type=\"button\" style=\"font-size:12px;\" name=\"previous\" id=\"previous\" onclick=\"loadprevious(), nong()\">Previous</button>";
               if (jsonrespnext!=null){
               htmltext+="<button class=\"btn btn-light\" type=\"button\" style=\"font-size:12px;\" name=\"next\" id=\"next\" onclick=\"loadothers(\'"+jsonrespnext+"\'), nong()\">Next</button></p>";}
               else {htmltext+="</p>";}
               document.getElementById("pills-result").innerHTML=htmltext;
               suphtmltext = htmltext;

			        }
				    });
			        
				}
			    });
               return false;

			}

			function loadprevious(){

				document.getElementById("pills-result").innerHTML=supJson[(l-1)];
				suphtmltext = supJson[(l-1)];
				l = l-1;
				
				highlightn=0;
				return false;

			}

			function addfavorites(icon, name, vicinity, place_id, herelat, herelong){

        if (addordelete==1){
				var allo = new Object();
				allo.icon = icon;
				allo.name = name;
				allo.vicinity = vicinity;
				allo.place_id = place_id;
				alls[alls.length] = allo;

				favorites(herelat, herelong);
            }
            else {
                delfavorites(place_id, herelat, herelong);
            }
				
			}

			function delfavorites(unfavorplaceid, herelat, herelong){

				for (var i=0; i<alls.length; i++){
					if (alls[i].place_id == unfavorplaceid){
						alls.splice(i, 1);
					}
				}

				favorites(herelat, herelong);

			}

			function starlight(d){
                if (document.getElementById(d).innerHTML=="<i class=\"fas fa-star\" style=\"color:#FFE833\"></i>"){
                    document.getElementById(d).innerHTML="<i class=\"far fa-star\"></i>";
                    addordelete = 0;
                }
                else {
                    document.getElementById(d).innerHTML="<i class=\"fas fa-star\" style=\"color:#FFE833\"></i>";
                    addordelete = 1;
                }
			}

			function stardetailslight(d){
                if (document.getElementById("stardetails").innerHTML=="<i class=\"fas fa-star\" style=\"color:#FFE833\"></i>"){
                    document.getElementById("stardetails").innerHTML="<i class=\"far fa-star\"></i>";
                    if (d != 10000){
                    document.getElementById(d).innerHTML="<i class=\"far fa-star\"></i>";
                }
                addordelete = 0;
                }
                else {
                    document.getElementById("stardetails").innerHTML="<i class=\"fas fa-star\" style=\"color:#FFE833\"></i>";
                    if (d != 10000){
                    document.getElementById(d).innerHTML="<i class=\"fas fa-star\" style=\"color:#FFE833\"></i>";
                }
                addordelete = 1;
                }
			}

			function favorites(herelat, herelong){

			   highlightm=1000;

			   var htmltexts;
			   if (alls.length==0){
               htmltexts="<p style=\"background-color:#FFE833; width:800px; height:30px; margin:0 auto;\">No records.</p>";
               document.getElementById("pills-favorite").innerHTML=htmltexts;
			   }
			   else {
               htmltexts="<p style=\"text-align:right;\"><button class=\"btn btn-light\" type=\"button\" style=\"font-size:12px; text-align:right;\" name=\"detailss\" id=\"detailsss\" disabled=\"true\" onclick=\"ng()\"> Details <i class=\"fas fa-angle-right\"></i> </button></p>";

               htmltexts+="<table border='1' style=\"align:center; margin:auto;\" id=\"tableresult\"><tbody><tr style=\"text-align:center;\"><th style=\"width:50px\"><b>#</b></th><th style=\"width:100px\"><b>Category</b></th><th style=\"width:300px\"><b>Name</b></th><th style=\"width:400px\"><b>Address</b></th><th style=\"width:100px\"><b>Favorite</b></th><th style=\"width:100px\"><b>Details</b></th></tr>";
               for (var j=0; j<alls.length; j++){
               	tablelists = alls[j];
               	num = j+1;
               	m++;
               	tablelistsname = tablelists.name;
               	tablelistsname = tablelistsname.replace(/\'/g,'\\\'');
               	htmltexts+="<tr id=\'"+m+"\'>";
               	htmltexts+="<td style=\"text-align:center;\"><b>"+num+"</b></td>";
                htmltexts+="<td><img src="+tablelists.icon+"></td>";
               	htmltexts+="<td>"+tablelists.name+"</td>";
               	htmltexts+="<td>"+tablelists.vicinity+"</td>";
               	htmltexts+="<td style=\"text-align:center;\"><button class=\"btn btn-light\" type=\"button\" onclick=\"delfavorites(\'"+tablelists.place_id+"\', \'"+herelat+"\', \'"+herelong+"\'), nong()\"> <i class=\"fas fa-trash-alt\"></i> </button></td>";
               	htmltexts+="<td style=\"text-align:center;\"><button class=\"btn btn-light\" type=\"button\" onclick=\"loaddetails(\'"+tablelistsname+"\',\'"+tablelists.place_id+"\',\'"+herelat+"\',\'"+herelong+"\',10000), loadbuttonfav(\'"+m+"\'), ng()\"> <i class=\"fas fa-angle-right\"></i> </button></td>";
               	htmltexts+="</tr>";
               }
               htmltexts+="</tbody></table>";
               document.getElementById("pills-favorite").innerHTML=htmltexts;
               }
               return false;
               
			}

			function loadbuttonres(n){

				if (highlightn!=0){
				document.getElementById(highlightn).style="background-color:#FFFFFF";
			    }
				document.getElementById(n).style="background-color:#FFE833";
				document.getElementById("detailss").disabled=false;
				highlightn = n;

			}

			function loadbuttonfav(m){

				if (highlightm!=1000){
				document.getElementById(highlightm).style="background-color:#FFFFFF";
			    }
				document.getElementById(m).style="background-color:#FFE833";
				document.getElementById("detailsss").disabled=false;
				highlightm = m;

			}

			function loaddetails(placename, placeid, realherelat, realherelong, d){

				var postdata;
				postdata="placeid="+placeid;
				var urlphp = "http://csci571-phps.us-west-1.elasticbeanstalk.com/?"+postdata;
			    $.ajax({
				    	type: "GET",
				    	cache: false,
				    	async: false,
				    	url: urlphp,
				    	success: function(resultdata){
			   var jsonresponse = JSON.parse(resultdata);
               var respaddress = jsonresponse.result.formatted_address;
               var respphone = jsonresponse.result.international_phone_number;
               var resprate = jsonresponse.result.rating;
               var respgoogleurl = jsonresponse.result.url;
               var respwebsite = jsonresponse.result.website;
               var respprice = "$";
               var respreviews = jsonresponse.result.reviews;
               var respphotos = jsonresponse.result.photos;
               var respdailyhours = jsonresponse.result.opening_hours;
               var respdaily;
               var respnow;
               if (respdailyhours!=null){
               	var respdaily=respdailyhours.weekday_text;
               	var respnow=respdailyhours.open_now;
               	var respperiods=respdailyhours.periods;
               }
               var respname = jsonresponse.result.name;
			   var resprefer;
			   var respwidth;
			   var respheight;
			   var photosurls;

				var htmltext;
				var subhtmltext;
				var twitterurl;
				if (respwebsite != null){
				    twitterurl = "https://twitter.com/intent/tweet?text=Check out "+respname+" located at "+respaddress+". Website: "+respwebsite+"&hashtags=TravelAndEntertainmentSearch";
			    }
			    else {
			    	twitterurl = "https://twitter.com/intent/tweet?text=Check out "+respname+" located at "+respaddress+". Website: "+respgoogleurl+"&hashtags=TravelAndEntertainmentSearch";
			    }
				htmltext="<h3 style=\"text-align:center;\"><b>"+placename+"</b></h3>";
				document.getElementById("placedetname").innerHTML=htmltext;
				htmltext="<p style=\"text-align:right;\"><button class=\"btn btn-light\" type=\"button\" onclick=\"stardetailslight(\'"+d+"\'), addfavorites(\'"+jsonresponse.result.icon+"\', \'"+placename+"\', \'"+jsonresponse.result.vicinity+"\', \'"+placeid+"\', \'"+realherelat+"\', \'"+realherelong+"\'), nong()\"> <div id=\"stardetails\"><i class=\"far fa-star\"></i></div> </button><button onclick=\"nong(), window.open(\'"+twitterurl+"\')\" style=\"background-color:#FFFFFF;\"><img src=\"http://cs-server.usc.edu:45678/hw/hw8/images/Twitter.png\" style=\"width:32px; height:32px;\"></button></p>";
				document.getElementById("birdbutton").innerHTML=htmltext;

				var stars = "";
				for (var s=0; s<resprate; s++){
					stars+="<i class=\"fas fa-star\" style=\"color:#FF8000;\"></i>";
				}
				subhtmltext="<ul class=\"list-group\"><li class=\"list-group-item list-group-item-secondary\"> Address<span style=\"margin-left:29%;\">" +respaddress+ "</span></li><li class=\"list-group-item\"> Phone Number<span style=\"margin-left:24%\">" +respphone+ "</span></li><li class=\"list-group-item list-group-item-secondary\"> Price Level<span style=\"margin-left:27%\">" +respprice+ "</span></li><li class=\"list-group-item\"> Rating<span style=\"margin-left:30%\">" +resprate+stars+ "</span></li><li class=\"list-group-item list-group-item-secondary\">Google Page<span style=\"margin-left:25.5%\"><a href=\'"+respgoogleurl+"\' target=\"_blank\">" +respgoogleurl+ "</a></span></li><li class=\"list-group-item\"> Website<span style=\"margin-left:29%\"><a href=\'"+respwebsite+"\' target=\"_blank\">" +respwebsite+ "</a></span></li><li class=\"list-group-item list-group-item-secondary\"> Hours<span style=\"margin-left:30%\"><span id=\"now\"></span><a data-toggle=\"modal\" data-target=\"#Daily\" style=\"color:#0080FF;\" href=\"\">Daily open hours</a></span></li></ul>";
				document.getElementById("info").innerHTML=subhtmltext;
				if (respnow!=null){
					if (respnow==true){
						if (respperiods!=null&&respperiods.length!=0){
						if(respperiods[0].open!=null&&respperiods[0].close!=null){
						if (respperiods[0].close.time>=1200){
							document.getElementById("now").innerHTML="Open now: "+respperiods[0].open.time+" AM - "+(respperiods[0].close.time-1200)+" PM ";
						}
						else if (respperiods[0].close.time<1200){
							document.getElementById("now").innerHTML="Open now: "+respperiods[0].open.time+" AM - "+respperiods[0].close.time+" AM ";
						}
						}
					    }
				    }
					else {
						document.getElementById("now").innerHTML="Closed ";
					}
				}
				subhtmltext="";
				if (respdaily!=null){
					subhtmltext+="<ul>";
					for (var k=0; k<respdaily.length; k++){
						subhtmltext+="<hr><li style=\"list-style-type:none;\">"+respdaily[k]+"</li>";
					}
					subhtmltext+="</ul>";
				}
				document.getElementById("DailyTimes").innerHTML=subhtmltext;

				if (respphotos==null){
					document.getElementById("photos").innerHTML="<p style=\"background-color:#FFE833\"><b>No records.</b></p>";
				}
				else {
				var photosdivs = [];
				var p = 0;
				photosdivs[0] = "";
				photosdivs[1] = "";
				photosdivs[2] = "";
				photosdivs[3] = "";
				for (var i=0; i<respphotos.length; i++){
					p++;
				resprefer = respphotos[i].photo_reference;
				respwidth = respphotos[i].width;
				respheight = respphotos[i].height;
				photosurls = "https://maps.googleapis.com/maps/api/place/photo?maxwidth="+respwidth+"&photoreference="+resprefer+"&key=AIzaSyB6uoZXm7bR-3Hay3bpMSFdf1iAhnwx11E";
				photosdivs[(p%4)]+="<a href=\'" +photosurls+ "\' target=\"_blank\"><img class=\"img\" src=\'" +photosurls+ "\'></a>";
			    }
			    subhtmltext="<div class=\"row\">";
			    subhtmltext+="<div class=\"col-sm-3\"><div class=\"card\"><div class=\"card-body\"><div class=\"card-img\" id=\"div1\"></div></div></div></div>";
			    subhtmltext+="<div class=\"col-sm-3\"><div class=\"card\"><div class=\"card-body\"><div class=\"card-img\" id=\"div2\"></div></div></div></div>";
			    subhtmltext+="<div class=\"col-sm-3\"><div class=\"card\"><div class=\"card-body\"><div class=\"card-img\" id=\"div3\"></div></div></div></div>";
			    subhtmltext+="<div class=\"col-sm-3\"><div class=\"card\"><div class=\"card-body\"><div class=\"card-img\" id=\"div4\"></div></div></div></div>";
			    subhtmltext+="</div>";
			    document.getElementById("photos").innerHTML=subhtmltext;
			    document.getElementById("div1").innerHTML=photosdivs[1];
			    document.getElementById("div2").innerHTML=photosdivs[2];
			    document.getElementById("div3").innerHTML=photosdivs[3];
			    document.getElementById("div4").innerHTML=photosdivs[0];
			    }

			    var destinations = jsonresponse.result.name+" "+jsonresponse.result.formatted_address;
			    subhtmltext="<div class=\"form-row\"><div class=\"form-group col-md-4\"><label for=\"Flocation\">From</label><input type=\"text\" class=\"form-control\" id=\"Flocation\" value=\"Your location\" onFocus=\"geolocate(), initAutocompletemap()\"></div><div class=\"form-group col-md-4\"><label for=\"Tlocation\">To</label><input type=\"text\" class=\"form-control\" id=\"Tlocation\" value=\'" +destinations+ "\'></div><div class=\"form-group col-md-2\"><label for=\"Tmode\">Travel Mode</label><select id=\"Tmode\" class=\"form-control\"><option selected>DRIVING</option><option>BICYCLING</option><option>TRANSIT</option><option>WALKING</option></select></div><div class=\"form-group col-md-2\"><label for=\"Blocation\">&nbsp;</label><button type=\"submit\" class=\"btn btn-primary form-control\" id=\"getdres\">Get Directions</button></div></div><button id=\"imgchange\" style=\"background-color:#FFFFFF;\"><img src=\"http://cs-server.usc.edu:45678/hw/hw8/images/Pegman.png\" style=\"width:30px; height:30px;\"></button><div id=\"mapss\" class=\"mapss\"></div><div id=\"mapdetail\"></div>";
                document.getElementById("map").innerHTML=subhtmltext;
			    var herelat = jsonresponse.result.geometry.location.lat;
			    var herelng = jsonresponse.result.geometry.location.lng;
				var here = new google.maps.LatLng(herelat, herelng);
				var mapOptions = {
					zoom: 16,
					center: here
				};
				var map = new google.maps.Map(document.getElementById('mapss'), mapOptions);
				var directionsService = new google.maps.DirectionsService();
			    var directionsDisplay = new google.maps.DirectionsRenderer({
			    	draggable: true,
			    	map: map,
			    	panel: document.getElementById('mapdetail')
			    });
				directionsDisplay.setMap(map);

				function mychangev(){
					document.getElementById("imgchange").innerHTML="<img src=\"http://cs-server.usc.edu:45678/hw/hw8/images/Map.png\" style=\"width:30px; height:30px;\">";
					var viewOpts = {
						position: here,
						pov: {
							heading: 0,
							pitch: 0
						}
					};
					var streetviews = new google.maps.StreetViewPanorama(document.getElementById('mapss'), viewOpts);
					map.setStreetView(streetviews);
					
					document.getElementById("imgchange").removeEventListener('click', mychangev);
					document.getElementById("imgchange").addEventListener('click', mychangem);
				}

				function mychangem(){
					document.getElementById("imgchange").innerHTML="<img src=\"http://cs-server.usc.edu:45678/hw/hw8/images/Pegman.png\" style=\"width:30px; height:30px;\">";
					mapOptions = {
					zoom: 16,
					center: here
				    };
				    map = new google.maps.Map(document.getElementById('mapss'), mapOptions);
				    directionsDisplay.setMap(map);
				    
				    document.getElementById("imgchange").removeEventListener('click', mychangem);
				    document.getElementById("imgchange").addEventListener('click', mychangev);
				}

				document.getElementById("imgchange").addEventListener('click', mychangev);
				
				document.getElementById("getdres").addEventListener('click', function(){

				var herelocation;
				if (document.getElementById("Flocation").value=="Your location"){
				   herelocation = new google.maps.LatLng(realherelat, realherelong);
				}
				else{
				   herelocation = document.getElementById("Flocation").value;
				}

				var markerps = {
					position: here,
					map: map
				};
				var marker = new google.maps.Marker(markerps);

				var travmode = document.getElementById("Tmode").value;
				var request = {
                    origin: herelocation,
                    destination: destinations,
                    travelMode: travmode,
                    provideRouteAlternatives: true
                    };

				directionsService.route(request, function(response, status) {
                if (status == 'OK') {
                directionsDisplay.setDirections(response);
                   }
                });
                marker.setMap(null);

				});

                subhtmltext="<div class=\"dropdown btn-group\"><button class=\"btn btn-secondary dropdown-toggle\" type=\"button\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Google Reviews</button><div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\"><a class=\"dropdown-item\" onclick=\"googlereviews(\'"+placeid+"\'), fadeng()\">Google Reviews</a><a class=\"dropdown-item\" onclick=\"yelpreviews(\'"+placeid+"\'), nofadeng()\">Yelp Reviews</a></div></div><div class=\"dropdown btn-group\"><button class=\"btn btn-secondary dropdown-toggle\" type=\"button\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Default Order</button><div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\"><a class=\"dropdown-item\" onclick=\"DefaultOrder(\'"+placeid+"\')\">Default Order</a><a class=\"dropdown-item\" onclick=\"HighestRating(\'"+placeid+"\')\">Highest Rating</a><a class=\"dropdown-item\" onclick=\"LowestRating(\'"+placeid+"\')\">Lowest Rating</a><a class=\"dropdown-item\" onclick=\"MostRecent(\'"+placeid+"\')\">Most Recent</a><a class=\"dropdown-item\" onclick=\"LeastRecent(\'"+placeid+"\')\">Least Recent</a></div></div>";
                document.getElementById("buttons").innerHTML=subhtmltext;
                if (respreviews==null){
                	subhtmltext="<p style=\"background-color:#FFE833; width:800px; height:30px; margin:0 auto;\">No records.</p>";
                }
                else {
                	subhtmltext="";
                	var respgooglerate;
                	var resptime;
                	var realtime;
                for (var j=0; j<respreviews.length; j++){
                	respgooglerate = respreviews[j].rating;
                	resptime = parseInt(respreviews[j].time);
                	realtime = moment.unix(resptime).format('YYYY-MM-DD HH:mm:ss');
                	stars = "";
				    for (var s=0; s<respgooglerate; s++){
					    stars+="<i class=\"fas fa-star\" style=\"color:#FF8000;\"></i>";
				    }
                	subhtmltext+="<div class=\"card\" style=\"width:100%\"><div class=\"card-body\"><div class=\"card-img\" style=\"float:left; width:5%\"><a href=\'" +respreviews[j].author_url+ "\' target=\"_blank\"><img src=\'" +respreviews[j].profile_photo_url+ "\'width=\"48\" height=\"48\"></a></div><div style=\"float:left; width:90%\"><div><a href=\'" +respreviews[j].author_url+ "\' target=\"_blank\"><b style=\"color:#0080FF\">" +respreviews[j].author_name+ "</b></a></div><div>" +stars+realtime+ "</div><div>" +respreviews[j].text+ "</div></div></div></div>";
                }
                }
                document.getElementById("GYreviews").innerHTML=subhtmltext;
                fadeng();

                }
				});

			}

			function yelpreviews(placeid){
				$.ajax({
				    type: "GET",
				    cache: false,
				    async: false,
				    url: "http://csci571-phps.us-west-1.elasticbeanstalk.com/?yelp=yelp&placeid="+placeid,
				    success: function(resultdata){
				    	var subhtmltext;
				    	if (resultdata==""){
				    		document.getElementById("YYreviews").innerHTML="<p style=\"background-color:#FFE833; width:800px; height:30px; margin:0 auto;\">No records.</p>";
				    	}
				    	else{
				    	var jsonresponse = JSON.parse(resultdata);
				    	var respreviews = jsonresponse.reviews;
				    	if (respreviews.length==0){
				    		subhtmltext="<p style=\"background-color:#FFE833; width:800px; height:30px; margin:0 auto;\">No records.</p>";
				    	}
				    	else {
				    		subhtmltext="";
				    		var resprate;
				    		var stars;
				    	for (var i=0; i<respreviews.length; i++){
				    		resprate = respreviews[i].rating;
				    		stars = "";
				    		for (var s=0; s<resprate; s++){
					            stars+="<i class=\"fas fa-star\" style=\"color:#FF8000;\"></i>";
				            }
                	    subhtmltext+="<div class=\"card\" style=\"width:100%\"><div class=\"card-body\"><div class=\"card-img\" style=\"float:left; width:5%\"><a href=\'" +respreviews[i].url+ "\' target=\"_blank\"><img src=\'" +respreviews[i].user.image_url+ "\'width=\"48\" height=\"48\"></a></div><div style=\"float:left; width:90%\"><div><a href=\'" +respreviews[i].url+ "\' target=\"_blank\"><b style=\"color:#0080FF\">" +respreviews[i].user.name+ "</b></a></div><div>" +stars+respreviews[i].time_created+ "</div><div>" +respreviews[i].text+ "</div></div></div></div>";
                            }
                        }
                        document.getElementById("YYreviews").innerHTML=subhtmltext;
                        }
				    }
				});
				searchreviews = "yelp";
			}

			function googlereviews(placeid){
				var postdata;
				postdata="placeid="+placeid;
				var urlphp = "http://csci571-phps.us-west-1.elasticbeanstalk.com/?"+postdata;
			    $.ajax({
				    	type: "GET",
				    	cache: false,
				    	async: false,
				    	url: urlphp,
				    	success: function(resultdata){
			   var jsonresponse = JSON.parse(resultdata);
			   var respreviews = jsonresponse.result.reviews;
			   var subhtmltext;
			   if (respreviews==null){
                	subhtmltext="<p style=\"background-color:#FFE833; width:800px; height:30px; margin:0 auto;\">No records.</p>";
                }
               else {
                	subhtmltext="";
                	var respgooglerate;
                	var resptime;
                	var realtime;
                	var stars;
                for (var j=0; j<respreviews.length; j++){
                	respgooglerate = respreviews[j].rating;
                	resptime = parseInt(respreviews[j].time);
                	realtime = moment.unix(resptime).format('YYYY-MM-DD HH:mm:ss');
                	stars = "";
				    for (var s=0; s<respgooglerate; s++){
					    stars+="<i class=\"fas fa-star\" style=\"color:#FF8000;\"></i>";
				    }
                	subhtmltext+="<div class=\"card\" style=\"width:100%\"><div class=\"card-body\"><div class=\"card-img\" style=\"float:left; width:5%\"><a href=\'" +respreviews[j].author_url+ "\' target=\"_blank\"><img src=\'" +respreviews[j].profile_photo_url+ "\'width=\"48\" height=\"48\"></a></div><div style=\"float:left; width:90%\"><div><a href=\'" +respreviews[j].author_url+ "\' target=\"_blank\"><b style=\"color:#0080FF\">" +respreviews[j].author_name+ "</b></a></div><div>" +stars+realtime+ "</div><div>" +respreviews[j].text+ "</div></div></div></div>";
                }
                }
                document.getElementById("GYreviews").innerHTML=subhtmltext;

                }
				});
				searchreviews = "google";
			}

			function DefaultOrder(placeid){

				var postdata;
				if (searchreviews == "google"){
				postdata="placeid="+placeid;
				var urlphp = "http://csci571-phps.us-west-1.elasticbeanstalk.com/?"+postdata;
			    $.ajax({
				    	type: "GET",
				    	cache: false,
				    	async: false,
				    	url: urlphp,
				    	success: function(resultdata){
			   var jsonresponse = JSON.parse(resultdata);
			   var respreviews = jsonresponse.result.reviews;
			   var subhtmltext;
			   if (respreviews==null){
                	subhtmltext="<p style=\"background-color:#FFE833; width:800px; height:30px; margin:0 auto;\">No records.</p>";
                }
                else {
                	subhtmltext="";
                	var respgooglerate;
                	var resptime;
                	var realtime;
                	var stars;
                for (var j=0; j<respreviews.length; j++){
                	respgooglerate = respreviews[j].rating;
                	resptime = parseInt(respreviews[j].time);
                	realtime = moment.unix(resptime).format('YYYY-MM-DD HH:mm:ss');
                	stars = "";
				    for (var s=0; s<respgooglerate; s++){
					    stars+="<i class=\"fas fa-star\" style=\"color:#FF8000;\"></i>";
				    }
                	subhtmltext+="<div class=\"card\" style=\"width:100%\"><div class=\"card-body\"><div class=\"card-img\" style=\"float:left; width:5%\"><a href=\'" +respreviews[j].author_url+ "\' target=\"_blank\"><img src=\'" +respreviews[j].profile_photo_url+ "\'width=\"48\" height=\"48\"></a></div><div style=\"float:left; width:90%\"><div><a href=\'" +respreviews[j].author_url+ "\' target=\"_blank\"><b style=\"color:#0080FF\">" +respreviews[j].author_name+ "</b></a></div><div>" +stars+realtime+ "</div><div>" +respreviews[j].text+ "</div></div></div></div>";
                }
                }
                document.getElementById("GYreviews").innerHTML=subhtmltext;

                }
				});
			}
			else {
				postdata="yelp=yelp&placeid="+placeid;
				var urlphp = "http://csci571-phps.us-west-1.elasticbeanstalk.com/?"+postdata;
			    $.ajax({
				    	type: "GET",
				    	cache: false,
				    	async: false,
				    	url: urlphp,
				    	success: function(resultdata){
			   if (resultdata==""){
				    document.getElementById("YYreviews").innerHTML="<p style=\"background-color:#FFE833; width:800px; height:30px; margin:0 auto;\">No records.</p>";
				}
				else{
				    	var jsonresponse = JSON.parse(resultdata);
				    	var respreviews = jsonresponse.reviews;
				    	var resprate;
				    	if (respreviews.length==0){
				    		subhtmltext="<p style=\"background-color:#FFE833; width:800px; height:30px; margin:0 auto;\">No records.</p>";
				    	}
				    	else {
				    		var stars;
				    		subhtmltext="";
				    	for (var i=0; i<respreviews.length; i++){
				    		resprate = respreviews[i].rating;
				    		stars = "";
				    		for (var s=0; s<resprate; s++){
					            stars+="<i class=\"fas fa-star\" style=\"color:#FF8000;\"></i>";
				            }
                	    subhtmltext+="<div class=\"card\" style=\"width:100%\"><div class=\"card-body\"><div class=\"card-img\" style=\"float:left; width:5%\"><a href=\'" +respreviews[i].url+ "\' target=\"_blank\"><img src=\'" +respreviews[i].user.image_url+ "\'width=\"48\" height=\"48\"></a></div><div style=\"float:left; width:90%\"><div><a href=\'" +respreviews[i].url+ "\' target=\"_blank\"><b style=\"color:#0080FF\">" +respreviews[i].user.name+ "</b></a></div><div>" +stars+respreviews[i].time_created+ "</div><div>" +respreviews[i].text+ "</div></div></div></div>";
                            }
                        }
                        document.getElementById("YYreviews").innerHTML=subhtmltext;
                        }

                }
				});
			}
				
			}

			function upcomparerating(a,b){
					var avalue = a.rating;
					var bvalue = b.rating;
					return avalue - bvalue;
				}

			function downcomparerating(a,b){
				    var avalue = a.rating;
					var bvalue = b.rating;
					return bvalue - avalue;
			}

			function upcomparetime(a,b){
					var avalue = a.time;
					var bvalue = b.time;
					return avalue - bvalue;
				}

			function downcomparetime(a,b){
				    var avalue = a.time;
					var bvalue = b.time;
					return bvalue - avalue;
			}

			function upcomparetimecreated(a,b){
					var avalue = a.time_created;
					var bvalue = b.time_created;
					return avalue - bvalue;
				}

			function downcomparetimecreated(a,b){
					var avalue = a.time_created;
					var bvalue = b.time_created;
					return bvalue - avalue;
				}

			function HighestRating(placeid){

				var postdata;
				if (searchreviews == "google"){
				postdata="placeid="+placeid;
				var urlphp = "http://csci571-phps.us-west-1.elasticbeanstalk.com/?"+postdata;
			    $.ajax({
				    	type: "GET",
				    	cache: false,
				    	async: false,
				    	url: urlphp,
				    	success: function(resultdata){
			   var jsonresponse = JSON.parse(resultdata);
			   var respreviews = jsonresponse.result.reviews;
			   var subhtmltext;
			    if (respreviews==null){
                	subhtmltext="<p style=\"background-color:#FFE833; width:800px; height:30px; margin:0 auto;\">No records.</p>";
                }
                else{
                	var HRrespreviews = respreviews.sort(downcomparerating);
                	subhtmltext="";
                	var respgooglerate;
                	var resptime;
                	var realtime;
                for (var j=0; j<HRrespreviews.length; j++){
                	respgooglerate = HRrespreviews[j].rating;
                	resptime = parseInt(HRrespreviews[j].time);
                	realtime = moment.unix(resptime).format('YYYY-MM-DD HH:mm:ss');
                	stars = "";
				    for (var s=0; s<respgooglerate; s++){
					    stars+="<i class=\"fas fa-star\" style=\"color:#FF8000;\"></i>";
				    }
                	subhtmltext+="<div class=\"card\" style=\"width:100%\"><div class=\"card-body\"><div class=\"card-img\" style=\"float:left; width:5%\"><a href=\'" +HRrespreviews[j].author_url+ "\' target=\"_blank\"><img src=\'" +HRrespreviews[j].profile_photo_url+ "\'width=\"48\" height=\"48\"></a></div><div style=\"float:left; width:90%\"><div><a href=\'" +HRrespreviews[j].author_url+ "\' target=\"_blank\"><b style=\"color:#0080FF\">" +HRrespreviews[j].author_name+ "</b></a></div><div>" +stars+realtime+ "</div><div>" +HRrespreviews[j].text+ "</div></div></div></div>";
                }
                }
                document.getElementById("GYreviews").innerHTML=subhtmltext;

                }
				});
			}
			else {
				postdata="yelp=yelp&placeid="+placeid;
				var urlphp = "http://csci571-phps.us-west-1.elasticbeanstalk.com/?"+postdata;
			    $.ajax({
				    	type: "GET",
				    	cache: false,
				    	async: false,
				    	url: urlphp,
				    	success: function(resultdata){
			   if (resultdata==""){
				    document.getElementById("YYreviews").innerHTML="<p style=\"background-color:#FFE833; width:800px; height:30px; margin:0 auto;\">No records.</p>";
				}
			   else {
			   var jsonresponse = JSON.parse(resultdata);
			   var respreviews = jsonresponse.reviews;
			   var subhtmltext;
			   if (respreviews.length==0){
				    subhtmltext="<p style=\"background-color:#FFE833; width:800px; height:30px; margin:0 auto;\">No records.</p>";
				}
				else {
					var HRrespreviews = respreviews.sort(downcomparerating);
					subhtmltext="";
                    var resprate;
				    var stars;
				    for (var i=0; i<HRrespreviews.length; i++){
				    	resprate = HRrespreviews[i].rating;
				    	stars = "";
				    	for (var s=0; s<resprate; s++){
					        stars+="<i class=\"fas fa-star\" style=\"color:#FF8000;\"></i>";
				        }
                	subhtmltext+="<div class=\"card\" style=\"width:100%\"><div class=\"card-body\"><div class=\"card-img\" style=\"float:left; width:5%\"><a href=\'" +HRrespreviews[i].url+ "\' target=\"_blank\"><img src=\'" +HRrespreviews[i].user.image_url+ "\'width=\"48\" height=\"48\"></a></div><div style=\"float:left; width:90%\"><div><a href=\'" +HRrespreviews[i].url+ "\' target=\"_blank\"><b style=\"color:#0080FF\">" +HRrespreviews[i].user.name+ "</b></a></div><div>" +stars+HRrespreviews[i].time_created+ "</div><div>" +HRrespreviews[i].text+ "</div></div></div></div>";
                    }
                }
                document.getElementById("YYreviews").innerHTML=subhtmltext;
                }

                }
				});
			}

			}

			function LowestRating(placeid){

				var postdata;
				if (searchreviews == "google"){
				postdata="placeid="+placeid;
				var urlphp = "http://csci571-phps.us-west-1.elasticbeanstalk.com/?"+postdata;
			    $.ajax({
				    	type: "GET",
				    	cache: false,
				    	async: false,
				    	url: urlphp,
				    	success: function(resultdata){
			   var jsonresponse = JSON.parse(resultdata);
			   var respreviews = jsonresponse.result.reviews;
			   var subhtmltext;
			    if (respreviews==null){
                	subhtmltext="<p style=\"background-color:#FFE833; width:800px; height:30px; margin:0 auto;\">No records.</p>";
                }
                else{
                	var LRrespreviews = respreviews.sort(upcomparerating);
                	subhtmltext="";
                    var respgooglerate;
                	var resptime;
                	var realtime;
                for (var j=0; j<LRrespreviews.length; j++){
                	respgooglerate = LRrespreviews[j].rating;
                	resptime = parseInt(LRrespreviews[j].time);
                	realtime = moment.unix(resptime).format('YYYY-MM-DD HH:mm:ss');
                	stars = "";
				    for (var s=0; s<respgooglerate; s++){
					    stars+="<i class=\"fas fa-star\" style=\"color:#FF8000;\"></i>";
				    }
                	subhtmltext+="<div class=\"card\" style=\"width:100%\"><div class=\"card-body\"><div class=\"card-img\" style=\"float:left; width:5%\"><a href=\'" +LRrespreviews[j].author_url+ "\' target=\"_blank\"><img src=\'" +LRrespreviews[j].profile_photo_url+ "\'width=\"48\" height=\"48\"></a></div><div style=\"float:left; width:90%\"><div><a href=\'" +LRrespreviews[j].author_url+ "\' target=\"_blank\"><b style=\"color:#0080FF\">" +LRrespreviews[j].author_name+ "</b></a></div><div>" +stars+realtime+ "</div><div>" +LRrespreviews[j].text+ "</div></div></div></div>";
                }
                }
                document.getElementById("GYreviews").innerHTML=subhtmltext;

                }
				});
			}
			else {
				postdata="yelp=yelp&placeid="+placeid;
				var urlphp = "http://csci571-phps.us-west-1.elasticbeanstalk.com/?"+postdata;
			    $.ajax({
				    	type: "GET",
				    	cache: false,
				    	async: false,
				    	url: urlphp,
				    	success: function(resultdata){
			   if (resultdata==""){
				    document.getElementById("YYreviews").innerHTML="<p style=\"background-color:#FFE833; width:800px; height:30px; margin:0 auto;\">No records.</p>";
				}
			   else {
			   var jsonresponse = JSON.parse(resultdata);
			   var respreviews = jsonresponse.reviews;
			   var subhtmltext;
			   if (respreviews.length==0){
				    subhtmltext="<p style=\"background-color:#FFE833; width:800px; height:30px; margin:0 auto;\">No records.</p>";
				}
				else {
					var LRrespreviews = respreviews.sort(upcomparerating);
					subhtmltext="";
                    var resprate;
				    var stars;
				    for (var i=0; i<LRrespreviews.length; i++){
				    	resprate = LRrespreviews[i].rating;
				    	stars = "";
				    	for (var s=0; s<resprate; s++){
					        stars+="<i class=\"fas fa-star\" style=\"color:#FF8000;\"></i>";
				        }
                	subhtmltext+="<div class=\"card\" style=\"width:100%\"><div class=\"card-body\"><div class=\"card-img\" style=\"float:left; width:5%\"><a href=\'" +LRrespreviews[i].url+ "\' target=\"_blank\"><img src=\'" +LRrespreviews[i].user.image_url+ "\'width=\"48\" height=\"48\"></a></div><div style=\"float:left; width:90%\"><div><a href=\'" +LRrespreviews[i].url+ "\' target=\"_blank\"><b style=\"color:#0080FF\">" +LRrespreviews[i].user.name+ "</b></a></div><div>" +stars+LRrespreviews[i].time_created+ "</div><div>" +LRrespreviews[i].text+ "</div></div></div></div>";
                    }
                }
                document.getElementById("YYreviews").innerHTML=subhtmltext;
                }

                }
				});
			}

			}

			function MostRecent(placeid){

				var postdata;
				if (searchreviews == "google"){
				postdata="placeid="+placeid;
				var urlphp = "http://csci571-phps.us-west-1.elasticbeanstalk.com/?"+postdata;
			    $.ajax({
				    	type: "GET",
				    	cache: false,
				    	async: false,
				    	url: urlphp,
				    	success: function(resultdata){
			   var jsonresponse = JSON.parse(resultdata);
			   var respreviews = jsonresponse.result.reviews;
			   var subhtmltext;
			    if (respreviews==null){
                	subhtmltext="<p style=\"background-color:#FFE833; width:800px; height:30px; margin:0 auto;\">No records.</p>";
                }
                else{
                	var MRrespreviews = respreviews.sort(downcomparetime);
                	subhtmltext="";
                    var respgooglerate;
                	var resptime;
                	var realtime;
                for (var j=0; j<MRrespreviews.length; j++){
                	respgooglerate = MRrespreviews[j].rating;
                	resptime = parseInt(MRrespreviews[j].time);
                	realtime = moment.unix(resptime).format('YYYY-MM-DD HH:mm:ss');
                	stars = "";
				    for (var s=0; s<respgooglerate; s++){
					    stars+="<i class=\"fas fa-star\" style=\"color:#FF8000;\"></i>";
				    }
                	subhtmltext+="<div class=\"card\" style=\"width:100%\"><div class=\"card-body\"><div class=\"card-img\" style=\"float:left; width:5%\"><a href=\'" +MRrespreviews[j].author_url+ "\' target=\"_blank\"><img src=\'" +MRrespreviews[j].profile_photo_url+ "\'width=\"48\" height=\"48\"></a></div><div style=\"float:left; width:90%\"><div><a href=\'" +MRrespreviews[j].author_url+ "\' target=\"_blank\"><b style=\"color:#0080FF\">" +MRrespreviews[j].author_name+ "</b></a></div><div>" +stars+realtime+ "</div><div>" +MRrespreviews[j].text+ "</div></div></div></div>";
                }
                }
                document.getElementById("GYreviews").innerHTML=subhtmltext;

                }
				});
			}
			else {
				postdata="yelp=yelp&placeid="+placeid;
				var urlphp = "http://csci571-phps.us-west-1.elasticbeanstalk.com/?"+postdata;
			    $.ajax({
				    	type: "GET",
				    	cache: false,
				    	async: false,
				    	url: urlphp,
				    	success: function(resultdata){
			   if (resultdata==""){
				    document.getElementById("YYreviews").innerHTML="<p style=\"background-color:#FFE833; width:800px; height:30px; margin:0 auto;\">No records.</p>";
				}
			   else {
			   var jsonresponse = JSON.parse(resultdata);
			   var respreviews = jsonresponse.reviews;
			   var subhtmltext;
			   if (respreviews.length==0){
				    subhtmltext="<p style=\"background-color:#FFE833; width:800px; height:30px; margin:0 auto;\">No records.</p>";
				}
				else {
					var MRrespreviews = respreviews.sort(downcomparetimecreated);
					subhtmltext="";
                    var resprate;
				    var stars;
				    for (var i=0; i<MRrespreviews.length; i++){
				    	resprate = MRrespreviews[i].rating;
				    	stars = "";
				    	for (var s=0; s<resprate; s++){
					        stars+="<i class=\"fas fa-star\" style=\"color:#FF8000;\"></i>";
				        }
                	subhtmltext+="<div class=\"card\" style=\"width:100%\"><div class=\"card-body\"><div class=\"card-img\" style=\"float:left; width:5%\"><a href=\'" +MRrespreviews[i].url+ "\' target=\"_blank\"><img src=\'" +MRrespreviews[i].user.image_url+ "\'width=\"48\" height=\"48\"></a></div><div style=\"float:left; width:90%\"><div><a href=\'" +MRrespreviews[i].url+ "\' target=\"_blank\"><b style=\"color:#0080FF\">" +MRrespreviews[i].user.name+ "</b></a></div><div>" +stars+MRrespreviews[i].time_created+ "</div><div>" +MRrespreviews[i].text+ "</div></div></div></div>";
                    }
                }
                document.getElementById("YYreviews").innerHTML=subhtmltext;
                }

                }
				});
			}

			}

			function LeastRecent(placeid){

				var postdata;
				if (searchreviews == "google"){
				postdata="placeid="+placeid;
				var urlphp = "http://csci571-phps.us-west-1.elasticbeanstalk.com/?"+postdata;
			    $.ajax({
				    	type: "GET",
				    	cache: false,
				    	async: false,
				    	url: urlphp,
				    	success: function(resultdata){
			   var jsonresponse = JSON.parse(resultdata);
			   var respreviews = jsonresponse.result.reviews;
			   var subhtmltext;
			    if (respreviews==null){
                	subhtmltext="<p style=\"background-color:#FFE833; width:800px; height:30px; margin:0 auto;\">No records.</p>";
                }
                else{
                	var LERrespreviews = respreviews.sort(upcomparetime);
                	subhtmltext="";
                    var respgooglerate;
                	var resptime;
                	var realtime;
                for (var j=0; j<LERrespreviews.length; j++){
                	respgooglerate = LERrespreviews[j].rating;
                	resptime = parseInt(LERrespreviews[j].time);
                	realtime = moment.unix(resptime).format('YYYY-MM-DD HH:mm:ss');
                	stars = "";
				    for (var s=0; s<respgooglerate; s++){
					    stars+="<i class=\"fas fa-star\" style=\"color:#FF8000;\"></i>";
				    }
                	subhtmltext+="<div class=\"card\" style=\"width:100%\"><div class=\"card-body\"><div class=\"card-img\" style=\"float:left; width:5%\"><a href=\'" +LERrespreviews[j].author_url+ "\' target=\"_blank\"><img src=\'" +LERrespreviews[j].profile_photo_url+ "\'width=\"48\" height=\"48\"></a></div><div style=\"float:left; width:90%\"><div><a href=\'" +LERrespreviews[j].author_url+ "\' target=\"_blank\"><b style=\"color:#0080FF\">" +LERrespreviews[j].author_name+ "</b></a></div><div>" +stars+realtime+ "</div><div>" +LERrespreviews[j].text+ "</div></div></div></div>";
                }
                }
                document.getElementById("GYreviews").innerHTML=subhtmltext;

                }
				});
			}
			else {
				postdata="yelp=yelp&placeid="+placeid;
				var urlphp = "http://csci571-phps.us-west-1.elasticbeanstalk.com/?"+postdata;
			    $.ajax({
				    	type: "GET",
				    	cache: false,
				    	async: false,
				    	url: urlphp,
				    	success: function(resultdata){
			   if (resultdata==""){
				    document.getElementById("YYreviews").innerHTML="<p style=\"background-color:#FFE833; width:800px; height:30px; margin:0 auto;\">No records.</p>";
				}
			   else {
			   var jsonresponse = JSON.parse(resultdata);
			   var respreviews = jsonresponse.reviews;
			   var subhtmltext;
			   if (respreviews.length==0){
				    subhtmltext="<p style=\"background-color:#FFE833; width:800px; height:30px; margin:0 auto;\">No records.</p>";
				}
				else {
					var LERrespreviews = respreviews.sort(upcomparetimecreated);
					subhtmltext="";
                    var resprate;
				    var stars;
				    for (var i=0; i<LERrespreviews.length; i++){
				    	resprate = LERrespreviews[i].rating;
				    	stars = "";
				    	for (var s=0; s<resprate; s++){
					        stars+="<i class=\"fas fa-star\" style=\"color:#FF8000;\"></i>";
				        }
                	subhtmltext+="<div class=\"card\" style=\"width:100%\"><div class=\"card-body\"><div class=\"card-img\" style=\"float:left; width:5%\"><a href=\'" +LERrespreviews[i].url+ "\' target=\"_blank\"><img src=\'" +LERrespreviews[i].user.image_url+ "\'width=\"48\" height=\"48\"></a></div><div style=\"float:left; width:90%\"><div><a href=\'" +LERrespreviews[i].url+ "\' target=\"_blank\"><b style=\"color:#0080FF\">" +LERrespreviews[i].user.name+ "</b></a></div><div>" +stars+LERrespreviews[i].time_created+ "</div><div>" +LERrespreviews[i].text+ "</div></div></div></div>";
                    }
                }
                document.getElementById("YYreviews").innerHTML=subhtmltext;
                }

                }
				});
			}

			}