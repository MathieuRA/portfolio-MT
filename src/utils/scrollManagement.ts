import { throttle } from 'lodash'

export const disableSmartScroll = (
  scrollingRoute: (e: WheelEvent | KeyboardEvent) => void
) => {
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

export const enableSmartScroll = (
  scrollingRoute: (e: WheelEvent | KeyboardEvent) => void
) => {
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

export const disableScrollOnMenu = (
  e: TouchEvent
): void => {
  e.preventDefault()
}

export const detectHashOnScroll = (
  sections: NodeListOf<HTMLElement>,
  positionSections: number[][]
): void => {
  const windowPosition = window.pageYOffset
  const sectionIndex = positionSections.findIndex(
    (element) =>
      windowPosition >= element[0] &&
      windowPosition < element[1]
  )
  const currentSection = sections[sectionIndex].id
  if (window.location.hash !== currentSection) {
    window.location.hash = currentSection
  }
}
