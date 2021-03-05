import { throttle } from 'lodash'

export const disableSmartScroll = (scrollingRoute: any) => {
  window.removeEventListener(
    'keyup',
    throttle(scrollingRoute, 1000, {
      leading: true,
      trailing: false,
    })
  )

  window.removeEventListener(
    'wheel',
    throttle(scrollingRoute, 1000, {
      leading: true,
      trailing: false,
    })
  )
}

export const enableSmartScroll = (scrollingRoute: any) => {
  window.addEventListener(
    'keyup',
    throttle(scrollingRoute, 1000, {
      leading: true,
      trailing: false,
    })
  )

  window.addEventListener(
    'wheel',
    throttle(scrollingRoute, 1000, {
      leading: true,
      trailing: false,
    })
  )
}
