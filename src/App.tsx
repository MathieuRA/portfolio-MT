import { useEffect, useState } from 'react'

import IScrollContextValue from './interfaces/IScrollContextValue'
import {
  Data,
  detectHashOnScroll,
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
  const isMobile = window.innerWidth <= 1024

  useEffect(() => {
    window.location.hash = menuItems[0]

    if (isMobile) {
      const sections = document.querySelectorAll('section')
      const positionSections = getPositionOfEachSections(
        sections
      )

      document.addEventListener('scroll', () =>
        detectHashOnScroll(sections, positionSections)
      )
      return () => {
        document.removeEventListener('scroll', () =>
          detectHashOnScroll(sections, positionSections)
        )
      }
    }
  }, [])

  useEffect(() => {})

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
        <Loader
          setLoaderEndend={setLoaderEndend}
          isMobile={isMobile}
        />
      )}
      <Menu
        itemsNavigation={data.getNavigation()}
        isMobile={isMobile}
      />
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

const getPositionOfEachSections = (
  sections: NodeListOf<HTMLElement>
): number[][] => {
  let sectionPosition: number[][] = []
  for (let index = 0; index < sections.length; index++) {
    const element = sections[index]
    if (typeof sectionPosition[0] === 'undefined') {
      sectionPosition = [[0, element.clientHeight]]
    } else {
      const previousValue =
        sectionPosition[sectionPosition.length - 1]
      const nextValue = [
        previousValue[1],
        previousValue[1] + element.clientHeight,
      ]
      sectionPosition.push(nextValue)
    }
  }
  localStorage.setItem('sectionHeightLoaded', 'true')
  return sectionPosition
}
export default App
