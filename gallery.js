function supports_history_api() {
  return !!(window.history && history.pushState);
}

function swapPhoto(href) {
  var req = new XMLHttpRequest();
  req.open("GET",
           "https://merinhunter.github.io/X-Nav-5.7.18-HistoryAPI/gallery/" +
             href.split("/").pop(),
           false);
  req.send(null);
  if (req.status == 200) {
    document.getElementById("gallery").innerHTML = req.responseText;
    setupHistoryClicks();
    return true;
  }
  return false;
}

function addClicker(link) {
  link.addEventListener("click", function(e) {
    if (swapPhoto(link.href)) {
      history.pushState(null, null, link.href);
      e.preventDefault();
    }
  }, true);
}

function setupHistoryClicks() {
  addClicker(document.getElementById("photonext"));
  addClicker(document.getElementById("photoprev"));
}

window.onload = function() {
  if (Modernizr.history) {
    setupHistoryClicks();
    window.setTimeout(function() {
      window.addEventListener("popstate", function(e) {
        swapPhoto(location.pathname);
      }, false);
    }, 1);
  }
}
