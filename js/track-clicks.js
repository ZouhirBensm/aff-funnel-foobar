
// Track user clicks

execDeterminator();

function execDeterminator() {

  console.log("execDeterminator")
  var referrer = document.referrer;

  // URL got Copy and Pasted
  if (!referrer) return iterate()

  var referrer_domain = new URL(referrer).hostname;

  // URL got clicked by external domain
  if (referrer_domain === document.location.hostname) return

  return iterate(referrer_domain)
}





async function iterate(referrer_domain = undefined) {

    console.log("iterate")
    // TODO Add refferer tracking later
    // ${referrer_domain? `?referrer_domain=${referrer_domain}`: null}
    // let url = `http://localhost:8888/HTTP/Foobar/track-clicks/foobaropom.php`
    let url = 'https://webdevelopercanada.website/HTTP/Foobar/track-clicks/foobaropom.php'


   $.ajax({
    url: url,
    success: function (response) {
      console.log("track-clicks: registerClickCall()->", response)
      return
    }
  })
}

