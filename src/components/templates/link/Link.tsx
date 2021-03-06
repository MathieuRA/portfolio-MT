import { FC } from 'react'

interface PropsLink {
  anchor?: boolean
  HTMLClass?: string
  label: string
  to: string
}
const Link: FC<PropsLink> = ({
  anchor = false,
  HTMLClass,
  label,
  to,
}) => {
  return (
    <a
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
