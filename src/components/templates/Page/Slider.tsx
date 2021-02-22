import Carousel from 're-carousel'
import { FC } from 'react'

import './page.css'
import './slider.css'

const STYLE_EMBED = {
  height: '100%',
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
      >
        {imgs.map((img, index) => (
          <img
            alt={'TODO'}
            className={'imgsSlider'}
            key={index}
            src={`./assets/img/${img}`}
            style={STYLE_EMBED}
          />
        ))}
      </Carousel>
    </div>
  )
}

export default Slider
