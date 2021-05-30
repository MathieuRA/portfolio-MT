import React from 'react'

import './spinner.css'

const Spinner = React.memo(() => (
  <svg
    className='spinner'
    width='20px'
    height='20px'
    viewBox='0 0 66 66'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle
      className='path'
      fill='none'
      stroke-width='6'
      stroke-linecap='round'
      cx='33'
      cy='33'
      r='30'
    ></circle>
  </svg>
))
export default Spinner
