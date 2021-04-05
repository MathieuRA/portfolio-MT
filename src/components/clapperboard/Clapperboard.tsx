import React, { useRef } from 'react'

import './clapperboard.css'

const Clapperboard = () => {
  const stick = useRef<HTMLDivElement>(null)
  if (stick && stick.current) {
    //stick.current.style.transform = 'rotate(330deg)'
  }

  return (
    <div className='clapper'>
      <div className='clapper-container'>
        <div className='clapper-body'>
          <div className='top'>
            <div className='stick stick1' ref={stick}>
              <div className='rect'></div>
              <div className='rect'></div>
              <div className='rect'></div>
              <div className='rect'></div>
              <div className='rect'></div>
              <div className='rect'></div>
            </div>
            <div className='stick stick2'>
              <div className='rect'></div>
              <div className='rect'></div>
              <div className='rect'></div>
              <div className='rect'></div>
              <div className='rect'></div>
              <div className='rect'></div>
            </div>
          </div>
          <div className='bottom'></div>
        </div>
        <div className='circle'></div>
        <div className='play'></div>
      </div>
    </div>
  )
}

export default Clapperboard
