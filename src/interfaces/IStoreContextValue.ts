export default interface IStoreContextValue {
  actions: {
    toggleMenuIsOpen: () => void
    toggleIsMobile: () => void
  }
  menuIsOpen: boolean
  isMobile: boolean
}
