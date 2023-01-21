function initPayPalButton() {
  paypal.Buttons({
    style: {
      shape: 'rect',
      color: 'blue',
      layout: 'vertical',
      label: 'paypal',

    },

    createOrder: function (data, actions) {
      const desciption = "Social Media Hub Website"
      const amount = 15

      return actions.order.create({
        purchase_units: [{ "description": desciption, "amount": { "currency_code": "USD", "value": amount } }]
      });
    },

    onApprove: function (data, actions) {
      return actions.order.capture().then(function (orderData) {

        // Full available details
        console.log('Capture result\n', orderData);
        // console.log('Capture result\n', JSON.stringify(orderData, null, 2));

        // Show a success message within this page, e.g.
        const ppButtonContainer = document.getElementById('paypal-button-container');
        const contentBlocDiv = document.getElementById('content-bloc-div');

        ppButtonContainer.innerHTML = '';
        contentBlocDiv.innerHTML = '';

        const page_needed = "./html/thanks_social.html"

        if (orderData.status == 'COMPLETED') {

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
        } else {
          $("#payment-processed-div").load("./html/payment_error.html");
        }
        return

      });
    },

    onError: function (err) {
      console.log(err);
    }
  }).render('#paypal-button-container');
}
initPayPalButton();