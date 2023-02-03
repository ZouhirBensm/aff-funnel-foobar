// Place Thank you page, and place user's name and email in HTML
async function ajaxCall4(page_needed, subscriptionID){
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
    let subISSpans = document.getElementsByClassName('sub_id');


    for (let i = 0; i < subISSpans?.length; i++) {
      const subID = subISSpans[i];
      subID.innerHTML = subscriptionID
    }

    return
  })
}