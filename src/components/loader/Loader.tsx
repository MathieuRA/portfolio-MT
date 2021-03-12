import React, {
  FC,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { blockScroll } from '../../utils'

interface PropsLoader {
  setLoaderEndend: Function
  setLoaderStarted: Function
  isMobile: Boolean
}
const Loader: FC<PropsLoader> = React.memo(
  ({ setLoaderEndend, setLoaderStarted, isMobile }) => {
    const loaderContainer = useRef<HTMLDivElement>(null)
    const videoloader = useRef<HTMLVideoElement>(null)

    const loaderManager = useCallback(() => {
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
    }, [])

    const removeLoader = useCallback(
      (e: TransitionEventInit) =>
        e.propertyName === 'height' &&
        setLoaderEndend(true),
      []
    )

    useEffect(() => {
      window.addEventListener('touchmove', blockScroll, {
        passive: false,
      })
      window.addEventListener('wheel', blockScroll, {
        passive: false,
      })
      window.addEventListener('load', loaderManager)
      return () => {
        // Dont destroy the wheel event to avoid to reset when Container are mounted
        window.removeEventListener('touchmove', blockScroll)
        window.removeEventListener('load', loaderManager)
      }
    }, [])

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
          id='video'
          muted
          preload='auto'
          ref={videoloader}
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
)

export default Loader
