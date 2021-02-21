import { createContext } from 'react'

const ScrollContext = createContext({
  actions: {
    changeCurrentRoute: (route: string) => {},
  },
  currentActive: '',
})

export default ScrollContext
