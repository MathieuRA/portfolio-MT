export default interface IScrollContextValue {
  actions: {
    changeCurrentRoute: (route: string) => void
  }
  currentActive: string
}
