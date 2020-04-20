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
          var renting = object.is_renting ? "Yes" : "No";
          var returning = object.is_returning ? "Yes" : "No";
          // Create dynamic div for data
          $("#station-record").append(
            "<div class='[ col-sm-6 station-record ]' data-toggle='modal' data-target='#" +
              station.station_id +
              "'><div><span id='box-left'><h4 id='name'>" +
              station.name +
              " </h4>" +
              station.address +
              " <br><i class='icon fa fa-map-marker'> " +
              station.lat.toFixed(4) +
              "," +
              station.lon.toFixed(4) +
              "</i></span><span id='box-right'><p><i class='icon fa fa-th-list'></i><span  class='[ capacity ]'>" +
              station.capacity +
              " </span></p><i class='icon fa fa-bicycle'></i>Bikes: " +
              object.num_bikes_available +
              " <br><i class=' icon icon-parking fa '></i>Docks: " +
              object.num_docks_available +
              "</span></div></div>" +
              "<div class='modal fade' id='" +
              station.station_id +
              "' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'>&times;</button><h4 class='modal-title'>" +
              station.name +
              "</h4></div><div class='modal-body'> <p>" +
              station.address +
              "</p> <i class='icon fa fa-map-marker' style='margin-bottom:30px;'> " +
              station.lat.toFixed(4) +
              "," +
              station.lon.toFixed(4) +
              "</i> <p>Total Capacity: " +
              station.capacity +
              "</p>  <p>Bikes available: " +
              object.num_bikes_available +
              "</p><p>Docks available: " +
              object.num_docks_available +
              "</p><p>Rental Allowed: " +
              renting +
              "</p><p>Accepting return: " +
              returning +
              "</p> <p>Description: Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p></div><div class='modal-footer'> <button type='button' style='color:black!important;' class='btn btn-default' data-dismiss='modal'>Close</button></div></div></div></div>"
          );
        });
      }
    );
  });
});

// Search content component on home page
$(document).ready(function () {
  $("#find").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#station div").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  // Search navbar component on home page
  $("#search").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#station div").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

// footer
$("#year").text(new Date().getFullYear());
