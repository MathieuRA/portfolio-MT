import { IMenu, ISliderConfiguration } from '.'

export default interface IStoreContextValue {
  content: {
    link?: HTMLCollectionOf<
      HTMLAnchorElement | HTMLAreaElement
    >
    menuConfiguration: IMenu
    menuItems: string[]
    pagesWithSlider: ISliderConfiguration
  }
  menu: {
    isOpen: boolean
    toggleState: () => void
  }
  mobile: {
    isMobile: boolean
    toggleState: () => void
  }
  scrollManagement: {
    hash: string
  }
}
