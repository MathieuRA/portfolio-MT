import React, { useEffect } from 'react'
import { throttle } from 'lodash'

import { Data } from './utils'
import { Menu, Page } from './components'
import { useHashHooks, useScrollHooks } from './hooks'

import IScrollContextValue from './interfaces/IScrollContextValue'
import ScrollContext from './context/scrollContext'

import './app.css'

const data = Data.getInstance()
const sliderImgs = data.getSliderImgs()

const changeCurrentRoute = (route: string): void => {
  scrollContextValue.currentActive = route
}

const scrollContextValue: IScrollContextValue = {
  actions: {
    changeCurrentRoute,
  },
  currentActive: '',
}

function App() {
  const hash = useHashHooks()
  const { scrollingRoute, setActive } = useScrollHooks(
    scrollContextValue
  )

  useEffect(() => {
    window.addEventListener(
      'wheel',
      throttle(scrollingRoute, 1000, {
        leading: true,
        trailing: false,
      })
    )
    return () => {
      window.removeEventListener(
        'wheel',
        throttle(scrollingRoute, 1000, {
          leading: true,
          trailing: false,
        })
      )
    }
  }, [])

  useEffect(() => {
    setActive(hash)
  }, [hash])

  return (
    <div className='App'>
      <ScrollContext.Provider value={scrollContextValue}>
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
      </ScrollContext.Provider>
    </div>
  )
}

export default App
