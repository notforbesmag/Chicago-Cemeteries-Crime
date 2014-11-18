var map = L.map('map').setView([41.8369, -87.6847], 12);

//set up basemap tiles from mapbox
L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
}, {
    maxZoom: 18
}).addTo(map);

//load external geoJSON
$.getJSON('october.geojson',function(data){
	var geojsonLayer = L.geoJson(data.features, {
    onEachFeature: makeMarkers,
    pointToLayer: function (feature, latlng) {
				return L.circleMarker(latlng, {
					radius: 2,
					fillColor: "#ff7800",
					color: "#000",
					weight: 1,
					opacity: 1,
					fillOpacity: 0.8
				});
			}
  }).addTo(map);

	/*$('.sideBarItem')
	.mouseenter(function(){
		$(this).toggleClass('highlight');
		var thisBBL = $(this).attr('id');
		highlightMarker(geojsonLayer,thisBBL);
	})
	.mouseout(function(){
		$(this).toggleClass('highlight');
		//highlightMarker(geojsonLayer,thisBBL);
	})
	.click(function(){
		var clicked = $(this);
		geojsonLayer.eachLayer(function(marker) {
			if(clicked.attr('id')==marker.feature.properties.BBL) {
				console.log(marker._latlng);
				map.panTo(marker._latlng);
				marker.openPopup();
			}
		})
	});*/





});


function highlightMarker(geojsonLayer,thisBBL) {
  geojsonLayer.eachLayer(function(marker) {
		if(thisBBL==marker.feature.properties.BBL) {
   		marker.setStyle({
   			fillColor:'#fff',
   			radius: 12
   		})
   		console.log(marker.options.fillColor);
		} else {
			marker.setStyle({
				fillColor:'#ff7800',
				radius:8
			});
		}
  });
}



function makeMarkers(feature, layer) {
	var thisFeature = feature.properties;

//bind a leaflet popup to the marker
	layer.bindPopup(
			"<b>" + thisFeature.PrimaryType + "</b>"
			+ "</br>Description: " 
			+ thisFeature.Description
	  );

/*	//set up a bunch of divs classed using the BBL to see if we can select them later
	$('#sideBar').append(
		"<div class = 'sideBarItem' id='"
		+ thisFeature.BBL
		+ "'>" 
		+ thisFeature.Address.toLowerCase() + "</div>")

	//attach a click listener to every feature
	//that selects divs classed with the current marker's BBL
	layer.on("click",function(e){
		$('.' + thisFeature.BBL)
			.css('background','steelblue');
	})*/
}
