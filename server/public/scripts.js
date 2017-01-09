// On load, check query parameters
var name = getUrlParameter("name");
var magic = getUrlParameter("magic");
if (name !== "" && magic !== "") {
  go();
}

function respond() {
  console.log("Responding...")
  $.ajax({
    url: "/respond",
    data: {
      name: name,
      magic: magic
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

// Event handlers for inputs
$( "#rsvp-yes" ).on( "click", respond);
$( "#rsvp-plusone" ).on( "click", respond);
$( "#rsvp-no" ).on( "click", respond);

function go() {
  document.getElementById("rsvp-name").innerHTML = name;
  document.getElementById("rsvp").className = "visible";
  $( "#rsvp-status" ).html( "..." );
  $.ajax({
    url: "/status",
    data: {
      name: name,
      magic: magic
    },
    success: function( result ) {
        document.getElementById("rsvp-name").innerHTML = result.name;
        document.getElementById("rsvp-music").value = result.music;
        document.getElementById("rsvp-food").value = result.food;
        if (result.response !== "-1") {
          $( "#rsvp-status" ).html( "'ed" );
        }
        else {
          $( "#rsvp-status" ).html( "" );
        }
    },
    error: function(jqHXR, errorStatus, errorThrown) {
      document.getElementById("rsvp").className = ""; // hide this section
      console.error(jqHXR);
      console.error(errorThrown);
    }
  });
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};