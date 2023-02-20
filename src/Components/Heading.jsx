import React from 'react'

const Heading = ({ margin, text }) => {
  return (
    <h3 style={{ margin: margin }}>{text}:</h3>
  )
}

export default Heading