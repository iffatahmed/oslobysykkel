
// Mapbox access token  
mapboxgl.accessToken = 'pk.eyJ1IjoiaWZmYXRhaG1lZCIsImEiOiJjazk2dnVleHUxMDI5M2VwdXJqd2JxeW5iIn0.phk9yizlmJI7G-UHhcvnxw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iffatahmed/ck96vxfqc5iqk1ipmemif4039',
    center: [10.753316,59.910930],
    zoom: 14
  });
  console.log('reached');
// fetch open API data
$.get('https://gbfs.urbansharing.com/oslobysykkel.no/gbfs.json', function(res, status){
    // console.log(' data: ', res);
    // console.log(' data: ', res.data.nb.feeds[0].url);
    

     // system information fetched from provided URL at res.data.nb.feeds[0].url
    $.get(res.data.nb.feeds[0].url, function(data_sys, status){
        // console.log('data_sys', data_sys.data);
        $('#name').append(data_sys.data.name);
        $('#operator').append(data_sys.data.operator);
        //$('#timezone').append(data_sys.data.timezone);
        $('#phone').append(data_sys.data.phone_number);
        $('#email').append(data_sys.data.email);
    });
   

    // system information fetched from provided URL at res.data.nb.feeds[0].url
    $.get(res.data.nb.feeds[1].url, function(data_station, status){
        // console.log('data_station', data_station.data.stations[0]);
        $.get('http://gbfs.urbansharing.com/oslobysykkel.no/station_status.json', function(station_status, status){
            // console.log('station_status', station_status.data.stations);
            $.each(data_station.data.stations, function(key, station){
                // Find this one station.station_id
                object = station_status.data.stations.find(o => Object.entries(o).some(([k, value]) => k === 'station_id' && value === station.station_id));
                console.log('object', object.num_bikes_available);
                // Create dynamic div for data
                // $('#station-record').append("<div class='[ station-record ]'><div style='float:right;text-align:right;'><p><i class='icon fa fa-bicycle'>x<span  class='[ capacity ]'>" +station.capacity+ " </span></i></p>Bikes available:" +object.num_bikes_available+ " <br>Docks available:" +object.num_docks_available+ "</div><h2>" + station.name + " </h2>"+ station.address +" <br><i class='icon fa fa-map-marker'> "+ station.lat + "," + station.lon +  "</i></div>");

                // create a HTML element for each feature
                var el = document.createElement('div');
                el.className = 'marker';

                // make a marker for each feature and add to the map
                new mapboxgl.Marker(el)
                .setLngLat([station.lon,station.lat])
                .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML('<div><h3>' + station.name + '</h3><p>' + station.address + '</p><div class="left"><i class="icon fa fa-bicycle"></i>Dikes available:'+object.num_bikes_available+'</div><div class="left"><i class=" [ icon parking ] "></i>Docks available: '+object.num_docks_available+'</div></div>'))
                .addTo(map);

            });
        });

    });
});


// footer
$('#year').text(new Date().getFullYear());