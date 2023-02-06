// Sends the client an email
async function ajaxCall2(product, clientPPname, clientPPemail){
  // TODO have an environment variable to determin what url to use
  
   // var url = 'http://localhost:8888/HTTP/Foobar/send-client-email-process/index.php'
   var url = 'https://webdevelopercanada.website/HTTP/Foobar/send-client-email-process/index.php'

 $.ajax({
    url: url,
    data: {body: JSON.stringify({"clientPPemail": clientPPemail, "product": product})},
    type: 'POST',
    success: function(response) {
      console.log("\najaxCall2()->response: ", response)
    },
 });
}

