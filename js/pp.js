function initPayPalButton() {
  paypal.Buttons({
    style: {
      shape: 'rect',
      color: 'blue',
      layout: 'vertical',
      label: 'paypal',

    },

    createOrder: function (data, actions) {
      const path = window.location.pathname
      let desciption, amount
      switch (path) {
        case '/linkhubwebsite.html':
          desciption = "Link Hub Website"
          amount = 20
          break;
      case '/socialmediahubwebsite.html':
        desciption = "Social Media Hub Website"
        amount = 15
        break;
        default:
          break;
      }

      return actions.order.create({
        purchase_units: [{ "description": desciption, "amount": { "currency_code": "USD", "value": amount } }]
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


        const path = window.location.pathname
        let page_needed
        switch (path) {
          case '/linkhubwebsite.html':
            page_needed = "./html/thanks_link.html"
            break;
        case '/socialmediahubwebsite.html':
          page_needed = "./html/thanks_social.html"
          break;
          default:
            break;
        }
        
        if (orderData.status == 'COMPLETED'){
          $("#payment-processed-div").load(page_needed);
        } else {
          $("#payment-processed-div").load("./html/payment_error.html");
        }
        
        // Add the names, emails here
        let namesSpans = document.getElementsByClassName('name');
        let emailsSpans = document.getElementsByClassName('email');

        if(!namesSpans && !emailsSpans) return 

        for (let i = 0; i < namesSpans?.length; i++) {
          const name = namesSpans[i];
          name.innerHTML = clientPPname
        }
        for (let i = 0; i < emailsSpans?.length; i++) {
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