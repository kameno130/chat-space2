$(document).on('turbolinks:load', function(){

  var new_message = $(".messages");
  function appendNewMessage(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-id="${message.id}">
                <div class="message__upper-info">
                  <p message__upper-info__talker">
                    ${message.user_name}
                  </p>
                  <p class="message__upper-info__date">
                    ${message.date}
                  </p>
                </div>
                <p class="message__text">
                  <div>
                  ${content}
                  </div>
                  ${img}
                </p>
              </div>`
               new_message.append(html);
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = (window.location.href);
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      appendNewMessage(data);
      $('#new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(data){
      alert('error');
    })
    .always(function(data){
      $('.form__submit').prop('disabled', false);
    })
  })
  

  $(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var reloadMessages = function() {
      last_message_id =$('.message:last').data("id");
      
      var url = "api/messages"
      $.ajax({ 
        url: url, 
        type: 'get', 
        dataType: 'json', 
        data: {id: last_message_id} 
        
      })
      
      .done(function(messages){
        messages.forEach(function(message){
          appendNewMessage(message);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })

      .fail(function() {
        alert('error');
      });
    }

    setInterval(reloadMessages, 5000);
  }
  });
});