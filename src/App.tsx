import React from 'react'

import { IMenu } from './interfaces'
import { Menu } from './components'

import './app.css'
import { Page } from './components/templates'

const MENU_ITEM = [
  'corporate',
  'events',
  'fiction',
  'post-production',
]

const ITEMS_NAVIGATION: IMenu = {
  contact: 'contact',
  leftPart: [MENU_ITEM[0], MENU_ITEM[1]],
  logo: {
    alt: 'logo',
    src: 'assets/logo.png',
  },
  rightPart: [MENU_ITEM[2], MENU_ITEM[3]],
}

const SLIDERONE = ['CORPORATE1G.svg', 'PUB1G.svg']

function App() {
  return (
    <div
      className='App'
      style={{
        height: '100vh',
        display: 'flex',
        width: `${MENU_ITEM.length}00%`,
      }}
    >
      <Menu itemsNavigation={ITEMS_NAVIGATION} />
      <Page anchor={'corporate'} sliderImg={SLIDERONE} />
      <Page anchor={'events'} sliderImg={[]} />
      <Page anchor={'fiction'} sliderImg={[]} />
      <Page anchor={'post-production'} sliderImg={[]} />
    </div>
  )
}

export default App
