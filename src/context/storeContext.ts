import { createContext } from 'react'
import IStoreContextValue from '../interfaces/IStoreContextValue'

const StoreContext = createContext<IStoreContextValue>({
  content: {
    menuConfiguration: {
      contact: '',
      leftPart: [''],
      logo: {
        alt: '',
        src: '',
      },
      rightPart: [''],
    },
    menuItems: [''],
    pagesWithSlider: {},
  },
  menu: {
    isOpen: false,
    toggleState: () => {},
  },
  mobile: {
    isMobile: false,
    toggleState: () => {},
  },
  scrollManagement: {
    hash: '',
  },
})

export default StoreContext
