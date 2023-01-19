// TODO to delete entire file
function initPayPalButton() {
  paypal.Buttons({
    style: {
      shape: 'rect',
      color: 'blue',
      layout: 'vertical',
      label: 'paypal',

    },

    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [{ "description": "Social Media Hub Website", "amount": { "currency_code": "USD", "value": 15 } }]
      });
    },

    onApprove: function (data, actions) {
      return actions.order.capture().then(function (orderData) {

        // Full available details
        console.log('Capture result\n', orderData);
        // console.log('Capture result\n', JSON.stringify(orderData, null, 2));
        const clientPPname = `${orderData.payer.name.given_name} ${orderData.payer.name.surname}`
        const clientPPemail = orderData.payer.email_address

        // Show a success message within this page, e.g.
        const ppButtonContainer = document.getElementById('paypal-button-container');
        ppButtonContainer.innerHTML = '';


        if (orderData.status == 'COMPLETED') {
          $("#payment-processed-div").load("./html/thanks_social.html");
        } else {
          $("#payment-processed-div").load("./html/payment_error.html");
        }

        // Add the names, emails here
        let namesSpans = document.getElementsByClassName('name');
        for (let i = 0; i < namesSpans.length; i++) {
          const name = namesSpans[i];
          name.innerHTML = clientPPname
        }
        let emailsSpans = document.getElementsByClassName('email');
        for (let i = 0; i < emailsSpans.length; i++) {
          const email = emailsSpans[i];
          email.innerHTML = clientPPemail
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