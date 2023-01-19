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

        if (orderData.status == 'COMPLETED') {

          $.ajax({
            url: page_needed,
            success: function (data) {
              // Get the parent element where the HTML should be inserted
              var parent = document.getElementById("payment-processed-div");
              // Insert the HTML into the parent element
              parent.innerHTML = data;
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

          console.log("Done ajax");
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