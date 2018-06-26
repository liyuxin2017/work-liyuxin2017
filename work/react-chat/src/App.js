import React, { Component } from 'react';
import './App.css';
import UserList from './UserList';
import MessageList from './MessageList';
import SendMessage from './SendMessage';
import StatusMessage from './StatusMessage';
import Login from './Login';

import { getMessages, sendMessage, sendUser, deleteUser } from './services';

// import api from './service-calls';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      users: ['Jane', 'Bob'],
      messages: [
        { from: 'Jane', text: 'Is this thing on?' },
        { from: 'Jane', text: 'Yay! It works!' },
        { from: 'Bob', text: 'I can see your messages, do you see me?' },
      ],
      messageInProgress: '',
      userInProgress: '',
      timer: null
    };
    this.onSend = this.onSend.bind(this);
    this.onInputText = this.onInputText.bind(this);
    this.onCheckForSend = this.onCheckForSend.bind(this);
    this.updateMessageState = this.updateMessageState.bind(this);
    this.addStatus = this.addStatus.bind(this);
    this.clearStatus = this.clearStatus.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.onInputUsername = this.onInputUsername.bind(this);
    this.onCheckForLogin = this.onCheckForLogin.bind(this);
    this.startPolling = this.startPolling.bind(this);
  }

  login() {
    this.setState({
      currentUser: this.state.userInProgress
    });
    sendUser({ user: this.state.userInProgress })
    .then( this.startPolling )
    .then( this.clearStatus )
    .catch( err => this.addStatus(`Error login, try again later`) );
    this.setState({
      userInProgress: ''
    });
  }

  onCheckForLogin(e) {
    if( e.key === "Enter" && e.target.value.length !== 0) {
      this.login();
    }
  }

  onInputUsername(e) {
    const user = e.target.value;
    if ( user.length === 0 ) {

    }
    this.setState({
      userInProgress: user
    });
  }

  updateUserState(users) {
    this.setState( {
      users: users.user
    });
  }

  addStatus( status ) {
    this.setState({
      status
    });
  }

  clearStatus() {
    this.addStatus('');
  }

  updateMessageState( allMessages ) {
    this.setState( {
      messages: allMessages.messages,
      users: allMessages.users
    });
  }

  componentDidMount() {
     getMessages()
     .then( this.updateMessageState )
     .catch( err => this.addStatus(`Error loading messages, try again later`) );
  }

  componentWillUnmount() {
    if (this.state.currentUser === '') {
      clearInterval(this.state.timer);
    }
  }

  startPolling() {
    if (this.state.currentUser !== '') {
      this.setState({
        timer: setInterval (()=>{
            getMessages()
            .then( this.updateMessageState )
            .catch( err => this.addStatus(`Error loading messages, try again later`) );
        }, 3000)
      });
    }
  }


  onSend() {
    // Note: These are two separate async calls, what if service call fails?
    sendMessage({ from: this.state.currentUser, text: this.state.messageInProgress })
    .then( this.updateMessageState )
    .then( this.clearStatus )
    .catch( err => this.addStatus(`Error sending message, try again later`) );
    this.setState({
      messageInProgress: ''
    });
  }

  logout() {
    deleteUser({ user: this.state.currentUser })
    .then( this.updateUserState )
    .then( this.clearStatus )
    .catch( err => this.addStatus(`Error logout, try again later`) );
    this.setState({
      userInProgress: '',
      currentUser: ''
    },
    () => {
      if (this.state.currentUser === '') {
        clearInterval(this.state.timer);
      }});
    }

  onCheckForSend(e) {
    if( e.key === "Enter" && e.target.value.length !== 0) {
      this.onSend();
    }
  }

  onInputText(e) {
    const text = e.target.value;
    if ( text.length === 0 ) {

    }
    this.setState({
      messageInProgress: text
    });
  }

  render() {
    return (
      <div className="app">
        <Login
          onCheckForLogin={this.onCheckForLogin}
          userInProgress={this.state.userInProgress}
          onInputUsername={this.onInputUsername}
          login={this.login}
          currentUser={this.state.currentUser}
        />
        <div className="display-area">
          <UserList users={this.state.users}/>
          <MessageList
            messages={this.state.messages}
            currentUser={this.state.currentUser}
            />
        </div>
        <StatusMessage message={this.state.status}/>
        <SendMessage
          onCheckForSend={this.onCheckForSend}
          messageInProgress={this.state.messageInProgress}
          onInputText={this.onInputText}
          onSend={this.onSend}
          logout={this.logout}
          currentUser={this.state.currentUser}
        />
      </div>
    );
  }
}

export default App;
