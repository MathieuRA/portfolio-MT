import React, { useEffect, useRef, useState } from 'react'
import { throttle } from 'lodash'

import IScrollContextValue from './interfaces/IScrollContextValue'
import { blockScroll, Data } from './utils'
import { Menu, Page } from './components'
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
  const loader = useRef<HTMLImageElement>(null)
  const loaderContainer = useRef<HTMLDivElement>(null)
  const [loaderEnded, setLoaderEndend] = useState(false)
  const { scrollingRoute, setActive } = useScrollHooks(
    scrollContextValue
  )

  const removeLoader = (e: TransitionEventInit) => {
    e.propertyName === 'height' && setLoaderEndend(true)
    // Enable scrolling
    window.removeEventListener('wheel', blockScroll)
    window.addEventListener(
      'wheel',
      throttle(scrollingRoute, 1000, {
        leading: true,
        trailing: false,
      })
    )
  }

  useEffect(() => {
    window.addEventListener('wheel', blockScroll)
    // Loader animation management
    setTimeout(() => {
      loaderContainer.current &&
        (loaderContainer.current.style.height = '0')
      setTimeout(() => {
        loader.current && (loader.current.style.width = '0')
      }, 200)
    }, 2800)
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
    <div
      className='App'
      style={{
        display: 'flex',
        flexFlow: 'wrap',
      }}
    >
      {!loaderEnded && (
        <div
          onTransitionEnd={removeLoader}
          ref={loaderContainer}
          style={{
            backgroundColor: 'white',
            display: 'flex',
            height: '100vh',
            position: 'absolute',
            transition: '1s',
            width: '100%',
            zIndex: 110,
          }}
        >
          {!loaderEnded && (
            <img
              ref={loader}
              src='assets/video/animation_LOGO.gif'
              style={{
                display: 'flex',
                margin: 'auto',
                transition: '0.5s',
                width: '50%',
              }}
            />
          )}
        </div>
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
