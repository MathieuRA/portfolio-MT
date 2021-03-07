import { FC } from 'react'
import { noop } from '../../../utils'

interface PropsLink {
  actionOnClick?: Function
  anchor?: boolean
  HTMLClass?: string
  label: string
  to: string
}
const Link: FC<PropsLink> = ({
  anchor = false,
  actionOnClick,
  HTMLClass,
  label,
  to,
}) => {
  const action = {
    onClick: (): void =>
      actionOnClick ? actionOnClick() : noop(),
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

export default Link
