$(document).on('turbolinks:load', function(){ 

  var search_list = $("#user-search-result");

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                </div>`;
      search_list.append(html);
  }

  function appendNoUser(user){
    var html = `<div class='chat-group-user clearfix'>${ user }</div>`
    search_list.append(html);
  }
 
  var group_list = $("#chat-group-users");

  function appendMenber(id, name){
    var html =`<div id='chat-group-users'>
               <div class='chat-group-user clearfix js-chat-member' id='${id}'>
               <input name='group[user_ids][]' type='hidden' value='${id}'>
                <p class='chat-group-user__name'>${name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
               </div>`;
      group_list.append(html);
  }


$("#user-search-field").on("keyup", function() {
  var input = $("#user-search-field").val();
  $.ajax({
    type: 'GET',
    url: '/users',
    data: { keyword: input },
    dataType: 'json'
  })
  .done(function(users){
    $("#user-search-result").empty();
    if (users.length !== 0) {
      users.forEach(function(user){
        appendUser(user);
      });
    }
    else {
      appendNoUser("一致するユーザはいません");
    }
  })
  .fail(function() {
    alert('error');
  });
});


$(document).on("click",".user-search-add", function() {
  $('#chat-group-users').val();
  var id = $(this).data('user-id');
  var name= $(this).data('user-name');
  appendMenber(id, name);
  $(this).parent().remove();


});
$(document).on("click", ".user-search-remove", function (){
  $(this).parent().remove();
})

});