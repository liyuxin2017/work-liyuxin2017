import React from 'react';

const Contact = ({ updateCurrentFocusContact, currentFocusContact, contact, onDeleteContact, onEditContact }) => {
  const contactName = contact.firstName + ' ' + contact.lastName + ' ';
  if (currentFocusContact !== contact.index + '') {
    return (
      <div className="contact">
        <div className='contact-name'>
          {contactName}
          <button onClick={updateCurrentFocusContact} contact-index={contact.index}>More</button>
        </div>
      </div>);
  } else {
    return (
      <div className="contact">
        <div className='contact-name'>
          {contactName}
          <button onClick={updateCurrentFocusContact} contact-index={contact.index}>More</button><br/>
          <span>First name: {contact.firstName}</span><br/>
          <span>Last name: {contact.lastName}</span><br/>
          <span>Phone: {contact.phone}</span><br/>
          <span>Email: {contact.email}</span><br/>
          <button onClick={onEditContact} contact-index={contact.index}>Edit</button>
          <button onClick={onDeleteContact} contact-index={contact.index}>Delete</button>
        </div>
      </div>);
  }
};

export default Contact;
