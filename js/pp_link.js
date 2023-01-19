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
        purchase_units: [{ "description": "Link Hub Website", "amount": { "currency_code": "USD", "value": 20 } }]
      });
    },

    onApprove: function (data, actions) {
      return actions.order.capture().then(function (orderData) {

        // Full available details
        console.log('Capture result\n', orderData);
        // console.log('Capture result\n', JSON.stringify(orderData, null, 2));
        var clientPPname = `${orderData.payer.name.given_name} ${orderData.payer.name.surname}`
        var clientPPemail = orderData.payer.email_address

        // Show a success message within this page, e.g.
        const element = document.getElementById('paypal-button-container');
        element.innerHTML = '';

        $("#payment-processed-div").load("../html/thanks_link.html");

      });
    },

    onError: function (err) {
      console.log(err);
    }
  }).render('#paypal-button-container');
}
initPayPalButton();