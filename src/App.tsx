import React from 'react'

import { Data } from './utils'
import { Menu, Page } from './components'

import './app.css'

const data = Data.getInstance()
const sliderImgs = data.getSliderImgs()

function App() {
  return (
    <div
      className='App'
      style={{
        width: `${data.getMenuItemsLenght()}00%`,
      }}
    >
      <Menu itemsNavigation={data.getNavigation()} />
      {data.getMenuItems().map((item, index) => {
        if (typeof sliderImgs[item] === 'undefined') {
          throw new Error(
            `You forget to add slider to your page: ${item}, please verify your menu configuration`
          )
        }
        return (
          <Page
            anchor={item}
            key={index}
            sliderImg={sliderImgs[item]}
          />
        )
      })}
    </div>
  )
}

export default App
