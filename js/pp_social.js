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
        window.clientPPname = `${orderData.payer.name.given_name} ${orderData.payer.name.surname}`
        window.clientPPemail = orderData.payer.email_address

        // Show a success message within this page, e.g.
        const element = document.getElementById('paypal-button-container');
        element.innerHTML = '';


        $("#payment-processed-div").load("../html/thanks_social.html");

        // const divAfterPaymentProcessed = document.getElementById('payment-processed-div')
        // divAfterPaymentProcessed.innerHTML = `              
        // <div>
        //   <h3 style="color:green;">Thank you for your payment! It has been processed!</h3>
        //   <h3>Please Follow these steps so that the webmaster at Foobar start's setting up your website</h3>
        //   <h4>Send the following information to zouhirstoic@gmail.com</h4>
        //   <ol>
        //     <li>Name, Associated and used paypal Email</li>
        //     <li>Logo image: Preferably .png format, with a width and height of no less than 200px * 200px</li>
        //     <li>2 Big banner images ideally 1920px * 1280px</li>
        //     <li>For Each Social Media you wish to promote, please provide: web link URLs</li>
        //   </ol>
        //   <span>All comunications going forward will be with zouhirstoic@gmail.com. Invoice, steps, and contact will be sent to the e-mail linked to your paypal as soon as possible. Because we currently do most of our process' manually, the response time can be up to 3 business days. If you require a custom domain, or custom edit, a fee of 10 USD will be charged. The satisfaction of our clients is important, therefor we are sure to suit your needs. Thank you for choosing foobar!</span>
        // </div>
        // `

      });
    },

    onError: function (err) {
      console.log(err);
    }
  }).render('#paypal-button-container');
}
initPayPalButton();