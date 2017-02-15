// On load, check query parameters
var Name = getUrlParameter("name");
var Name2 = getUrlParameter("name2");
var Magic = getUrlParameter("magic");
var Responses = {};

if (Name !== "" && Magic !== "") {
  go();
}

function go() {
  $("#rsvp-yes").on("click", function() { respond("rsvp","yes") });
  $("#rsvp-one").on("click", function() { respond("rsvp","one") });
  $("#rsvp-no" ).on("click", function() { respond("rsvp","no") });
  
  $("#entree-halibut").on("click", function() { respond("menu1","halibut") });
  $("#entree-lamb").on("click", function() { respond("menu1","lamb") });
  $("#entree-vege" ).on("click", function() { respond("menu1","vege") });
  $("#entree2-halibut").on("click", function() { respond("menu2","halibut") });
  $("#entree2-lamb").on("click", function() { respond("menu2","lamb") });
  $("#entree2-vege" ).on("click", function() { respond("menu2","vege") });

  $('#rsvp-music').on("input", updateText);
  $('#rsvp-comment').on("input", updateText);
  $("#rsvp-name").html(Name);
  $("#rsvp").addClass("visible");
  $("#hotelprivate").addClass("visible");
  $("#hotelpublic").removeClass("visible");
  $("#rsvp-status").html( "Loading..." );

  if (Name2 !== "")
  {
    $("#foodprompt1").text(Name + ", pick your entrée:");
    $("#foodprompt2").text(Name2 + ", pick your entrée:");
    $("#food2").addClass("visible");
    $("#rsvp-one").addClass("visible");
    $("#rsvp-name").html(Name + " &amp; " + Name2);
  }

  $.ajax({
    url: "https://amadeusw-wedding.azurewebsites.net/api/Status?code=WHExFvqO4k/R8kqpukhru6fqneSD1cb1aP33J6HdGHNaNf14Bg8UEA==",
    data: {
      name: Name,
      name2: Name2,
      magic: Magic
    },
    success: handleStatus,
    error: function(jqHXR, errorStatus, errorThrown) {
      $("rsvp").removeClass("visible");
      $("#hotelpublic").addClass("visible");
      $("#hotelprivate").removeClass("visible");
      console.error(jqHXR);
      console.error(errorThrown);
    }
  });
}

function respond(what, answer) {
  console.log("> " + what + " := " + answer)
  Responses[what] = answer;
  clearTimeout($.data(document.body, 'timer'));
  updateButtons();
  sendResponse();
}
function updateText() {
  clearTimeout($.data(document.body, 'timer'));
  $( "#rsvp-status" ).html( "Recording your response... ");
  var wait = setTimeout(sendResponse, 1000);
  $.data(document.body, 'timer', wait);
}

function sendResponse() {
  var data = {
    name: Name,
    name2: Name2,
    magic: Magic,
    response: Responses['rsvp'] ? Responses['rsvp'] : "",
    menu1: Responses['menu1'] ? Responses['menu1'] : "",
    menu2: Responses['menu2'] ? Responses['menu2'] : "",
    comment: $("#rsvp-comment").val() ? $("#rsvp-comment").val() : "",
    music: $("#rsvp-music").val() ? $("#rsvp-music").val() : "" 
  };
  $("#rsvp-status").html("Sending your response...");
  console.debug("Responding with: " + JSON.stringify(data))
  $.ajax({
    url: "https://amadeusw-wedding.azurewebsites.net/api/Reply?code=HrPgqOkY5Z31RLUjsOz8jqmR2MdYSCxgmWB0WPERNXUWv8Jt1B2ecw==",
    data: data,
    success: function( result ) {
      $( "#rsvp-status" ).html( "We have received your response. Thanks!");
    },
    error: function(jqHXR, errorStatus, errorThrown) {
      console.error(jqHXR);
      console.error(errorThrown);
      $( "#rsvp-status" ).html( "We're sorry, there was an error. " + errorStatus );
    }
  });
}

function handleStatus (result) {
  console.debug("Status: " + JSON.stringify(result));
  if (result.name2 == "") {
    $("#rsvp-name").html(result.name);
  } else {
    $("#rsvp-name").html(result.name + " &amp; " + result.name2);
  }
  $("#rsvp-music").val(result.music);
  $("#rsvp-comment").val(result.comment);
  $("#hotelcode").attr('href', "http://book.bestwestern.com/bestwestern/groupSearch.do?groupId=" + result.hotelcode)
  Responses['rsvp'] = result.response;
  Responses['menu1'] = result.menu1;
  Responses['menu2'] = result.menu2;
  if (Responses['rsvp'] == "") {
    $("#rsvp-status" ).html("");
  } else {
    $("#rsvp-status").html("");
    updateButtons();
  }
}

function updateButtons() {
  console.log("Buttons: " + Responses);
  switch (Responses['rsvp']) {
    case "yes":
      $("#rsvp-yes").addClass("selected");
      $("#rsvp-one").removeClass("selected");
      $("#rsvp-no").removeClass("selected");
      break;
    case "one":
      $("#rsvp-yes").removeClass("selected");
      $("#rsvp-one").addClass("selected");
      $("#rsvp-no").removeClass("selected");
      break;
    case "no":
      $("#rsvp-yes").removeClass("selected");
      $("#rsvp-one").removeClass("selected");
      $("#rsvp-no").addClass("selected");
      break;
  }
  switch (Responses['menu1']) {
    case "halibut":
      $("#entree-halibut").addClass("selected");
      $("#entree-lamb").removeClass("selected");
      $("#entree-vege").removeClass("selected");
      break;
    case "lamb":
      $("#entree-halibut").removeClass("selected");
      $("#entree-lamb").addClass("selected");
      $("#entree-vege").removeClass("selected");
      break;
    case "vege":
      $("#entree-halibut").removeClass("selected");
      $("#entree-lamb").removeClass("selected");
      $("#entree-vege").addClass("selected");
      break;
  }
  switch (Responses['menu2']) {
    case "halibut":
      $("#entree2-halibut").addClass("selected");
      $("#entree2-lamb").removeClass("selected");
      $("#entree2-vege").removeClass("selected");
      break;
    case "lamb":
      $("#entree2-halibut").removeClass("selected");
      $("#entree2-lamb").addClass("selected");
      $("#entree2-vege").removeClass("selected");
      break;
    case "vege":
      $("#entree2-halibut").removeClass("selected");
      $("#entree2-lamb").removeClass("selected");
      $("#entree2-vege").addClass("selected");
      break;
  }
  if (Name2 !== "") {
    if (Responses['rsvp'] !== '' && Responses['food1'] !== '' && Responses['food2'] !== '') {
      $("#rsvp-status").html( "Your response has been saved. Thanks!" );
    } else {
      $("#rsvp-status").html( "Waiting for your response..." );
    }
  } else {
    if (Responses['rsvp'] !== '' && Responses['food1'] !== '') {
      $("#rsvp-status").html( "Your response has been saved. Thanks!" );
    } else {
      $("#rsvp-status").html( "Waiting for your response..." );
    }
  }
  
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};