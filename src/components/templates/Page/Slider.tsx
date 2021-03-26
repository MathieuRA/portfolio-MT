import { FC, useEffect, useState } from 'react'

import IndicatorDots from './CarouselDots'

import { Carousel } from '../../../packages/'

import './page.css'
import './slider.css'

const STYLE_IMG = {
  backgroundSize: 'cover',
  height: '100%',
  width: '100%',
}

interface PropsSlider {
  anchor: string
  imgs: string[]
}
const Slider: FC<PropsSlider> = ({ anchor, imgs }) => {
  const [active, setActive] = useState(false)

  // To rerender the componenet and reload the Carousel.auto
  useEffect(() => {
    const showedSlider =
      `#${anchor}` === window.location.hash
    showedSlider !== active && setActive(showedSlider)
  }, [window.location.hash])

  return (
    <div className='slider'>
      <Carousel
        auto={window.location.hash === `#${anchor}`}
        axis={'x'}
        duration={1500}
        loop
        interval={5000}
        widgets={[IndicatorDots]}
      >
        {imgs.map((img, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `url(./assets/img/${img})`,
              ...STYLE_IMG,
            }}
          />
        ))}
      </Carousel>
    </div>
  )
}

export default Slider
