// On load, check query parameters
var Name = getUrlParameter("name");
var Magic = getUrlParameter("magic");
var Response = "";

if (Name !== "" && Magic !== "") {
  go();
}

function go() {
  $("#rsvp-yes").on("click", respondYes);
  $("#rsvp-one").on("click", respondOne);
  $("#rsvp-no" ).on("click", respondNo);
  
  $("#entree-halibut").on("click", respond("e1","halibut"));
  $("#entree-lamb").on("click", respond("e1","lamb"));
  $("#entree-vegetarian" ).on("click", respond("e1","vegetarian"));
  $("#entree2-halibut").on("click", respond("e2","halibut"));
  $("#entree2-lamb").on("click", respond("e2","lamb"));
  $("#entree2-vegetarian" ).on("click", respond("e2","vegetarian"));

  $('#rsvp-music').on("input", updateText);
  $('#rsvp-food').on("input", updateText);
  $("#rsvp-name").html(Name);
  $("#rsvp").addClass("visible");
  $( "#rsvp-status" ).html( "Loading..." );
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

function respond(what, answer) {
  Console.log("> " + what + " := " + answer)
  clearTimeout($.data(this, 'timer'));
  updateButtons();
  respond();
}
function respondYes() {
  Response = "yes";
  clearTimeout($.data(this, 'timer'));
  updateButtons();
  respond();
}
function respondOne() {
  Response = "one";
  clearTimeout($.data(this, 'timer'));
  updateButtons();
  respond();
}
function respondNo() {
  Response = "no";
  clearTimeout($.data(this, 'timer'));
  updateButtons();
  respond();
}
function updateText() {
  clearTimeout($.data(this, 'timer'));
  $( "#rsvp-status" ).html( "... ");
  var wait = setTimeout(respond, 1000);
  $(this).data('timer', wait);
}

function respond() {
  var data = {
    name: Name,
    magic: Magic,
    response: Response ? Response : "",
    food: $("#rsvp-food").val() ? $("#rsvp-food").val() : "",
    music: $("#rsvp-music").val() ? $("#rsvp-music").val() : "" 
  };
  $("#rsvp-status").html("ing");
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