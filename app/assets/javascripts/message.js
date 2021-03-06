  $(function(){
    function buildHTML(message){
      if ( message.image ) {
        var html =
         `<div class="message" data-message-id=${message.id}>
            <div class="upper-message">
              <div class="upper-message__user-name">
                ${message.user_name}
              </div>
              <div class="upper-message__date">
                ${message.datetime}
              </div>
            </div>
            <div class="lower-message">
              <p class="lower-message__content">
                ${message.text}
              </p>
            </div>
            <asset_path src=${message.image} >
          </div>`
        return html;
      } else {
        var html =
         `<div class="message" data-message-id=${message.id}>
            <div class="upper-message">
              <div class="upper-message__user-name">
                ${message.user_name}
              </div>
              <div class="upper-message__date">
                ${message.datetime}
              </div>
            </div>
            <div class="lower-message">
              <p class="lower-message__content">
                ${message.text}
              </p>
            </div>
          </div>`
        return html;
      };
    }
$('.js-form').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
 .done(function(data){
   var html = buildHTML(data);
   $('.messages').append(html);
   $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
   $('form')[0].reset();
 })
  .fail(function(){
    alert('error');
  });
  return false;
});
  var interval = setInterval(function(){
    var current_url = window.location.href;
    var new_message = $('.message').last().attr('message-id');

    if(current_url.match(/\/groups\/\d+\/messages/)){

      $.ajax({
        url: current_url,
        type: "GET",
        data: {id: new_message},
        dataType: 'json',
      })

      .done(function(otherMessages){
        var insertHTML = ""
        otherMessages.forEach(function(message){
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
        })
      })
    }
  },5000);
});
