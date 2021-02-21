import React, { useEffect } from 'react'

import { Data } from './utils'
import { Menu, Page } from './components'

import './app.css'
import { throttle } from 'lodash'

const data = Data.getInstance()
const sliderImgs = data.getSliderImgs()
const menuItem = data.getMenuItems()

let navIterator = 0

const customScroll = (e: WheelEvent): void => {
  const down = e.deltaY > 1
  if (
    (down && navIterator === menuItem.length - 1) ||
    (!down && navIterator === 0)
  ) {
    return
  }
  e.deltaY > 1 ? (navIterator += 1) : (navIterator -= 1)
  window.location.hash = menuItem[navIterator]
}

function App() {
  useEffect(() => {
    window.addEventListener(
      'wheel',
      throttle(customScroll, 1000, {
        leading: true,
        trailing: false,
      })
    )
    return () => {
      window.removeEventListener(
        'wheel',
        throttle(() => {}, 1000, {
          leading: true,
          trailing: false,
        })
      )
    }
  }, [])
  return (
    <div className='App'>
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
