import { FC, useEffect, useRef } from 'react'
import { blockScroll } from '../../utils'

interface PropsLoader {
  setLoaderEndend: Function
  isMobile: Boolean
}
const Loader: FC<PropsLoader> = ({
  setLoaderEndend,
  isMobile,
}) => {
  const loader = useRef<HTMLImageElement>(null)
  const loaderContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.addEventListener('wheel', blockScroll, {
      // FIX:
      // Unable to preventDefault inside passive event listener
      // due to target being treated as passive
      passive: false,
    })
    window.addEventListener('touchmove', blockScroll, {
      passive: false,
    })
    // Loader animation management
    setTimeout(() => {
      const { current } = loaderContainer
      current && (current.style.height = '0')
      setTimeout(() => {
        const { current } = loader
        current && (current.style.width = '0')
      }, 200)
    }, 2800)

    return () => {
      window.removeEventListener('wheel', blockScroll)
      window.removeEventListener('touchmove', blockScroll)
    }
  }, [])
  const removeLoader = (e: TransitionEventInit) =>
    e.propertyName === 'height' && setLoaderEndend(true)

  return (
    <div
      onTransitionEnd={removeLoader}
      ref={loaderContainer}
      style={{
        backgroundColor: 'white',
        display: 'flex',
        height: '100vh',
        position: 'absolute',
        transition: '1s',
        width: '100%',
        zIndex: 110,
      }}
    >
      <img
        ref={loader}
        src='assets/video/animation_LOGO.gif'
        style={{
          display: 'flex',
          margin: 'auto',
          transition: '0.5s',
          width: `${isMobile ? 100 : 50}%`,
        }}
      />
    </div>
  )
}

export default Loader
