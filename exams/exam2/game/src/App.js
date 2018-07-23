import React, { Component } from 'react';
import './App.css';
import UserList from './UserList';
import GameList from './GameList';
import NewGame from './NewGame';
import StatusMessage from './StatusMessage';
import Login from './Login';
import TicTacToe from './TicTacToe';

import { getGames, sendGame, sendUser, deleteUser, sendLastMove, getMoves, deleteMove } from './services';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser : '',
      users : [''],
      games : [''],
      gameInProgress : '',
      userInProgress : '',
      timer : null,
      inGame : '',
      movesShown : ['','','','','','','','',''],
      turn : true,
      winner : ''
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
    this.sendMove = this.sendMove.bind(this);
    this.enterGame = this.enterGame.bind(this);
    this.updateMoves = this.updateMoves.bind(this);
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

  updateMoves(move) {
    let tempMoves = this.state.movesShown;
    move.moves.forEach((currentMove, index) => {
      if (move.host === this.state.currentUser) {
        if (currentMove.user === this.state.currentUser) {
          tempMoves[parseInt(currentMove.move.substring(7), 10)] = 'x';
        } else {
          tempMoves[parseInt(currentMove.move.substring(7), 10)] = 'o';
        }
      } else {
        if (currentMove.user === this.state.currentUser) {
          tempMoves[parseInt(currentMove.move.substring(7), 10)] = 'o';
        } else {
          tempMoves[parseInt(currentMove.move.substring(7), 10)] = 'x';
        }
      }
    });
    if (move.turn !== this.state.currentUser) {
      this.setState({
        turn : false,
        movesShown : tempMoves
      });
    } else {
      this.setState({
        turn : true,
        movesShown : tempMoves
      });
    }
    if (move.winner !== '') {
      let lastGame = this.state.inGame;
      if (move.winner === this.state.currentUser) {
        this.setState({winner : 'you win!'});
      } else {
        this.setState({winner : 'you lose!'});
      }
        this.setState({
          inGame : ''
        });
      deleteMove(lastGame)
      .then(() => {
        this.setState({
          winner : ''
        });
      });
    }
  }

  componentDidMount() {
     getGames()
     .then( this.updateGameState )
     .catch( err => this.addStatus(`Error loading games, try again later`) );

     getMoves(this.state.inGame)
     .then(this.updateMoves)
     .catch( err => this.addStatus(`Error moves, try again later`) );
  }

  componentWillUnmount() {
    if (this.state.currentUser === '') {
      clearInterval(this.state.timer);
      clearInterval(this.state.timer2);
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

    this.setState({
      timer2 : setInterval (()=>{
        if (this.state.inGame !== '') {
          getMoves(this.state.inGame)
          .then( this.updateMoves )
          .catch( err => this.addStatus(`wait to start`) );
        }
      }, 500)
    });
  }


  onSend() {
    sendGame({ user: this.state.currentUser, game: this.state.gameInProgress })
    .then( this.updateGameState )
    .then( this.clearStatus )
    .catch( err => this.addStatus(`Error sending game, try again later`) );
    this.setState({
      gameInProgress: '',
      inGame: this.state.gameInProgress
    });
  }

  logout() {
    deleteUser({ user: this.state.currentUser })
    .then( this.updateUserState )
    .then( this.clearStatus )
    .catch( err => this.addStatus(`Error logout, try again later`) );
    this.setState({
      userInProgress: '',
      currentUser: '',
      inGame: ''
    },
    () => {
      if (this.state.currentUser === '') {
        clearInterval(this.state.timer);
        clearInterval(this.state.timer2);
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

  sendMove(e) {
    sendLastMove({user : this.state.currentUser, move : e.target.className}, this.state.inGame)
    .then(this.updateMoves)
    .catch( err => this.addStatus(`Error move, try again later`) );
  }

  enterGame(e) {
    this.setState({
      inGame: e.target.className
    });
    sendGame({ user: this.state.currentUser, game: e.target.className });
  }

  render() {
    if (this.state.inGame !== '') {
      return (
        <TicTacToe
          logout={this.logout}
          moves={this.state.movesShown}
          sendMove={this.sendMove}
          turn={this.state.turn}
          movesShown={this.state.movesShown}
          />
      );
    } else {
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
            <div className="game-result">{this.state.winner}</div>
            <div className="display-area">
              <UserList users={this.state.users}/>
              <GameList
                games={this.state.games}
                enterGame={this.enterGame}
              />
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
}

export default App;
