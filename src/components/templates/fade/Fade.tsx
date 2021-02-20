import { FC, useEffect, useState } from 'react'

import './fade.css'

interface FadeProps {
  show: any
  children: any
}
const Fade: FC<FadeProps> = ({ show, children }) => {
  const [shouldRender, setRender] = useState(show)

  useEffect(() => {
    show && setRender(true)
  }, [show])

  const onAnimationEnd = () => {
    !show && setRender(false)
  }

  return (
    shouldRender && (
      <div
        style={{
          animation: `${
            show ? 'fadeIn 0.6s' : 'fadeOut 0.2s'
          }`,
        }}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </div>
    )
  )
}

export default Fade
