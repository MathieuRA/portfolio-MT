import React, { BaseSyntheticEvent, FC } from 'react'

interface PropsLink {
  anchor?: boolean
  label: string
  to: string
}
const Link: FC<PropsLink> = ({
  anchor = false,
  label,
  to,
}) => {
  const isActive = window.location.hash === `#${to}`
  const homePage = window.location.hash === ''
  const firstElement = to === 'corporate'
  let active

  homePage && firstElement && (active = 'active')
  isActive && (active = 'active')
  return (
    <a
      onClick={setActive}
      className={`customLink ${active}`}
      id={active}
      href={anchor ? `#${to}` : to}
    >
      {label}
    </a>
  )
}

const setActive = (e: BaseSyntheticEvent) => {
  document.getElementById('active')?.removeAttribute('id')
  e.target.id = 'active'
}

export default Link
