
// fetch open API data

$.get('https://gbfs.urbansharing.com/oslobysykkel.no/gbfs.json', function(res, status){
    console.log(' data: ', res);
    console.log(' data: ', res.data.nb.feeds[0].url);
    

    // system information fetched from provided URL at res.data.nb.feeds[0].url
    $.get(res.data.nb.feeds[0].url, function(data_sys, status){
        console.log('data_sys', data_sys.data);
        $('#name').append(data_sys.data.name);
        $('#operator').append(data_sys.data.operator);
        //$('#timezone').append(data_sys.data.timezone);
        $('#phone').append(data_sys.data.phone_number);
        $('#email').append(data_sys.data.email);
    });
   

    // system information fetched from provided URL at res.data.nb.feeds[0].url
    $.get(res.data.nb.feeds[1].url, function(data_station, status){
        console.log('data_station', data_station.data.stations[0]);
        $.get('http://gbfs.urbansharing.com/oslobysykkel.no/station_status.json', function(station_status, status){
            console.log('station_status', station_status.data.stations);
            $.each(data_station.data.stations, function(key, station){
                // Find this one station.station_id
                object = station_status.data.stations.find(o => Object.entries(o).some(([k, value]) => k === 'station_id' && value === station.station_id));
                console.log('object', object.num_bikes_available);
                // Create dynamic div for data
                $('#station-record').append("<div class='[ station-record ]'><p style='float:right;'><i class='icon fa fa-bicycle'>x" +station.capacity+ " </i></p><p style='float:right;'><i class='icon-green icon fa fa-check-circle'>x" +object.num_bikes_available+ " </i><i class='icon-red icon fa fa-times-circle'>x" +object.num_docks_available+ " </i></p><h2>" + station.name + " </h2>"+ station.address +" <br><i class='icon fa fa-map-marker'> "+ station.lat.toFixed(2) + "," + station.lon.toFixed(2) +  "</i><p style='float:right;'>ID:" +station.station_id+ " </p></div>");
            });
        });

    });
});


// footer
$('#year').text(new Date().getFullYear());