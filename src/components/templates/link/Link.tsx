import { FC } from 'react'
import { Data } from '../../../utils'

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
  const activePath = window.location.hash === `#${to}`
  const homePage = window.location.hash === ''
  // If any hash are set into the URL, we are setting the first item menu as 'active'
  const isFirstElement =
    to === Data.getInstance().getMenuItems()[0]
  let active = ''

  homePage && isFirstElement && (active = 'active')
  activePath && (active = 'active')
  return (
    <a
      className={`customLink ${active}`}
      id={active}
      href={anchor ? `#${to}` : to}
    >
      {label}
    </a>
  )
}

export default Link
