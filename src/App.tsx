import React, { useEffect, useState } from 'react'
import { map, throttle } from 'lodash'

import IScrollContextValue from './interfaces/IScrollContextValue'
import { Data } from './utils'
import { Loader, Menu, Page } from './components'
import { useHashHooks, useScrollHooks } from './hooks'

import './app.css'

const data = Data.getInstance()
const pagesWithSlider = data.getSliderImgs()
const menuItems = data.getMenuItems()

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
  const [loaderEnded, setLoaderEndend] = useState(false)
  const { scrollingRoute, setActive } = useScrollHooks(
    scrollContextValue
  )

  useEffect(() => {
    window.location.hash = menuItems[0]
  }, [])

  useEffect(() => {
    if (!loaderEnded) {
      return
    }
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
  }, [loaderEnded])

  useEffect(() => {
    setActive(hash)
  }, [hash])

  return (
    <div
      className='App'
      style={{
        display: 'flex',
        flexFlow: 'wrap',
      }}
    >
      {!loaderEnded && (
        <Loader setLoaderEndend={setLoaderEndend} />
      )}
      <Menu itemsNavigation={data.getNavigation()} />
      {Object.keys(pagesWithSlider).map((page, index) => (
        <Page
          anchor={page}
          key={index}
          sliderImg={pagesWithSlider[page]}
        />
      ))}
    </div>
  )
}

export default App
