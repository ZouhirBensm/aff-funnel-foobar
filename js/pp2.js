function initPayPalButton() {
  var shipping = 0;
  var itemOptions = document.querySelector("#smart-button-container #item-options");
  var quantity = parseInt();
  var quantitySelect = document.querySelector("#smart-button-container #quantitySelect");
  if (!isNaN(quantity)) {
    quantitySelect.style.visibility = "visible";
  }
  var orderDescription = 'Link Hub Website';
  if (orderDescription === '') {
    orderDescription = 'Item';
  }
  paypal.Buttons({
    style: {
      shape: 'rect',
      color: 'blue',
      layout: 'vertical',
      label: 'paypal',

    },
    createOrder: function (data, actions) {
      var selectedItemDescription = itemOptions.options[itemOptions.selectedIndex].value;
      var selectedItemPrice = parseFloat(itemOptions.options[itemOptions.selectedIndex].getAttribute("price"));
      var tax = (0 === 0 || false) ? 0 : (selectedItemPrice * (parseFloat(0) / 100));
      if (quantitySelect.options.length > 0) {
        quantity = parseInt(quantitySelect.options[quantitySelect.selectedIndex].value);
      } else {
        quantity = 1;
      }

      tax *= quantity;
      tax = Math.round(tax * 100) / 100;
      var priceTotal = quantity * selectedItemPrice + parseFloat(shipping) + tax;
      priceTotal = Math.round(priceTotal * 100) / 100;
      var itemTotalValue = Math.round((selectedItemPrice * quantity) * 100) / 100;

      return actions.order.create({
        purchase_units: [{
          description: orderDescription,
          amount: {
            currency_code: 'USD',
            value: priceTotal,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: itemTotalValue,
              },
              shipping: {
                currency_code: 'USD',
                value: shipping,
              },
              tax_total: {
                currency_code: 'USD',
                value: tax,
              }
            }
          },
          items: [{
            name: selectedItemDescription,
            unit_amount: {
              currency_code: 'USD',
              value: selectedItemPrice,
            },
            quantity: quantity
          }]
        }]
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
        const ppSmartButtonContainer = document.getElementById('smart-button-container');
        const contentBlocDiv = document.getElementById('content-bloc-div');

        ppSmartButtonContainer.innerHTML = '';
        contentBlocDiv.innerHTML = '';


        let page_needed;
        let product;
        switch (orderData.purchase_units[0]?.amount.value) {
          case '20.00':
            page_needed = "./html/thanks_link_20.html"
            product = "Link Hub Website"
            break;
          case '70.00':
            page_needed = "./html/thanks_link_70.html"
            product = "Link Hub Website with payment processors pages for all links"
            break;
          default:
            page_needed = "./html/thanks_link.html"
            break;
        }

        const client_info_to_database = {
          date_time: orderData.create_time,
          client_country: orderData.payer.address.country_code,
          email: orderData.payer.email_address,
          first_name: orderData.payer.name.given_name,
          last_name: orderData.payer.name.surname,
          transaction_amount: orderData.purchase_units[0].amount.value,
          item_name: orderData.purchase_units[0].description,
          transaction_currency_code: orderData.purchase_units[0].amount.currency_code,
        }


        if (orderData.status == 'COMPLETED') {
          await ajaxCall1(page_needed, clientPPname , clientPPemail);
          await ajaxCall2(product, clientPPname , clientPPemail);
          await ajaxCall3(client_info_to_database);
        } else {
          $("#payment-processed-div").load("./html/payment_error.html");
        }
        return
      });
    },
    onError: function (err) {
      console.log(err);
    },
  }).render('#paypal-button-container');
}
initPayPalButton();