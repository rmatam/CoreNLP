
function handleError(message) {
  $( "#q" ).prop('disabled', false);
  $( "#query-button").unbind( "click" );
  $( "#query-button" ).click(function(event) { $( "#form-query" ).submit(); });
  $( "#triples-container").html('<div style="color:red; font-size:xx-large;">ERROR</div> <div style="color: black; font-size: 12pt">(' + message + ')<div>');
}

function querySuccess(elem) {
  return function(response) {
    $( "#q" ).prop('disabled', false);
    $( "#query-button").unbind( "click" );
    $( "#query-button" ).click(function(event) { $( "#form-query" ).submit(); });
//if (response.triples.length > 0) {
//      var gloss = '<table class="triple-table">';
//      for (i = 0; i < response.triples.length; ++i) {
//        gloss += '<tr><td>(</td><td>' + response.triples[i][0] + ';</td>';
  //      gloss += '<td>' + response.triples[i][1] + ';</td>';
    //    gloss += '<td>' + response.triples[i][2] + '</td><td>)</td></tr>';
     // }
      //gloss += '</table>';
      $(elem).html(response.data);
  }
}


$(document).ready(function(){
  jQuery.support.cors = true;

  if ($(window).width() < 650) {
    $( '#fork' ).hide();
  }

  // Justification
  $("#justification-toggle-row").hide();

  // Query submit
  $( "#form-query" ).submit(function( event ) {
    // (don't actually submit anything)
    event.preventDefault();
    // (set the headers)
    $( "#system-header" ).css("visibility", "visible");
    // (create a default if not input was given)
    if ( $( '#q' ).val().trim() == '') { $( '#q' ).val('faeries are dancing in the field where I lost my bike.'); }
    // (start loading icon)
    $( '#triples-container' ).html('loading...');
    // (submission data)
    target = $(this).attr('action');
    getData = $(this).serialize();
    value = $( "#q" ).val();
    // (disable query button
    $( "#q" ).prop('disabled', true);
    $( "#query-button").unbind( "click" );
    // (ajax request)
    $.ajax({
      url: 'spied/',
      data: getData,
      dataType: 'json',
      success: querySuccess("#triples-container")
    });
  });


  // Query button
  $( "#query-button" ).mousedown(function(event) {
    $( '#query-button' ).css('background', 'darkgray');
  });
  $( document ).mouseup(function(event) {
    $( '#query-button' ).css('background', '');
  });
  $( "#query-button" ).click(function(event) { $( "#form-query" ).submit(); });
});
