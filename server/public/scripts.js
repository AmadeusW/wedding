// On load, check query parameters
var Name = getUrlParameter("name");
var Magic = getUrlParameter("magic");
var Response = "";

if (Name !== "" && Magic !== "") {
  go();
}

function go() {
  $("#rsvp-yes").on( "click", respondYes);
  $("#rsvp-one").on( "click", respondOne);
  $("#rsvp-no" ).on( "click", respondNo);
  $("#rsvp-name").html(Name);
  $("#rsvp").addClass("visible");
  $( "#rsvp-status" ).html( "..." );
  $.ajax({
    url: "/status",
    data: {
      name: Name,
      magic: Magic
    },
    success: handleStatus,
    error: function(jqHXR, errorStatus, errorThrown) {
      $("rsvp").removeClass("visible");
      console.error(jqHXR);
      console.error(errorThrown);
    }
  });
}

function respondYes() {
  Response = "yes";
  updateButtons();
  respond();
}
function respondOne() {
  Response = "one";
  updateButtons();
  respond();
}
function respondNo() {
  Response = "no";
  updateButtons();
  respond();
}

function respond() {
  var data = {
    name: Name,
    magic: Magic,
    response: Response ? Response : "",
    food: $("#rsvp-food").val() ? $("#rsvp-food").val() : "",
    music: $("#rsvp-music").val() ? $("#rsvp-music").val() : "" 
  };
  console.debug("Responding with: " + JSON.stringify(data))
  $.ajax({
    url: "/respond",
    data: data,
    success: function( result ) {
      console.debug("Received: " + JSON.stringify(result.response));
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
  console.debug("Status: " + JSON.stringify(result));
  $("#rsvp-name").html(result.name);
  $("#rsvp-music").val(result.music);
  $("#rsvp-food").val(result.food);
  Response = result.response;
  if (Response == "") {
    $("#rsvp-status" ).html("");
  } else {
    $("#rsvp-status").html( "'ed" );
    updateButtons();
  }
}

function updateButtons() {
  switch (Response) {
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