import { FC, useEffect, useRef } from 'react'
import { blockScroll } from '../../utils'

interface PropsLoader {
  setLoaderEndend: Function
  setLoaderStarted: Function
  isMobile: Boolean
}
const Loader: FC<PropsLoader> = ({
  setLoaderEndend,
  setLoaderStarted,
  isMobile,
}) => {
  const loaderContainer = useRef<HTMLDivElement>(null)
  const videoloader = useRef<HTMLVideoElement>(null)

  const loaderManager = () => {
    setLoaderStarted(true)
    const { current } = videoloader!
    current!.style.display = 'block'
    current!.play()
    current?.addEventListener('ended', function () {
      loaderContainer.current!.style.height = '0'
      setTimeout(() => {
        this.style.width = '0'
      }, 200)
    })
  }

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
    window.addEventListener('load', loaderManager)
    return () => {
      window.removeEventListener('wheel', blockScroll)
      window.removeEventListener('touchmove', blockScroll)
      window.removeEventListener('load', loaderManager)
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
      <video
        ref={videoloader}
        id='video'
        preload='auto'
        muted
        style={{
          display: 'none',
          margin: 'auto',
          transition: '0.5s',
          width: `${isMobile ? 100 : 50}%`,
        }}
      >
        <source
          src='assets/video/animation_LOGO.mp4'
          type='video/mp4'
        />
      </video>
    </div>
  )
}

export default Loader
