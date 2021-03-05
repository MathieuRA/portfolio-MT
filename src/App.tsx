import { useEffect, useState } from 'react'

import IScrollContextValue from './interfaces/IScrollContextValue'
import {
  Data,
  disableSmartScroll,
  enableSmartScroll,
} from './utils'
import {
  Loader,
  Menu,
  Page,
  PageWithScroll,
} from './components'
import { useHashHooks, useScrollHooks } from './hooks'

import './app.css'

const data = Data.getInstance()
const menuItems = data.getMenuItems()
const pagesWithSlider = data.getSliderImgs()

const lastPage = menuItems.pop()

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
    enableSmartScroll(scrollingRoute)
    return () => {
      disableSmartScroll(scrollingRoute)
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
      {lastPage && (
        <PageWithScroll
          anchor={lastPage}
          previousAnchor={
            menuItems[data.getMenuItemsLenght() - 2]
          }
        />
      )}
    </div>
  )
}

export default App
