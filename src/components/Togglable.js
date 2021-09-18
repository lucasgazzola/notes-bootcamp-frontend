import React, { useState } from 'react'

export default function Togglable ({ children }) {
  const [loginVisible, setloginVisible] = useState(false)
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }
  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={() => setloginVisible(true)}>Show Login</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={() => setloginVisible(false)}>Cancel</button>
      </div>
    </>
  )
}
