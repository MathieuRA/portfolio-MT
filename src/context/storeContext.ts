import { createContext } from 'react'

const StoreContext = createContext({
  actions: {
    toggleMenuIsOpen: () => {},
    toggleIsMobile: () => {},
  },
  menuIsOpen: false,
  isMobile: false,
})

export default StoreContext
