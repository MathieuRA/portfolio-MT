import React, { FC } from 'react'
import Container from '../../../Container'

import './link.css'

interface PropsLink {
  actionOnClick?: Function
  anchor?: boolean
  disabled?: boolean
  index: number
  HTMLClass?: string
  label: string
  to: string
}
const Link: FC<PropsLink> = React.memo(
  ({
    anchor = false,
    actionOnClick,
    disabled = false,
    index,
    HTMLClass = '',
    label,
    to,
  }) => {
    const action = {
      onClick: (): void => {
        Container.URL = index
        sessionStorage.setItem(
          'tabsIndex',
          index.toString()
        )
        if (actionOnClick) {
          // when animation end
          actionOnClick()
        }
        anchor && (window.location.hash = to)
      },
    }
    return !disabled ? (
      <a
        {...action}
        className={`customLink ${HTMLClass}`}
        href={anchor ? `#${to}` : to}
      >
        {label}
      </a>
    ) : (
      <>
        <span
          className='tooltip'
          style={{
            color: 'white',
            position: 'absolute',
            right: '0',
            opacity: '0',
            backgroundColor: 'grey',
            transition: '0.4s',
            padding: '5px',
            borderRadius: '5px',
          }}
        >
          Bientôt disponible
        </span>
        <a
          onMouseEnter={() => {
            const t = document.getElementsByClassName(
              'tooltip'
            ) as HTMLCollectionOf<HTMLElement>
            t[0].style.opacity = '1'
          }}
          onMouseLeave={() => {
            const t = document.getElementsByClassName(
              'tooltip'
            ) as HTMLCollectionOf<HTMLElement>
            t[0].style.opacity = '0'
          }}
          className={`disableLink ${HTMLClass}`}
        >
          {label}
        </a>
      </>
    )
  }
)

export default Link
