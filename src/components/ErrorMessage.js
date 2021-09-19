import React from 'react'

export default function ErrorMessage ({ errorMessage }) {
  const styles = {
    display: 'inline',
    backgroundColor: 'red',
    color: '#ccc'
  }
  return (
    <h2 style={styles}>{errorMessage}</h2>
  )
}
