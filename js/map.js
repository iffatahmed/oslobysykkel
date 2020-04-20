// Mapbox access token
mapboxgl.accessToken =
  "pk.eyJ1IjoiaWZmYXRhaG1lZCIsImEiOiJjazk2dnVleHUxMDI5M2VwdXJqd2JxeW5iIn0.phk9yizlmJI7G-UHhcvnxw";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/iffatahmed/ck96vxfqc5iqk1ipmemif4039",
  center: [10.753316, 59.91093],
  zoom: 14,
});
console.log("reached");
// fetch open API data
$.get("https://gbfs.urbansharing.com/oslobysykkel.no/gbfs.json", function (
  res,
  status
) {
  // system information fetched from provided URL at res.data.nb.feeds[0].url
  $.get(res.data.nb.feeds[0].url, function (data_sys, status) {
    $("#name").append(data_sys.data.name);
    $("#operator").append(data_sys.data.operator);
    $("#phone").append(data_sys.data.phone_number);
    $("#email").append(data_sys.data.email);
  });

  // system information fetched from provided URL at res.data.nb.feeds[0].url
  $.get(res.data.nb.feeds[1].url, function (data_station, status) {
    $.get(
      "http://gbfs.urbansharing.com/oslobysykkel.no/station_status.json",
      function (station_status, status) {
        $.each(data_station.data.stations, function (key, station) {
          // Find this one station.station_id
          object = station_status.data.stations.find((o) =>
            Object.entries(o).some(
              ([k, value]) => k === "station_id" && value === station.station_id
            )
          );

          // create a HTML element for each feature
          var el = document.createElement("div");
          el.className = "marker";

          // make a marker for each feature and add to the map
          new mapboxgl.Marker(el)
            .setLngLat([station.lon, station.lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(
                  "<div id='stationsmap'><div><h3>" +
                    station.name +
                    "</h3><p>" +
                    station.address +
                    '</p><div class="left"><i class="icon fa fa-bicycle"></i>Bikes available:' +
                    object.num_bikes_available +
                    '</div><div class="left"><i class=" [ icon icon-parking fa ] "></i>Docks available: ' +
                    object.num_docks_available +
                    "</div></div></div>"
                )
            )
            .addTo(map);
        });
      }
    );
  });
});

// Search content component on home page
$(document).ready(function () {
  // Search navbar component on home page
  $("#search").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#stationsmap div").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

// footer
$("#year").text(new Date().getFullYear());
