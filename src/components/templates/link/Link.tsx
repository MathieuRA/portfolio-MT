import React, { FC } from 'react'

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
  return (
    <a className='customLink' href={anchor ? `#${to}` : to}>
      {label}
    </a>
  )
}

export default Link
