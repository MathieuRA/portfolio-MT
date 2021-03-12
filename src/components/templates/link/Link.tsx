import React, { FC } from 'react'
import Container from '../../../Container'

interface PropsLink {
  actionOnClick?: Function
  anchor?: boolean
  index: number
  HTMLClass?: string
  label: string
  to: string
}
const Link: FC<PropsLink> = React.memo(
  ({
    anchor = false,
    actionOnClick,
    index,
    HTMLClass,
    label,
    to,
  }) => {
    const action = {
      onClick: (): void => {
        Container.URL = index
        if (actionOnClick) {
          // when animation end
          actionOnClick()
        }
        anchor && (window.location.hash = to)
      },
    }
    return (
      <a
        {...action}
        className={`customLink ${
          HTMLClass !== undefined ? HTMLClass : ''
        }`}
        href={anchor ? `#${to}` : to}
      >
        {label}
      </a>
    )
  }
)

export default Link
