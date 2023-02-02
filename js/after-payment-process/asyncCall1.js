// Place Thank you page, and place user's name and email in HTML
async function ajaxCall1(page_needed, clientPPname ,clientPPemail){
  $.ajax({
    url: page_needed,
    success: function (data) {
      // Get the paymentProcessedDiv element where the HTML should be inserted
      var paymentProcessedDiv = document.getElementById("payment-processed-div");
      // Insert the HTML into the paymentProcessedDiv element
      paymentProcessedDiv.innerHTML = data;
      return
    }
  })
  .then(() => {
    // Add the names, emails here
    let namesSpans = document.getElementsByClassName('name');
    let emailsSpans = document.getElementsByClassName('email');


    for (let i = 0; i < namesSpans?.length; i++) {
      const name = namesSpans[i];
      name.innerHTML = clientPPname
    }
    for (let i = 0; i < emailsSpans?.length; i++) {
      const email = emailsSpans[i];
      email.innerHTML = clientPPemail
    }

    return
  })
}