// Chat.js


( function iife() {

  const messages = [];

  const user = 'Me';

  function setupPage() {
    bindSendAction();
    getMessageList()
    .then( () => renderMessageList() );
  }

  function getMessageList() {
    return fetch('/messages')
    .then( response => response.json() )
    .then( json => messages.push( ...json ) )
    .then( () => console.log('get messages done') );
  }

  function bindSendAction() {
    const button = document.querySelector('.send-message');
    button.addEventListener('click', sendMessage );
    const input = document.querySelector('.new-message');
    input.addEventListener('keypress', event => {
      if(event.key === 'Enter') {
        sendMessage();
      }
    });
  }

  function sendMessage() {
    const input = document.querySelector('.new-message');
    const text = input.value;
    send(text, user);
    input.value = '';
  }

  function send( text, user) {
    updateMessageList( text, user );
    sendMessageToServer( text, user );
  }

  function updateMessageList( text, user ) {
    messages.push( { from: user, text });
    renderMessageList();
  }

  function renderMessageList() {
    const pageMessages = document.querySelector('.messages');
    let output = '';
    messages.forEach( message => {
      output += `<li class="message"><span class="user">${message.from}</span> <span class="text">${message.text}</span></li>`;
    });
    pageMessages.innerHTML = output;
  }

  function sendMessageToServer( text, user) {
    fetch('/messages', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({ from: user, text })
    })
    .then( () => console.log('new message sent') );
  }

  setupPage();
})();

