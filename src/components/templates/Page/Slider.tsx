import Carousel from 're-carousel'
import { FC } from 'react'

import './page.css'
import './slider.css'

const STYLE_EMBED = {
  height: '100%',
}

interface PropsSlider {
  anchor: string
  imgs: string[]
}
const Slider: FC<PropsSlider> = ({ anchor, imgs }) => {
  // Auto have to be dynamic. Maybe create a hook ?
  // We are reusing a lot if the component are active.
  // So instead of repeat the code, better to create something to reuse
  return (
    <div className='slider'>
      <Carousel
        auto={window.location.hash === `#${anchor}`}
        axis={'x'}
        duration={1000}
        loop
        interval={5000}
      >
        {imgs.map((img, index) => (
          // FIXME TO IMG WHEN I GOT THE IMG
          <embed
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
