import React, { Component } from 'react';
import './App.css';
import UserList from './UserList';
import MessageList from './MessageList';
import SendMessage from './SendMessage';
import StatusMessage from './StatusMessage';

import { getMessages, sendMessage } from './services';

// import api from './service-calls';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: Math.floor(Math.random() * 1000),
      users: ['Jane', 'Bob'],
      messages: [
        { from: 'Jane', text: 'Is this thing on?' },
        { from: 'Jane', text: 'Yay! It works!' },
        { from: 'Bob', text: 'I can see your messages, do you see me?' },
      ],
      messageInProgress: ''
    };
    this.onSend = this.onSend.bind(this);
    this.onInputText = this.onInputText.bind(this);
    this.onCheckForSend = this.onCheckForSend.bind(this);
    this.updateMessageState = this.updateMessageState.bind(this);
    this.addStatus = this.addStatus.bind(this);
    this.clearStatus = this.clearStatus.bind(this);
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

  onCheckForSend(e) {
    if( e.key === "Enter") {
      this.onSend();
    }
  }

  onInputText(e) {
    const text = e.target.value;
    this.setState({
      messageInProgress: text
    });
  }

  render() {
    return (
      <div className="app">
        <div className="display-area">
          <UserList users={this.state.users}/>
          <MessageList messages={this.state.messages}/>
        </div>
        <StatusMessage message={this.state.status}/>
        <SendMessage
          onCheckForSend={this.onCheckForSend}
          messageInProgress={this.state.messageInProgress}
          onInputText={this.onInputText}
          onSend={this.onSend}
        />
      </div>
    );
  }
}

export default App;
