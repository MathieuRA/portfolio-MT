import React from 'react'

import { IMenu } from './interfaces'
import { Menu } from './components'

import './app.css'

const ITEMS_NAVIGATION: IMenu = {
  contact: 'contact',
  leftPart: ['corporate', 'events'],
  logo: {
    alt: 'logo',
    src: 'assets/logo.png',
  },
  rightPart: ['fiction', 'post-production'],
}

function App() {
  return (
    <div
      className='App'
      style={{
        backgroundColor: '#584747',
        height: '100vh',
        display: 'flex',
        width: '300%',
      }}
    >
      <Menu itemsNavigation={ITEMS_NAVIGATION} />
      <div
        style={{
          backgroundColor: '#469876',
          width: '50%',
          height: '100%',
        }}
      ></div>
      <div
        style={{
          backgroundColor: 'black',
          width: '50%',
          height: '100%',
        }}
      ></div>
      <div
        style={{
          backgroundColor: 'red',
          width: '50%',
          height: '100%',
        }}
      ></div>
      <div
        style={{
          backgroundColor: 'green',
          width: '50%',
          height: '100%',
        }}
      ></div>
      <div
        style={{
          backgroundColor: 'black',
          width: '50%',
          height: '100%',
        }}
      ></div>
      <div
        id='test'
        style={{
          backgroundColor: 'green',
          width: '50%',
          height: '100%',
        }}
      ></div>
    </div>
  )
}

export default App
