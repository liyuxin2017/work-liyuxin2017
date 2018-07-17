import React, { Component } from 'react';
import './App.css';
import UserList from './UserList';
import GameList from './GameList';
import NewGame from './NewGame';
import StatusMessage from './StatusMessage';
import Login from './Login';

import { getGames, sendGame, sendUser, deleteUser } from './services';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      users: [''],
      games: [''],
      gameInProgress: '',
      userInProgress: '',
      timer: null
    };
    this.onSend = this.onSend.bind(this);
    this.onInputText = this.onInputText.bind(this);
    this.onCheckForSend = this.onCheckForSend.bind(this);
    this.updateGameState = this.updateGameState.bind(this);
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

  updateGameState( allGames ) {
    this.setState( {
      games: allGames.games,
      users: allGames.users
    });
  }

  componentDidMount() {
     getGames()
     .then( this.updateGameState )
     .catch( err => this.addStatus(`Error loading games, try again later`) );
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
            getGames()
            .then( this.updateGameState )
            .catch( err => this.addStatus(`Error loading games, try again later`) );
        }, 3000)
      });
    }
  }


  onSend() {
    sendGame({ user: this.state.currentUser, game: this.state.gameInProgress })
    .then( this.updateGameState )
    .then( this.clearStatus )
    .catch( err => this.addStatus(`Error sending game, try again later`) );
    this.setState({
      gameInProgress: ''
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
    const game = e.target.value;
    if ( game.length === 0 ) {

    }
    this.setState({
      gameInProgress: game
    });
  }

  render() {
    if (this.state.currentUser === '') {
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
    } else {
      return (
        <div className="app">
          <div className="display-area">
            <UserList users={this.state.users}/>
            <GameList games={this.state.games}/>
          </div>
          <StatusMessage message={this.state.status}/>
          <NewGame
            onCheckForSend={this.onCheckForSend}
            nameInProgress={this.state.gameInProgress}
            onInputText={this.onInputText}
            onSend={this.onSend}
            logout={this.logout}
          />
        </div>
      );
    }
  }
}

export default App;
