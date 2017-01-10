// On load, check query parameters
var name = getUrlParameter("name");
var magic = getUrlParameter("magic");
var response = "";

if (name !== "" && magic !== "") {
  go();
}

function go() {
  $("#rsvp-yes").on( "click", respondYes);
  $("#rsvp-one").on( "click", respondOne);
  $("#rsvp-no" ).on( "click", respondNo);
  document.getElementById("rsvp-name").innerHTML = name;
  document.getElementById("rsvp").className = "visible";
  $( "#rsvp-status" ).html( "..." );
  $.ajax({
    url: "/status",
    data: {
      name: name,
      magic: magic
    },
    success: handleStatus,
    error: function(jqHXR, errorStatus, errorThrown) {
      document.getElementById("rsvp").className = ""; // hide this section
      console.error(jqHXR);
      console.error(errorThrown);
    }
  });
}

function respondYes() {
  response = "yes";
  updateButtons();
  respond();
}
function respondOne() {
  response = "one";
  updateButtons();
  respond();
}
function respondNo() {
  response = "no";
  updateButtons();
  respond();
}

function respond() {
  console.log("Responding...")
  $.ajax({
    url: "/respond",
    data: {
      name: name,
      magic: magic,
      response: response,
      food: $("#rsvp-food").value,
      music: $("#rsvp-music").value
    },
    success: function( result ) {
      console.log(result.response);
      $( "#rsvp-status" ).html( "'ed ");
    },
    error: function(jqHXR, errorStatus, errorThrown) {
      console.error(jqHXR);
      console.error(errorThrown);
      $( "#rsvp-status" ).html( " error " + errorStatus );
    }
  });
}

function handleStatus (result) {
  $("#rsvp-name").innerHTML = result.name;
  $("#rsvp-music").value = result.music;
  $("#rsvp-food").value = result.food;
  response = result.response;
  if (response == "") {
    $("#rsvp-status" ).html("");
  } else {
    $("#rsvp-status").html( "'ed" );
    updateButtons();
  }
}

function updateButtons() {
  switch (response) {
    case "yes":
      $("#rsvp-yes").addClass("selected");
      $("#rsvp-one").removeClass("selected");
      $("#rsvp-no").removeClass("selected");
      break;
    case "one":
      $("#rsvp-status").html( "'ed" );
      $("#rsvp-yes").removeClass("selected");
      $("#rsvp-one").addClass("selected");
      $("#rsvp-no").removeClass("selected");
      break;
    case "no":
      $("#rsvp-status").html( "'ed" );
      $("#rsvp-yes").removeClass("selected");
      $("#rsvp-one").removeClass("selected");
      $("#rsvp-no").addClass("selected");
      break;
  }
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};