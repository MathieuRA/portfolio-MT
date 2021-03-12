import { throttle } from 'lodash'

export const blockScroll = (e: MouseEvent | TouchEvent) =>
  e.preventDefault()

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
  window.removeEventListener('wheel', blockScroll)
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
  window.addEventListener('wheel', blockScroll, {
    passive: false,
  })
  window.addEventListener(
    'wheel',
    throttle(scrollingRoute, 1000)
  )
}

export const disableScrollOnMenu = (
  e: TouchEvent
): void => {
  e.preventDefault()
}

/**
 * Change the hash when scrolling, and return the index of the current hash
 * @param sections
 * @param positionSections
 * @returns
 */
export const detectHashOnScroll = (
  sections: NodeListOf<HTMLElement>,
  positionSections: number[][]
): number => {
  const windowPosition = window.pageYOffset
  const sectionIndex = positionSections.findIndex(
    (element) =>
      windowPosition >= element[0] - 50 &&
      windowPosition < element[1] - 50
  )
  const currentSection = sections[sectionIndex].id
  if (window.location.hash !== currentSection) {
    window.location.hash = currentSection
  }

  return sectionIndex
}
