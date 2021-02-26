import { debounce, throttle } from 'lodash'
import { FC, useEffect, useState } from 'react'

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

  const contents: IContent = Data.getInstance().getContent(
    section
  )

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
  return (
    <section
      className='section'
      style={{ color: 'white', paddingTop: 100 }}
    >
      {
        <Fade show={activeSection && scrollEnded}>
          <h1>{contents.title}</h1>
          <p>{contents.text}</p>
        </Fade>
      }
    </section>
  )
}
export default Section
