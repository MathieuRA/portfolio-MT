import React, { useEffect, useRef, useState } from 'react'
import { throttle } from 'lodash'

import { Data } from './utils'
import { Menu, Page } from './components'
import { useHashHooks, useScrollHooks } from './hooks'

import IScrollContextValue from './interfaces/IScrollContextValue'

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
  const [loaded, setLoaded] = useState(false)
  const video = useRef(null)
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
    setTimeout(() => {
      setLoaded(true)
    }, 3200)

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
      {!loaded && (
        <video
          autoPlay
          muted
          preload='metadata'
          ref={video}
        >
          <source
            src='assets/video/Animation_LOGO.mp4'
            type='video/mp4'
          />
          Sorry, your browser doesn't support embedded
          videos.
        </video>
      )}
      {loaded && (
        <>
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
        </>
      )}
    </div>
  )
}

export default App
