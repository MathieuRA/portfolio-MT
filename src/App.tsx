import { useContext, useEffect, useState } from 'react'

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

import {
  IScrollContextValue,
  IStoreContextValue,
} from './interfaces'

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

const toggleMenuIsOpen = () => {
  storeContextValue.menuIsOpen = !storeContextValue.menuIsOpen
}

const toggleIsMobile = () => {
  storeContextValue.isMobile = !storeContextValue.isMobile
}

const storeContextValue: IStoreContextValue = {
  menuIsOpen: false,
  isMobile: false,
  actions: {
    toggleIsMobile,
    toggleMenuIsOpen,
  },
}

function App() {
  const hash = useHashHooks()
  const [loaderEnded, setLoaderEndend] = useState(false)
  const { scrollingRoute, setActive } = useScrollHooks(
    scrollContextValue
  )

  const [menuIsOpen, toggleMenuState] = useState(false)

  const isMobile = window.innerWidth <= 1024

  const toggleMenu = () => {
    toggleMenuState(!menuIsOpen)
  }

  useEffect(() => {
    window.location.hash = menuItems[0]
  }, [])

  useEffect(() => {
    // Disable the detection hash if menu are open.
    // Work but ugly
    // Need to fix
    const sections = document.querySelectorAll('section')
    const positionSections = getPositionOfEachSections(
      sections
    )
    const scrollManagementMenu = () => {
      detectHashOnScroll(sections, positionSections)
    }

    if (isMobile) {
      if (menuIsOpen) {
        document.removeEventListener(
          'scroll',
          scrollManagementMenu
        )
        return
      }
      document.addEventListener(
        'scroll',
        scrollManagementMenu
      )

      return () => {
        document.removeEventListener(
          'scroll',
          scrollManagementMenu
        )
      }
    }
  }, [menuIsOpen])

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
    hash === '' && (window.location.hash = menuItems[0])

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
        toggleMenu={toggleMenu}
        menuIsOpen={menuIsOpen}
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
          isMobile={isMobile}
          previousAnchor={
            menuItems[data.getMenuItemsLenght() - 2]
          }
        />
      )}
    </div>
  )
}

function getPositionOfEachSections(
  sections: NodeListOf<HTMLElement>
): number[][] {
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
  return sectionPosition
}
export default App
