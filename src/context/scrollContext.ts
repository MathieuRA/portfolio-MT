import { createContext } from 'react'

const ScrollContext = createContext({
  actions: {
    changeCurrentRoute: (route: string): void => {},
  },
  currentActive: '',
})

export default ScrollContext
