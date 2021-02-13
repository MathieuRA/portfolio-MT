import React from 'react'

import { IMenu } from './interfaces'
import { Menu } from './components'

import './app.css'

const ITEMS_NAVIGATION: IMenu = {
  contact: 'contact',
  linkMenu: [
    'corporate',
    'events',
    'fiction',
    'post-production',
  ],
  logo: {
    src: 'path',
    alt: 'Logo ',
  },
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
