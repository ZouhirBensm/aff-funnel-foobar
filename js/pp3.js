const PP_PLAN_ID_DIV = document.getElementsByClassName("pp")
const split = PP_PLAN_ID_DIV[0].id.split("-")

const PP_PLAN_ID = `${split[3]}-${split[4]}`
console.log(PP_PLAN_ID)

paypal.Buttons({
  style: {
    shape: 'rect',
    color: 'white',
    layout: 'vertical',
    label: 'subscribe'
  },
  createSubscription: function (data, actions) {
    return actions.subscription.create({
      /* Creates the subscription */
      plan_id: PP_PLAN_ID
    });
  },
  onApprove: async function (data, actions) {
    console.log(data, actions); // You can add optional success message for the subscriber here

    const subscriptionID = data.subscriptionID

    // Show a success message within this page, e.g.
    const ppButtonContainer = document.getElementById(PP_PLAN_ID_DIV[0].id);
    const contentBlocDiv = document.getElementById('content-bloc-div');

    ppButtonContainer.innerHTML = '';
    contentBlocDiv.innerHTML = '';

    const page_needed = "./html/thanks_emailauto.html"
    const product = "Email Automation"


    if (data) {
      await ajaxCall4(page_needed, subscriptionID);
    } else {
      $("#payment-processed-div").load("./html/payment_error.html");
    }
    return

  }
}).render(`#${PP_PLAN_ID_DIV[0].id}`); // Renders the PayPal button