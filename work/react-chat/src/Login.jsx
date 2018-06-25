import React from 'react';

const Login = ({onCheckForLogin, userInProgress, onInputUsername, login, currentUser}) => {
  let loginAreaClassName = 'login-area';
  if (currentUser !== '') {
    loginAreaClassName += ' logout-not-display';
  }
  return (
    <div className={loginAreaClassName}>
      <input onChange={onInputUsername} onKeyUp={onCheckForLogin} value={userInProgress} className='login-username-text'/>
      <button onClick={login} className='login-button'>Login</button>
    </div>
  );
};
export default Login;
