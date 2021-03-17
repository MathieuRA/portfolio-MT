import React, {
  FC,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
} from 'react'
import { createPortal } from 'react-dom'

import { Link } from '../templates'

import { disableScrollOnMenu } from '../../utils'
import { IMenu } from '../../interfaces'

import StoreContext from '../../context/storeContext'

import './menu.css'

const BURGERMENUCONFIG = {
  close: {
    backgroundColor: 'var(--main-gold)',
    opacity: '1',
    transform: 'rotate(0deg)',
  },
  open: {
    backgroundColor: 'var(--main-grey)',
  },
  bars: [
    {
      transform: 'rotate(680deg)',
      top: '13px',
    },
    {
      transform: 'rotate(580deg)',
    },
    {
      opacity: '0',
      transform: 'rotate(500deg)',
    },
  ],
}

interface PropsMenu {
  menuConfiguration: IMenu
  isMobile: boolean
  toggleMenu: Function
  menuIsOpen: boolean
}
const Menu: FC<PropsMenu> = React.memo(
  ({
    menuConfiguration,
    isMobile,
    toggleMenu,
    menuIsOpen,
  }) => {
    const listCollapsedMenu = useRef<HTMLDivElement>(null)

    const {
      contact,
      leftPart,
      logo,
      rightPart,
    } = menuConfiguration
    const { alt, src } = logo

    const toggleMenuList = (e: HTMLDivElement | any) => {
      // Mean start of the animation
      if (e instanceof HTMLDivElement) {
        e.style.opacity === '0' &&
          (e.style.display = 'block')
        toggleMenu()

        return
      }
      // When animation ended
      e.target.style.opacity === '0'
        ? (e.target.style.display = 'none')
        : (e.target.style.display = 'block')
    }

    return (
      <>
        {isMobile && (
          <div
            id='listMenu'
            onTransitionEnd={toggleMenuList}
            ref={listCollapsedMenu}
            style={{
              opacity: 0,
            }}
          ></div>
        )}

        <nav id='menu'>
          {isMobile ? (
            <CollapseMenu
              itemsNavigation={menuConfiguration}
              portal={listCollapsedMenu}
              toggleMenuList={toggleMenuList}
              menuIsOpen={menuIsOpen}
            />
          ) : (
            <>
              <MenuSection
                position={'left'}
                items={leftPart}
              >
                <a href='#'>
                  <img
                    alt={alt}
                    src={src}
                    style={{ width: 110, height: 'auto' }}
                  />
                </a>
              </MenuSection>
              <MenuSection
                position={'right'}
                items={rightPart}
              >
                <Link
                  anchor
                  disabled
                  HTMLClass='lastMenuItem'
                  index={4}
                  label={contact.toUpperCase()}
                  to={contact}
                />
              </MenuSection>
            </>
          )}
        </nav>
      </>
    )
  }
)

interface MenuSectionProps {
  items: string[]
  position: string
}
const MenuSection: FC<MenuSectionProps> = ({
  children,
  items,
  position,
}) => {
  return (
    <div className='divisedMenu'>
      {position === 'left' ? (
        <>
          {children}
          <ul>
            {items.map((item, i) => (
              <li key={i}>
                <Link
                  anchor
                  index={i}
                  label={item.toUpperCase()}
                  to={item}
                />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <ul>
            {items.map((item, i) => (
              <li key={i}>
                <Link
                  anchor
                  // WORKAROUND
                  index={i + 2}
                  label={item.toUpperCase()}
                  to={item}
                />
              </li>
            ))}
          </ul>
          {children}
        </>
      )}
    </div>
  )
}

interface PropsCollpaseMenu {
  itemsNavigation: IMenu
  portal: {
    current: HTMLDivElement | null
  }
  toggleMenuList: Function
  menuIsOpen: boolean
}
const CollapseMenu: FC<PropsCollpaseMenu> = ({
  itemsNavigation,
  portal,
  toggleMenuList,
  menuIsOpen,
}) => {
  useLayoutEffect(() => {
    portal.current?.addEventListener(
      'touchmove',
      disableScrollOnMenu
    )
    return () => {
      portal.current?.removeEventListener(
        'touchmove',
        disableScrollOnMenu
      )
    }
  }, [portal])

  const {
    contact,
    leftPart,
    rightPart,
    logo,
  } = itemsNavigation
  const { alt, src } = logo
  const { bars, close, open } = BURGERMENUCONFIG

  const fullMenuItems = [...leftPart, ...rightPart, contact]

  const { current } = portal

  const toggleMenu = useCallback(() => {
    const { current } = portal
    toggleMenuList(current)
    // Timeout to wait portal display are changing from none
    setTimeout(() => {
      if (current) {
        menuIsOpen
          ? (current.style.opacity = '0')
          : (current.style.opacity = '1')
      }
    }, 10)
  }, [portal, menuIsOpen])

  return (
    <>
      <a href='#'>
        <img
          alt={alt}
          src={src}
          style={{
            width: 110,
          }}
        />
      </a>
      <div id='burgerMenu' onClick={toggleMenu}>
        {bars.map((cssProperty, index) => (
          <div
            key={index}
            style={
              menuIsOpen
                ? { ...cssProperty, ...open }
                : { ...close }
            }
          />
        ))}
      </div>
      {current !== null &&
        createPortal(
          <Portal
            fullMenuItems={fullMenuItems}
            toggleMenu={toggleMenu}
          />,
          current
        )}
    </>
  )
}

interface PropsPortal {
  fullMenuItems: string[]
  toggleMenu: Function
}

const Portal: FC<PropsPortal> = ({
  fullMenuItems,
  toggleMenu,
}) => {
  const store = useContext(StoreContext)

  return (
    <ul>
      {fullMenuItems.map((item, index) => {
        return (
          <li key={index}>
            <Link
              actionOnClick={toggleMenu}
              anchor
              disabled={
                fullMenuItems.length - 1 === index
                  ? true
                  : false
              }
              index={index}
              HTMLClass={`itemBurgerMenu ${
                fullMenuItems.length - 1 === index
                  ? 'lastMenuItem'
                  : ''
              }`}
              label={item.toLocaleUpperCase()}
              to={item}
            />
          </li>
        )
      })}
    </ul>
  )
}
export default Menu
