import React, { Component } from 'react'
import { debounce, throttle } from 'lodash'

import StoreContext from './context/storeContext'

import {
  blockScroll,
  Data,
  detectHashOnScroll,
  getPositionOfEachSections,
} from './utils'
import {
  Loader,
  Menu,
  Page,
  PageWithScroll,
} from './components'

import './app.css'

type StateContainer = {
  isMobile: boolean
  loaderStarted: boolean
  loaderEndend: boolean
  event: {
    detectHash: boolean
    smoothScroll: boolean
  }
}
class Container extends Component<{}, StateContainer> {
  static contextType = StoreContext
  static URL = 0
  context!: React.ContextType<typeof StoreContext>
  lastPage!: string
  // cached value
  sections!: NodeListOf<HTMLElement>
  positionSections!: number[][]

  constructor(props: Object) {
    super(props)
    this.state = {
      isMobile: false,
      loaderEndend: false,
      loaderStarted: false,
      event: {
        detectHash: false,
        smoothScroll: false,
      },
    }
  }

  componentDidMount() {
    // Dont show the loader if the website was previously loaded
    const tabsIndex = sessionStorage.getItem('tabsIndex')
    if (tabsIndex !== null) {
      Container.URL = +tabsIndex
      this.setState({
        loaderEndend: true,
        loaderStarted: true,
      })
    }
    this.lastPage = this.context.content.menuItems.pop()!
    window.addEventListener('resize', this._debounceResize)
    if (this.state.isMobile) {
      this.setState(
        (state) => ({
          event: { ...state.event, detectHash: true },
        }),
        () =>
          window.addEventListener(
            'scroll',
            this._detectHashOnScroll
          )
      )
    }
  }

  componentDidUpdate() {
    const { menu, mobile, scrollManagement } = this.context
    const { isMobile } = this.state
    if (scrollManagement.hash === '') {
      window.location.hash = this.context.content.menuItems[0]
      Container.URL = 0
    }

    // Set mobile status
    if (isMobile !== mobile.isMobile) {
      this.setState({
        isMobile: mobile.isMobile,
      })
    }
    // MOBILE EVENT
    if (isMobile) {
      // reset the scroll if he had been unset.
      // eg (if menu was open)
      if (!menu.isOpen && !this.state.event.detectHash) {
        this.setState(
          (state) => ({
            event: { ...state.event, detectHash: true },
          }),
          () => {
            setTimeout(() => {
              window.addEventListener(
                'scroll',
                this._detectHashOnScroll
              )
            }, 750)
          }
        )
      }
      // Remove scroll when menu is open
      // To prevent double scroll with the link menu
      if (menu.isOpen && this.state.event.detectHash) {
        this.setState((state) => ({
          event: { ...state.event, detectHash: false },
        }))
        window.removeEventListener(
          'scroll',
          this._detectHashOnScroll
        )
      }
    }
    // END MOBILE EVENT
    if (
      this.state.loaderEndend &&
      !this.state.event.smoothScroll &&
      !this.context.mobile.isMobile
    ) {
      this.setState(
        (state) => ({
          event: { ...state.event, smoothScroll: true },
        }),
        () => {
          window.addEventListener(
            'wheel',
            throttle(this._smoothScroll, 1000, {
              leading: true,
              trailing: false,
            })
          )
        }
      )
    }
    this._updateActiveLink()
  }

  componentWillUnmount() {
    window.removeEventListener(
      'wheel',
      throttle(this._smoothScroll, 1000, {
        leading: true,
        trailing: false,
      })
    )
    window.addEventListener('wheel', blockScroll, {
      passive: false,
    })
    window.addEventListener(
      'scroll',
      this._detectHashOnScroll
    )
  }

  _debounceResize = debounce(() => {
    const { isMobile, toggleState } = this.context.mobile
    if (isMobile !== window.innerWidth <= 1024) {
      toggleState()
    }
  }, 50)

  _smoothScroll(e: WheelEvent) {
    const menuItems = Data.getInstance().getMenuItems()
    const down = e.deltaY > 1
    if (
      (Container.URL === menuItems.length - 1 && down) ||
      (Container.URL === 0 && !down)
    ) {
      return
    }
    down ? Container.URL++ : Container.URL--
    window.location.hash = menuItems[Container.URL]
    sessionStorage.setItem(
      'tabsIndex',
      Container.URL.toString()
    )
  }

  _detectHashOnScroll = () => {
    if (typeof this.sections === 'undefined') {
      this.sections = document.querySelectorAll('section')
      this.positionSections = getPositionOfEachSections(
        this.sections
      )
    }

    Container.URL = detectHashOnScroll(
      this.sections,
      this.positionSections
    )
  }

  _setLoaderEndend = (): void => {
    this.setState((prevState) => ({
      loaderEndend: !prevState.loaderEndend,
    }))
  }

  _setLoaderStarted = (): void => {
    this.setState((prevState) => ({
      loaderStarted: !prevState.loaderStarted,
    }))
  }

  _updateActiveLink = () => {
    const menuLinks = this.context.content.link!
    document.getElementById('active')?.removeAttribute('id')
    for (let i = 0; i < menuLinks.length; i++) {
      const link = menuLinks[i].href.split('#')[1]
      if (this.context.scrollManagement.hash === '') {
        menuLinks[0].id = 'active'
      } else if (
        `#${link}` === this.context.scrollManagement.hash
      ) {
        menuLinks[i].id = 'active'
      }
    }
  }

  render() {
    return (
      <div
        className='App'
        style={{ display: 'flex', flexFlow: 'wrap' }}
      >
        {!this.state.loaderEndend && (
          <Loader
            isMobile={this.context.mobile.isMobile}
            setLoaderEndend={this._setLoaderEndend}
            setLoaderStarted={this._setLoaderStarted}
          />
        )}
        {this.state.loaderStarted && (
          <>
            <Menu
              menuConfiguration={
                this.context.content.menuConfiguration
              }
              isMobile={this.context.mobile.isMobile}
              toggleMenu={this.context.menu.toggleState}
              menuIsOpen={this.context.menu.isOpen}
            />

            {Object.keys(
              this.context.content.pagesWithSlider
            ).map((page, i) => (
              <Page
                anchor={page}
                key={i}
                sliderImg={
                  this.context.content.pagesWithSlider[page]
                }
              />
            ))}
            {this.lastPage && (
              <PageWithScroll
                anchor={this.lastPage}
                isMobile={this.context.mobile.isMobile}
                previousAnchor={
                  this.context.content.menuItems[
                    this.context.content.menuItems.length -
                      2
                  ]
                }
              />
            )}
          </>
        )}
      </div>
    )
  }
}
export default Container
