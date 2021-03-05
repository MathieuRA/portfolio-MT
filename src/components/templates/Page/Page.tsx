import { FC } from 'react'
import Section from './Section'
import Slider from './Slider'

interface PropsPage {
  anchor: string
  sliderImg: string[]
}
const Page: FC<PropsPage> = ({ anchor, sliderImg }) => {
  return (
    <section className='sliderPageContainer' id={anchor}>
      <Slider anchor={anchor} imgs={sliderImg} />
      <Section section={anchor} />
    </section>
  )
}

export default Page
