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
      return actions.order.capture().then(async function (orderData) {

        // Full available details
        console.log('Capture result\n', orderData);
        // console.log('Capture result\n', JSON.stringify(orderData, null, 2));

        const clientPPname = `${orderData.payer.name.given_name} ${orderData.payer.name.surname}`
        const clientPPemail = orderData.payer.email_address

        // Show a success message within this page, e.g.
        const ppButtonContainer = document.getElementById('paypal-button-container');
        const contentBlocDiv = document.getElementById('content-bloc-div');

        ppButtonContainer.innerHTML = '';
        contentBlocDiv.innerHTML = '';

        const page_needed = "./html/thanks_social.html"
        const product = "Social Media Hub Website"

        if (orderData.status == 'COMPLETED') {
          await ajaxCall1(page_needed, clientPPname , clientPPemail);
          await ajaxCall2(product, clientPPname , clientPPemail);
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