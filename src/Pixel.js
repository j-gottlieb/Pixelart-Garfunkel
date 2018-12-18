import React from 'react'

const Pixel = (props) => {
  return (
    <div
      className='pixel'
      style={{backgroundColor: props.color}}
      onClick={() => props.handleClick(props.position)}></div>
  )
}

export default Pixel
