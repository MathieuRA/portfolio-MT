import { throttle } from 'lodash'

export const disableSmartScroll = (scrollingRoute: any) =>
  window.removeEventListener(
    'wheel',
    throttle(scrollingRoute, 1000, {
      leading: true,
      trailing: false,
    })
  )

export const enableSmartScroll = (scrollingRoute: any) =>
  window.addEventListener(
    'wheel',
    throttle(scrollingRoute, 1000, {
      leading: true,
      trailing: false,
    })
  )
