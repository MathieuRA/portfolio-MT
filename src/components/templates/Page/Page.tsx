import { FC } from 'react'
import Section from './Section'
import Slider from './Slider'

const STYLE = {
  display: 'flex',
  height: '100%',
  width: '100%',
}

interface PropsPage {
  anchor: string
  sliderImg: string[]
}
const Page: FC<PropsPage> = ({ anchor, sliderImg }) => {
  return (
    <section id={anchor} style={STYLE}>
      <Slider imgs={sliderImg} />
      <Section section={anchor} />
    </section>
  )
}

export default Page
