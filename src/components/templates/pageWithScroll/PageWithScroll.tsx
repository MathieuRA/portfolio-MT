import { FC, useContext, useMemo, useRef } from 'react'
import StoreContext from '../../../context/storeContext'
import Clapperboard from '../../clapperboard/Clapperboard'

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
  const store = useContext(StoreContext)
  const isActive = useMemo(
    () => store.scrollManagement.hash === `#${anchor}`,
    [store.scrollManagement.hash]
  )
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
            width: '100%',
            height: '40vh',
            margin: '20px auto',
            fontSize: '0.4em',
            color: 'var(--main-grey)',
          }}
        >
          <Clapperboard />
        </div>
      </div>
    </section>
  )
}

export default PageWithScroll
