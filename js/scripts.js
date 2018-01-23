$(document).ready(function() {
     $("#demo").html("Hello, World!");

	$.ajax({
            headers: { "Accept": "application/json"},
            type: 'GET',
            url: 'https://badge.buildkite.com/09e5e28a6a3a8dd422e986e7e71902cf071f1f6af8d715b9cf.json?branch=master',
            crossDomain: true,
            beforeSend: function(xhr){
                xhr.withCredentials = true;
          },
            success: function(data, textStatus, request){
                console.log(data);
            }
 });

});