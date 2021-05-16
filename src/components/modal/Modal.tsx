import { Component } from 'react'
import { IContent } from '../../interfaces'

import './index.css'

export const displayModalvideo = (
  video: IContent['video']
) => {
  if (instance === undefined) {
    throw new Error('No modal instance')
  }
  instance.setState(
    {
      isOpen: true,
      video: { ...video },
    },
    () => {
      const iframe = document.querySelector('iframe')
      if (iframe !== null) {
        iframe.style.width = '70vw'
        iframe.style.height = '39.4vw'
      }
    }
  )
  filter !== null &&
    (filter.style.backgroundColor = '#000000db')
}

interface Props {}
interface State {
  isOpen: boolean
  video?: IContent['video']
}
let instance: Modal | undefined
let filter: HTMLElement | null
class Modal extends Component<Props, State> {
  isMobile = window.innerWidth <= 1024

  state: State = {
    isOpen: false,
    video: undefined,
  }

  componentDidMount() {
    if (instance !== undefined) {
      throw new Error('Modal is a singelton')
    }

    filter = document.getElementById('filter')
    instance = this
  }

  componentWillUnmount() {
    instance = undefined
  }

  _closeModal() {
    console.log(filter)
    instance?.setState({ isOpen: false })
    filter !== null &&
      (filter.style.backgroundColor = 'unset')
  }

  render() {
    const { isOpen, video } = this.state
    return isOpen ? (
      <div id='modal'>
        <button
          style={{
            cursor: 'pointer',
            color: 'var(--main-gold)',
            backgroundColor: 'unset',
            border: 'none',
            fontSize: '2em',
            position: 'fixed',
            top: this.isMobile ? '-20%' : '-10%',
            right: this.isMobile ? '-10%' : '-5%',
          }}
          onClick={this._closeModal}
        >
          X
        </button>
        <div className='videoContainer'>
          <iframe
            className='video'
            src={video?.src}
            title={video?.title}
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            scrolling='yes'
          />
        </div>
      </div>
    ) : null
  }
}

export default Modal
