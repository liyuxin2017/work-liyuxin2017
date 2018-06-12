( function iife() {

  let messages = [];

  let users = [];

  let currentUser = '';

  let intervalCode = 0;

  function setupPage() {
    bindSendAction();
    bindLoginAction();
    bindLogoutAction();
    getMessageList()
    .then( () => renderMessageList() );
  }
  function startPolling() {
    intervalCode = setInterval(function() {
      getMessageList()
      .then( () => renderMessageList() );
    },"3000");
  }

  function stopPolling() {
    clearInterval(intervalCode);
  }

  function bindLogoutAction() {
    const button = document.querySelector('.logout-button');
    button.addEventListener('click', logout);
  }

  function logout() {
    const label = document.querySelector('.login-label');
    label.classList.remove("display-none");
    document.querySelector('.loadingText').remove();
    deleteCurrentUser(currentUser, logoutFinished);
  }

  function logoutFinished() {
    const loginDiv = document.querySelector('.login-box');
    loginDiv.classList.remove("display-none");
    const logoutDiv = document.querySelector('.logout-box');
    logoutDiv.classList.add("display-none");
    bindLoginAction();
    bindSendAction();
    stopPolling();
  }

  function deleteCurrentUser(user, callback) {
    fetch('/login', {
      method: 'DELETE',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({ user: user})
    })
    .then( () => console.log('logout') );
    callback();
  }

  function bindLoginAction() {
    const button = document.querySelector('.login-button');
    const input = document.querySelector('.login-input');
    button.disabled = true;
    input.addEventListener('keyup', event => {
      if(input.value.length == 0) {
        button.disabled = true;
      }else{
        button.disabled = false;
        if(event.key === 'Enter') {
          login();
        }
      }
    });
    button.addEventListener('click', login);
  }

  function login() {
    const label = document.querySelector('.login-label');
    const div = document.querySelector('.login-box');
    const input = document.querySelector('.login-input');
    const text = input.value;
    currentUser = text;
    label.classList.add("display-none");
    div.innerHTML += '<span class="loadingText">Loading</span>';
    sendUserToServer(text, loginFinished);
  }

  function loginFinished() {
    startPolling();
    bindLogoutAction();
    bindSendAction();
    getMessageList()
    .then( () => renderMessageList() );
    const loginDiv = document.querySelector('.login-box');
    loginDiv.classList.add("display-none");
    const logoutDiv = document.querySelector('.logout-box');
    logoutDiv.classList.remove("display-none");
    const input = document.querySelector('.new-message');
    const sendBtn = document.querySelector('.send-message');
    if (input.value.length != 0){
      sendBtn.disabled = false;
    }
    input.disabled = false;
  }

  function sendUserToServer(user, callback) {
    fetch('/login', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({ user: user})
    })
    .then( () => console.log('user sent') );
    callback();
  }

  function getMessageList() {
    return fetch('/messages')
    .then( response => response.json() )
    .then( json => {messages = JSON.parse(json.messages); users = JSON.parse(json.users);} )
    .then( () => console.log('get messages done') );
  }

  function bindSendAction() {
    const button = document.querySelector('.send-message');
    const input = document.querySelector('.new-message');
    button.disabled = true;
    input.disabled = true;
    button.addEventListener('click', sendMessage );
    input.addEventListener('keyup', event => {
      if(input.value.length == 0) {
        button.disabled = true;
      }else{
        button.disabled = false;
        if(event.key === 'Enter') {
          sendMessage();
        }
      }
    });
  }

  function sendMessage() {
    const input = document.querySelector('.new-message');
    const text = input.value;
    send(text, currentUser);
    input.value = '';
    bindSendAction();
    input.disabled = false;
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
    const messagesArea = document.querySelector('.message-area');
    let output = '';
    messages.forEach( message => {
      if (message.from == currentUser){
        output += `<li class="message"><span class="user currentUser">${message.from}</span> <span class="text currentUser">${message.text}</span></li>`;
      }else{
        output += `<li class="message"><span class="user">${message.from}</span> <span class="text">${message.text}</span></li>`;
      }
    });
    pageMessages.innerHTML = output;
    messagesArea.scrollTop = 1000;
    const pageUsers = document.querySelector('.user-list');
    output = '<div class="user-login">Users</div>';
    users.forEach( user => {
      output += `<div class="user-login">${user.user}</div>`;
    });
    pageUsers.innerHTML = output;
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
