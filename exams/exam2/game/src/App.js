import React, { Component } from 'react';
import './App.css';


import { login } from './services';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInProgress: ''
    };
    this.onLogin = this.onLogin.bind(this);
    this.onInputText = this.onInputText.bind(this);
    this.onCheckForLogin = this.onCheckForLogin.bind(this);
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

  componentDidMount() {
  }

  onSend() {
    login({ username: this.state.usernameInProgress, text: this.state.messageInProgress })
    .then( this.updateMessageState )
    .then( this.clearStatus )
    .catch( err => this.addStatus(`Error sending message, try again later`) );
    this.setState({
      messageInProgress: ''
    });
  }

  onCheckForSend(e) {
    if( e.key === "Enter") {
      this.onLogin();
    }
  }

  onInputText(e) {
    const text = e.target.value;
    this.setState({
      usernameInProgress: text
    });
  }

  render() {
    return (
      <div className="app">
        <Login
          onCheckForLogin={this.onCheckForLogin}
          usernameInProgress={this.state.usernameInProgress}
          onInputText={this.onInputText}
          onLogin={this.onLogin}
        />
      </div>
    );
  }
}

export default App;
