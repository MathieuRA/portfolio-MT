import React, { useEffect, useState } from 'react'
import { throttle } from 'lodash'

import IScrollContextValue from './interfaces/IScrollContextValue'
import { Data } from './utils'
import { Loader, Menu, Page } from './components'
import { useHashHooks, useScrollHooks } from './hooks'

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
  const [loaderEnded, setLoaderEndend] = useState(false)
  const { scrollingRoute, setActive } = useScrollHooks(
    scrollContextValue
  )

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
