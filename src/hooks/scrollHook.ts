import IScrollContextValue from '../interfaces/IScrollContextValue'
import { Data } from '../utils'

const menuItems = Data.getInstance().getMenuItems()
const menuLinks = document.links

/**
 *
 * @param context the scrollContextValue
 */
const useScrollHook = (context: IScrollContextValue) => {
  const scrollingRoute = (
    e: WheelEvent | KeyboardEvent
  ): void => {
    const evWheel = e instanceof WheelEvent && e
    const evKeyBoard = e instanceof KeyboardEvent && e
    const down = evWheel
      ? evWheel.deltaY > 1
      : evKeyBoard && evKeyBoard.code === 'ArrowDown'

    let index = menuItems.findIndex(
      (item) => `#${item}` === context.currentActive
    )

    // If any hash are set we are on the first page.
    // And findIndex return -1 if he dont found anything.
    // So we set index as 0 to say: "we are on home page"
    index === -1 && (index = 0)
    if (
      (down && index === menuItems.length - 1) ||
      (!down && index === 0)
    ) {
      return
    }
    down ? (index += 1) : (index -= 1)
    window.location.hash = menuItems[index]
  }

  const setActive = (hash: string) => {
    document.getElementById('active')?.removeAttribute('id')
    for (let i = 0; i < menuLinks.length; i++) {
      const link = menuLinks[i].href.split('#')[1]
      if (hash === '') {
        menuLinks[0].id = 'active'
      } else if (`#${link}` === hash) {
        menuLinks[i].id = 'active'
      }
    }

    context.actions.changeCurrentRoute(hash)
  }

  return {
    scrollingRoute,
    setActive,
  }
}
export default useScrollHook
