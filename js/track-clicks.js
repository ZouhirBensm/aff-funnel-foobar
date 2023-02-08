// TODO adjust font size level depending on zoom level
// var zoomLevel = window.devicePixelRatio;
// console.log("Zoom level: " + zoomLevel);

execDeterminator();
// Track user clicks
function execDeterminator() {

  // console.log("execDeterminator")
  var referrer = document.referrer;

  // URL got Copy and Pasted
  if (!referrer) return iterate()

  var referrer_domain = new URL(referrer).hostname;

  // URL referrer is internal domain
  if (referrer_domain === document.location.hostname) {
    if(window.location.pathname !== '/') return iterate()
    return
  } else {
    // URL got clicked by external domain
    return iterate()
  }
  
}





async function iterate() {

    // console.log("iterate")

    // TODO Add refferer tracking later
    // ${referrer_domain? `?referrer_domain=${referrer_domain}`: null}

    // let url = `http://localhost:8888/HTTP/Foobar/track-clicks/foobaropom.php`
    let url = `https://webdevelopercanada.website/HTTP/Foobar/track-clicks/foobaropom.php`


  $.ajax({
    url: url,
    data: {body: JSON.stringify({pathname: window.location.pathname})},
    type: 'POST',
    success: function(response) {
      console.log("track-clicks: registerClickCall()->", response)
      return
    },
 });
}

