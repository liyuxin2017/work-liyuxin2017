import React from 'react';

const Login = ({onCheckForLogin, userInProgress, onInputUsername, login, currentUser}) => {
  return (
    <div className='login-area'>
      <input onChange={onInputUsername} onKeyUp={onCheckForLogin} value={userInProgress} className='login-username-text'/>
      <button onClick={login} className='login-button'>Login</button>
    </div>
  );
};
export default Login;
