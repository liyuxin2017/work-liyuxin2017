import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import NewContact from './NewContact';
import ContactList from './ContactList';

import { sendUser, deleteUser, sendNewContact, getContactList, deleteContact } from './services';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser : '',
      userInProgress : '',
      firstNameInProgress : '',
      lastNameInProgress : '',
      phoneInProgress : '',
      emailInProgress : '',
      timer : null,
      currentFocusContact : '',
      contactList : [],
      contactIndexEdited : ''
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.onInputUsername = this.onInputUsername.bind(this);
    this.onCheckForLogin = this.onCheckForLogin.bind(this);
    this.startPolling = this.startPolling.bind(this);
    this.onInputFirstName = this.onInputFirstName.bind(this);
    this.onInputLastName = this.onInputLastName.bind(this);
    this.onInputPhone = this.onInputPhone.bind(this);
    this.onInputEmail = this.onInputEmail.bind(this);
    this.clearNewContact = this.clearNewContact.bind(this);
    this.onSendNewContact = this.onSendNewContact.bind(this);
    this.updateContactList = this.updateContactList.bind(this);
    this.updateCurrentFocusContact = this.updateCurrentFocusContact.bind(this);
    this.onDeleteContact = this.onDeleteContact.bind(this);
    this.onCheckForNewContact = this.onCheckForNewContact.bind(this);
    this.isNewContactValid = this.isNewContactValid.bind(this);
    this.onEditContact = this.onEditContact.bind(this);
  }

  login() {
    this.setState({
      currentUser: this.state.userInProgress
    });
    sendUser({ user: this.state.userInProgress })
    .then( this.startPolling );
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
    this.setState({
      userInProgress: user
    });
  }

  componentDidMount() {
  }

  startPolling() {
    if (this.state.currentUser !== '') {
      this.setState({
        timer: setInterval (()=>{
          getContactList(this.state.currentUser)
          .then(this.updateContactList);
        }, 1000)
      });
    }
  }

  updateContactList(contactList) {
    this.setState({
      contactList : contactList
    });
  }

  logout() {
    deleteUser({ user: this.state.currentUser });
    this.setState({
      userInProgress: '',
      currentUser: '',
      contactIndexEdited: ''
    }, () => {
      if (this.state.currentUser === '') {
        clearInterval(this.state.timer);
      }});
    }

  onInputFirstName(e) {
    const text = e.target.value;
    this.setState({
      firstNameInProgress: text
    });
  }

  onInputLastName(e) {
    const text = e.target.value;
    this.setState({
      lastNameInProgress: text
    });
  }

  onInputPhone(e) {
    const text = e.target.value;
    this.setState({
      phoneInProgress: text
    });
  }

  onInputEmail(e) {
    const text = e.target.value;
    this.setState({
      emailInProgress: text
    });
  }
  clearNewContact() {
    this.setState({
      firstNameInProgress: '',
      lastNameInProgress: '',
      phoneInProgress: '',
      emailInProgress: '',
      contactIndexEdited: ''
    });
  }

  onSendNewContact() {
    if (this.isNewContactValid()) {
      sendNewContact({
        currentUser: this.state.currentUser,
        firstName: this.state.firstNameInProgress,
        lastName: this.state.lastNameInProgress,
        phone: this.state.phoneInProgress,
        email: this.state.emailInProgress
      })
      .then(this.clearNewContact);
      deleteContact(this.state.contactIndexEdited, this.state.currentUser)
      .then(this.updateContactList);
      this.setState({
        currentFocusContact : ''
      });
    }
  }

  updateCurrentFocusContact(e) {
    if (this.state.currentFocusContact !== e.target.getAttribute('contact-index')) {
      this.setState({
        currentFocusContact : e.target.getAttribute('contact-index')
      });
    } else {
      this.setState({
        currentFocusContact : ''
      });
    }
  }

  onDeleteContact(e) {
    deleteContact(e.target.getAttribute('contact-index'), this.state.currentUser)
    .then(this.updateContactList);
    this.setState({
      currentFocusContact : ''
    });
  }

  isNewContactValid() {
    if (this.state.firstNameInProgress === '' && this.state.lastNameInProgress === '') {
      return false;
    }
    return true;
  }

  onCheckForNewContact(e) {
    if( e.key === "Enter") {
      this.onSendNewContact();
    }
  }

  onEditContact() {
    this.state.contactList.forEach((contact) => {
      if (contact.index + '' === this.state.currentFocusContact) {
        this.setState({
          contactIndexEdited : this.state.currentFocusContact,
          firstNameInProgress: contact.firstName,
          lastNameInProgress: contact.lastName,
          phoneInProgress: contact.phone,
          emailInProgress: contact.email,
        });
      }
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
          <ContactList
            contactList={this.state.contactList}
            currentFocusContact={this.state.currentFocusContact}
            updateCurrentFocusContact={this.updateCurrentFocusContact}
            onDeleteContact={this.onDeleteContact}
            onEditContact={this.onEditContact}
            currentUser={this.state.currentUser}
          />
          <NewContact
            firstNameInProgress={this.state.firstNameInProgress}
            lastNameInProgress={this.state.lastNameInProgress}
            phoneInProgress={this.state.phoneInProgress}
            emailInProgress={this.state.emailInProgress}
            onInputFirstName={this.onInputFirstName}
            onInputLastName={this.onInputLastName}
            onInputPhone={this.onInputPhone}
            onInputEmail={this.onInputEmail}
            logout={this.logout}
            onSendNewContact={this.onSendNewContact}
            clearNewContact={this.clearNewContact}
            onCheckForNewContact={this.onCheckForNewContact}
          />
        </div>
      );
    }
  }
}

export default App;
