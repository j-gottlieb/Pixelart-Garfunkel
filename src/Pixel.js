import React from 'react'

const Pixel = (props) => {
  return (
    <div
      className='pixel'
      style={{backgroundColor: props.color}}
      onMouseOver={() => props.handleDrawing(props.position)}></div>
  )
}

export default Pixel
