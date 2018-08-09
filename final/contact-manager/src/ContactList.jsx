import React from 'react';
import Contact from './Contact';

const ContactList = ({contactList, currentFocusContact, updateCurrentFocusContact, onDeleteContact, onEditContact, currentUser}) => {
  const allContact = contactList.map((contact) => (
    <li className='contact-record' key={contact.index}><Contact updateCurrentFocusContact={updateCurrentFocusContact} currentFocusContact={currentFocusContact} contact={contact} onDeleteContact={onDeleteContact} onEditContact={onEditContact}/></li>
  ));
  return (
    <div className='contact-list-area'>
      Welcome to your contact manager, {currentUser}!
      <ul className='contact-list'>
        {allContact}
      </ul>
    </div>
  );
};

export default ContactList;
