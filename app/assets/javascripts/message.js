$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-id="${message.id}">
                  <div class="message__upper-info">
                    <p message__upper-info__talker">
                      ${message.user_name}
                    </p>
                    <p class="message__text">
                      ${message.date}
                    </p>
                  </div>
                  <p class="lower-message__content">
                    <div>
                    ${content}
                    </div>
                    ${img}
                  </p>
                </div>`
  return html;
  }
  $('.form__message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = (window.location.href);
    // POSTリクエスト
    console.log(url)
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.submit').prop('disabled', false);
      $('.form__message').val('');

    })
    .fail(function(data){
      alert('error');
    })
    .always(function(data){
      $('.submit').prop('disabled', false);
  })
}) 
})