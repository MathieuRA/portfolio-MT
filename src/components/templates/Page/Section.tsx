import { debounce, throttle } from 'lodash'
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { Fade, Link } from '..'

import StoreContext from '../../../context/storeContext'

import { Data } from '../../../utils'
import { IContent } from '../../../interfaces'
import { displayModalvideo } from '../../modal/Modal'

import './page.css'

interface PropsSection {
  section: string
}
const Section: FC<PropsSection> = ({ section }) => {
  const [activeSection, setActiveSection] =
    useState(Boolean)
  const [scrollEnded, setScrollEnded] = useState(true)
  const isMobile = window.innerWidth <= 1024

  const store = useContext(StoreContext)

  // Only mount the active component
  useEffect(() => {
    setActiveSection(
      `#${section}` === window.location.hash ||
        window.location.hash === ''
    )
  }, [store.scrollManagement.hash])

  // Waiting for the scroll are done to mount the element
  useEffect(() => {
    window.addEventListener(
      'scroll',
      debounce(() => {
        setScrollEnded(true)
      }, 50)
    )
    window.addEventListener(
      'scroll',
      throttle(() => setScrollEnded(false), 1000, {
        leading: true,
        trailing: false,
      })
    )
    return () => {
      window.removeEventListener(
        'scroll',
        debounce(() => {}, 50)
      )
      window.removeEventListener(
        'scroll',
        throttle(() => {}, 1000)
      )
    }
  }, [])

  const contents: IContent = useMemo(
    () => Data.getInstance().getContent(section),
    [section]
  )
  const { text, title, video } = useMemo(
    () => contents,
    [contents]
  )

  const displayModal = useCallback(
    () => displayModalvideo(video),
    [video]
  )

  return (
    <div className='section'>
      {
        <Fade
          show={
            isMobile ? true : activeSection && scrollEnded
          }
        >
          <h1
            dangerouslySetInnerHTML={{
              __html: title.toUpperCase(),
            }}
          />
          <p
            dangerouslySetInnerHTML={{ __html: text }}
            style={{
              fontFamily: 'nunito-regular, serif',
              float: 'left',
            }}
          />
          <button
            className='customLink colorBlue'
            style={{
              backgroundColor: 'unset',
              border: 'none',
              display: 'block',
              margin: 'auto',
              padding: 15,
              fontSize: '1em',
              position: 'relative',
              fontFamily: 'aqua, nunito-regular, serif',
            }}
            onClick={displayModal}
          >
            {video.label}
          </button>
        </Fade>
      }
    </div>
  )
}
export default Section
