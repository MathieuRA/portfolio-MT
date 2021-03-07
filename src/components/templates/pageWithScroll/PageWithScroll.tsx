import { FC, useMemo, useRef } from 'react'

import { useHashHooks } from '../../../hooks'

interface PropsPageWithScroll {
  anchor: string
  isMobile: Boolean
  previousAnchor: string
}
const PageWithScroll: FC<PropsPageWithScroll> = ({
  anchor,
  isMobile,
  previousAnchor,
}) => {
  const hash = useHashHooks()
  const isActive = useMemo(() => hash === `#${anchor}`, [
    hash,
  ])
  const page = useRef<HTMLTableSectionElement>(null)
  const menuHeight = document.getElementById('menu')
    ?.offsetHeight

  return (
    <section
      ref={page}
      onScroll={() => {
        if (page.current) {
          page.current.scrollTop === 0
            ? (window.location.hash = previousAnchor)
            : (window.location.hash = anchor)
        }
      }}
      id={anchor}
      style={{
        backgroundColor: 'black',
        color: 'white',
        height: isMobile
          ? '100%'
          : `calc(100vh - ${menuHeight}px)`,
        overflow: isMobile
          ? 'visible'
          : isActive
          ? 'overlay'
          : 'hidden',
        width: '100%',
        fontSize: '3rem',
        paddingTop: `calc(${menuHeight}px + ${menuHeight}px)`,
      }}
    >
      <div
        style={{
          paddingTop: menuHeight,
        }}
      >
        <div
          style={{
            width: '80%',
            margin: '20px auto',
            fontSize: '0.4em',
            color: 'var(--main-grey)',
          }}
        >
          Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Quisquam nesciunt necessitatibus
          consequatur, hic perferendis tempora illo sint
          veritatis voluptas, neque voluptatem deserunt
          voluptatum optio nemo consequuntur quos error
          blanditiis quae!
        </div>
        <div
          style={{
            width: '80%',
            margin: '20px auto',
            fontSize: '0.4em',
            color: 'var(--main-grey)',
          }}
        >
          Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Quisquam nesciunt necessitatibus
          consequatur, hic perferendis tempora illo sint
          veritatis voluptas, neque voluptatem deserunt
          voluptatum optio nemo consequuntur quos error
          blanditiis quae!
        </div>
        <div
          style={{
            width: '80%',
            margin: '20px auto',
            fontSize: '0.4em',
            color: 'var(--main-grey)',
          }}
        >
          Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Quisquam nesciunt necessitatibus
          consequatur, hic perferendis tempora illo sint
          veritatis voluptas, neque voluptatem deserunt
          voluptatum optio nemo consequuntur quos error
          blanditiis quae!
        </div>
      </div>
    </section>
  )
}

export default PageWithScroll
