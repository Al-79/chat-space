$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="MessageBox" data-message-id=${message.id}>
          <div class="message-one">
            <div class="message-one__top">
              <div class="message-one__name">
                ${message.user_name}
              </div>
              <div class="message-one__time">
                ${message.created_at}
              </div>
            </div>
            <div class="message-one__bottom">
              <p class="Message__content">
                ${message.content}
              </p>
              <img class="Message__image" src="${message.image}">
            </div>
          </div>
        </div>`
      return html;
    } else {
      let html =
        `<div class="MessageBox" data-message-id=${message.id}>
          <div class="message-one">
            <div class="message-one__top">
              <div class="message-one__name">
                ${message.user_name}
              </div>
              <div class="message-one__time">
                ${message.created_at}
              </div>
            </div>
            <div class="message-one__bottom">
              <p class="Message__content">
                ${message.content}
              </p>
            </div>
          </div>
        </div>`
      return html;
    };
  }
  
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main-chat__message-list').append(html);
      $('form')[0].reset();
      $('.main-chat__message-form--send').prop('disabled', false);
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
  })

});
