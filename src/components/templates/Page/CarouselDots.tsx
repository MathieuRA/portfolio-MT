import { FC } from 'react'

import './carouselDots.css'

interface PropsDots {
  selected: boolean
  onClick: Function
}
const Dot: FC<PropsDots> = ({ selected, onClick }) => {
  return (
    <span
      className='dots'
      // Throw error about the type fonction.
      // HAVE TO BE FIXED
      //@ts-ignore
      onClick={onClick}
      style={{
        backgroundColor: selected
          ? 'var(--main-gold)'
          : 'var(--main-grey)',
        cursor: selected ? 'unset' : 'pointer',
        opacity: selected ? '1' : '0.7',
      }}
    />
  )
}

interface PropsIndicatorsDots {
  index: number
  total: number
  setFrameHandler: Function
}
const IndicatorDots: FC<PropsIndicatorsDots> = ({
  total,
  index,
  setFrameHandler,
}) => {
  if (total < 2) {
    // Hide dots when there is only one dot.
    return <div className='wrapperStyle' />
  } else {
    return (
      <div className='wrapperStyle'>
        {Array.apply(null, Array(total)).map((x, i) => {
          const setFrame = () => {
            setFrameHandler(i)
          }
          return (
            <Dot
              key={i}
              selected={index === i}
              onClick={setFrame}
            />
          )
        })}
      </div>
    )
  }
}

export default IndicatorDots
