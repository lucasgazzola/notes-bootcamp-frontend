import React from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

export default function LoginForm ({ username, password, handleLogin, handlePasswordChange, handleUsernameChange }) {
  return (
    <Togglable buttonLabel='Show login'>
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

LoginForm.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  handleLogin: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired
}
