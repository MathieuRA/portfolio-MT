import { useCallback, useMemo, useState } from 'react'

import Container from './Container'
import StoreContext from './context/storeContext'
import IStoreContextValue from './interfaces/IStoreContextValue'

import { Data } from './utils'
import { useHashHooks } from './hooks'

const App = () => {
  const data = useMemo(() => Data.getInstance(), [])
  const getPagesWithSlider = useCallback(
    () => data.getSliderImgs(),
    [data]
  )
  const menuItems = useMemo(() => data.getMenuItems(), [
    data,
  ])
  const menuConfiguration = useMemo(
    () => data.getNavigation(),
    [data]
  )

  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 1024
  )
  const hash = useHashHooks()

  const storeContextValue: IStoreContextValue = {
    content: {
      link: document.links,
      menuConfiguration: menuConfiguration,
      menuItems,
      pagesWithSlider: getPagesWithSlider(),
    },
    menu: {
      isOpen,
      toggleState: useCallback(
        () => setIsOpen((s) => !s),
        []
      ),
    },
    mobile: {
      isMobile,
      toggleState: useCallback(
        () => setIsMobile((s) => !s),
        []
      ),
    },
    scrollManagement: {
      hash,
    },
  }

  return (
    <StoreContext.Provider value={storeContextValue}>
      <Container />
    </StoreContext.Provider>
  )
}

export default App
