import React from 'react';

const NewContact = ({firstNameInProgress, lastNameInProgress, phoneInProgress, emailInProgress,
  logout, onInputFirstName, onInputLastName, onInputPhone, onInputEmail,
  onSendNewContact, clearNewContact, onCheckForNewContact}) => {
  return (
    <div className='new-contact-area'>
      <input className='first-name-text new-contact-area-font' onChange={onInputFirstName} onKeyUp={onCheckForNewContact} placeholder='First name' value={firstNameInProgress}/><br/>
      <input className='last-name-text new-contact-area-font' onChange={onInputLastName} onKeyUp={onCheckForNewContact} placeholder='Last name' value={lastNameInProgress}/><br/>
      <input className='phone-text new-contact-area-font' onChange={onInputPhone} onKeyUp={onCheckForNewContact} placeholder='Phone' value={phoneInProgress}/><br/>
      <input className='email-text new-contact-area-font' onChange={onInputEmail} onKeyUp={onCheckForNewContact} placeholder='Email' value={emailInProgress}/><br/>
      <button className='submit-button new-contact-area-font' onClick={onSendNewContact}>Submit</button>
      <button className='clear-button new-contact-area-font' onClick={clearNewContact}>Clear</button>
      <button onClick={logout} className='logout-button new-contact-area-font'>Logout</button>
    </div>
  );
};
export default NewContact;
