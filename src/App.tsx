import React from 'react'

import { IMenu } from './interfaces'
import { Menu } from './components'

import './app.css'

const ITEMS_NAVIGATION: IMenu = {
  contact: 'contact',
  leftPart: ['corporate', 'events'],
  logo: {
    alt: 'logo',
    src: 'path',
  },
  rightPart: ['fiction', 'post-production'],
}

function App() {
  return (
    <div
      className='App'
      style={{ backgroundColor: 'black', height: '100vh' }}
    >
      <Menu itemsNavigation={ITEMS_NAVIGATION} />
    </div>
  )
}

export default App
