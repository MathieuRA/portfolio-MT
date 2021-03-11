import { debounce, throttle } from 'lodash'
import { FC, useEffect, useMemo, useState } from 'react'

import { Fade } from '..'

import { Data } from '../../../utils'
import { IContent } from '../../../interfaces'
import { useHashHooks } from '../../../hooks'

import './page.css'

interface PropsSection {
  section: string
}
const Section: FC<PropsSection> = ({ section }) => {
  const [activeSection, setActiveSection] = useState(
    Boolean
  )
  const [scrollEnded, setScrollEnded] = useState(true)
  const isMobile = window.innerWidth <= 1024

  const hash = useHashHooks()
  // Only mount the active component
  useEffect(() => {
    setActiveSection(
      `#${section}` === window.location.hash ||
        window.location.hash === ''
    )
  }, [hash])

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
  const { text, title } = useMemo(() => contents, [
    contents,
  ])

  return (
    <div className='section'>
      {
        <Fade
          show={
            isMobile ? true : activeSection && scrollEnded
          }
        >
          <h1>{title.toUpperCase()}</h1>
          <p dangerouslySetInnerHTML={{ __html: text }} />
        </Fade>
      }
    </div>
  )
}
export default Section
