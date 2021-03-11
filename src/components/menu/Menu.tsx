import { FC, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { Link } from '../templates'

import { disableScrollOnMenu } from '../../utils'
import { IMenu } from '../../interfaces'

import './menu.css'
import { useHashHooks, useScrollHooks } from '../../hooks'

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
  itemsNavigation: IMenu
  isMobile: Boolean
  toggleMenu: Function
  menuIsOpen: Boolean
  setActive: Function
}
const Menu: FC<PropsMenu> = ({
  itemsNavigation,
  isMobile,
  toggleMenu,
  setActive,
}) => {
  const listCollapsedMenu = useRef<HTMLDivElement>(null)

  const {
    contact,
    leftPart,
    logo,
    rightPart,
  } = itemsNavigation
  const { alt, src } = logo

  const toggleMenuList = (e: HTMLDivElement | any) => {
    // Mean start of the animation
    if (e instanceof HTMLDivElement) {
      e.style.opacity === '0' && (e.style.display = 'block')
      return
    }
    // When animation ended
    e.target.style.opacity === '0'
      ? (e.target.style.display = 'none')
      : (e.target.style.display = 'block')
    toggleMenu()
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
            itemsNavigation={itemsNavigation}
            portal={listCollapsedMenu.current}
            toggleMenuList={toggleMenuList}
            setActive={setActive}
          />
        ) : (
          <>
            <MenuSection position={'left'} items={leftPart}>
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
                HTMLClass='lastMenuItem'
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
  portal: HTMLDivElement | null
  toggleMenuList: Function
  setActive: Function
}
const CollapseMenu: FC<PropsCollpaseMenu> = ({
  itemsNavigation,
  portal,
  toggleMenuList,
  setActive,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  useEffect(() => {
    portal?.addEventListener(
      'touchmove',
      disableScrollOnMenu
    )
    return () => {
      portal?.removeEventListener(
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

  // Use context for create globalStore with one property ScrollFromLink: Boolean

  const toggleMenu = () => {
    toggleMenuList(portal)
    if (portal) {
      menuIsOpen
        ? (portal.style.opacity = '0')
        : setTimeout(() => {
            portal.style.opacity = '1'
          }, 50)
    }
    setMenuIsOpen(!menuIsOpen)
  }

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
      {portal !== null &&
        createPortal(
          <Portal
            fullMenuItems={fullMenuItems}
            toggleMenu={toggleMenu}
            setActive={setActive}
          />,
          portal
        )}
    </>
  )
}

interface PropsPortal {
  fullMenuItems: string[]
  toggleMenu: Function
  setActive: Function
}

const Portal: FC<PropsPortal> = ({
  fullMenuItems,
  toggleMenu,
  setActive,
}) => {
  const hash = useHashHooks()
  useEffect(() => {
    setActive(hash)
  }, [])
  return (
    <ul>
      {fullMenuItems.map((item, index) => {
        return (
          <li key={index}>
            <Link
              actionOnClick={toggleMenu}
              anchor
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
