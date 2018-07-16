import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import GameListAndNewGame from './GameListAndNewGame'

import { sendUser, deleteUser } from './services';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      users: ['Jane', 'Bob'],
      userInProgress: '',
    };
    this.login = this.login.bind(this);
    this.onInputUsername = this.onInputUsername.bind(this);
    this.onCheckForLogin = this.onCheckForLogin.bind(this);

    this.logout = this.logout.bind(this);
  }

  login() {
    this.setState({
      currentUser: this.state.userInProgress
    });
    sendUser({ user: this.state.userInProgress });
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

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  logout() {
    deleteUser({ user: this.state.currentUser })
    .then( this.updateUserState )
    this.setState({
      userInProgress: '',
      currentUser: ''
    });
    }

  render() {
    if (this.state.currentUser !== '') {
      return (
        <div className="app">
          <GameListAndNewGame/>
          <button className="logout" onClick={this.logout}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="app">
          <Login
            onCheckForLogin={this.onCheckForLogin}
            userInProgress={this.state.userInProgress}
            onInputUsername={this.onInputUsername}
            login={this.login}
            />
        </div>
      );
    }
  }
}

export default App;
