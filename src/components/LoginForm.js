import React from 'react';
import Togglable from './Togglable'

export default function LoginForm({
  username, password, handleLogin, handlePasswordChange, handleUsernameChange
}) {
  return (
    <Togglable>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type='text'
            value={username}
            name='Username'
            placeholder='Username'
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <input
            type='password'
            value={password}
            name='Password'
            placeholder='Password'
            onChange={handlePasswordChange}
          />
        </div>
        <button>Login</button>
      </form>
    </Togglable>
  )
}