import { Carousel } from '../../../packages/'
import IndicatorDots from './CarouselDots'
import { FC } from 'react'

import './page.css'
import './slider.css'

const STYLE_IMG = {
  backgroundSize: 'cover',
  height: '100%',
  width: '100%',
}

interface PropsSlider {
  imgs: string[]
}
const Slider: FC<PropsSlider> = ({ imgs }) => {
  return (
    <div className='slider'>
      <Carousel
        auto
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
