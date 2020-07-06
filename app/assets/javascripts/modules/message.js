$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="main-contents__chat-space__text" data-message-id=${message.id}>
          <div class="main-contents__chat-space__text__user">
            <div class="main-contents__chat-space__text__user__name">
              ${message.user_name}
            </div>
            <div class="main-contents__chat-space__text__user__time">
              ${message.created_at}
            </div>
          </div>
          <div class="main-contents__chat-space__text__coment">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="main-contents__chat-space__text" data-message-id=${message.id}>
        <div class="main-contents__chat-space__text__user">
          <div class="main-contents__chat-space__text__user__name">
            ${message.user_name}
          </div>
          <div class="main-contents__chat-space__text__user__time">
            ${message.created_at}
          </div>
        </div>
        <div class="main-contents__chat-space__text__coment">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $(".Form").on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main-contents__chat-space').append(html);
      $('.main-contents__chat-space').animate({ scrollTop: $('.main-contents__chat-space')[0].scrollHeight}); 
      $('.main-contents__text-form__submit').removeAttr('disabled');     
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.main-contents__text-form__submit').prop("disabled", false);
    });
  });


  
});