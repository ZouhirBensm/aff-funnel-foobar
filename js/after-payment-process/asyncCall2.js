// var url = 'http://localhost:8888/HTTP/Foobar/send-client-email-process/index.php'
var url = 'https://webdevelopercanada.website/HTTP/Foobar/send-client-email-process/index.php'

// Place Thank you page, and place user's name and email in HTML
async function ajaxCall2(product, clientPPname, clientPPemail){
 $.ajax({
    url: url,
    data: {body: JSON.stringify({"clientPPemail": clientPPemail, "product": product})},
    type: 'POST',
    success: function(response) {
       alert(response);
    },
 });
}

