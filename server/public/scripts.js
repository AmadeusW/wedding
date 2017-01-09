// On load, check query parameters
var name = getUrlParameter("name");
var magic = getUrlParameter("magic");
if (name !== "" && magic !== "") {
  go();
}

function go() {
  document.getElementById("rsvp-name").innerHTML = name;
  document.getElementById("rsvp").className = "visible";

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/status?name="+name+"&magic="+magic, true);
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
        var entity = JSON.parse(xhr.responseText);
        document.getElementById("rsvp-music").value = entity.music;
        document.getElementById("rsvp-food").value = entity.food;
      } else {
        console.error(xhr.statusText);
        document.getElementById("rsvp").className = "";
      }
    }
  };
  xhr.onerror = function (e) {
    console.error(xhr.statusText);
  };
  xhr.send(null);
}


function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};