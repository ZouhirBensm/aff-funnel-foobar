
async function ajaxCall3(client_info_to_database){

  // let url = 'http://localhost:8888/HTTP/Foobar/save-client-information-in-db-process/index.php'
  let url = 'https://webdevelopercanada.website/HTTP/Foobar/save-client-information-in-db-process/index.php'
  
  
 $.ajax({
    url: url,
    data: {body: JSON.stringify(client_info_to_database)},
    type: 'POST',
    success: function(response) {
      console.log("\najaxCall3()->response: ", response)
    },
 });
}

