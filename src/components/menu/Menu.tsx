import { FC, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { Link } from '../templates'

import { IMenu } from '../../interfaces'

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
      transform: 'rotate(400deg)',
      top: '13px',
    },
    {
      transform: 'rotate(320deg)',
    },
    {
      opacity: '0',
      transform: 'rotate(360deg)',
    },
  ],
}

interface PropsMenu {
  itemsNavigation: IMenu
}
const Menu: FC<PropsMenu> = ({ itemsNavigation }) => {
  const listCollapsedMenu = useRef<HTMLDivElement>(null)
  const isMobile = window.innerWidth <= 1024
  const {
    contact,
    leftPart,
    logo,
    rightPart,
  } = itemsNavigation
  const { alt, src } = logo

  const toggleMenuList = (e: HTMLDivElement | any) => {
    if (e instanceof HTMLDivElement) {
      e.style.opacity === '0' && (e.style.display = 'block')
      return
    }
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
            itemsNavigation={itemsNavigation}
            portal={listCollapsedMenu.current}
            toggleMenuList={toggleMenuList}
          />
        ) : (
          <>
            <MenuSection position={'left'} items={leftPart}>
              <img
                alt={alt}
                src={src}
                style={{ width: 110, height: 'auto' }}
              />
            </MenuSection>
            <MenuSection
              position={'right'}
              items={rightPart}
            >
              <Link
                label={contact.toUpperCase()}
                anchor
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
}
const CollapseMenu: FC<PropsCollpaseMenu> = ({
  itemsNavigation,
  portal,
  toggleMenuList,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  useEffect(() => {
    portal?.addEventListener('touchmove', (e) => {
      e.preventDefault()
    })
  }, [])

  const {
    contact,
    leftPart,
    rightPart,
    logo,
  } = itemsNavigation
  const { alt, src } = logo
  const { bars, close, open } = BURGERMENUCONFIG

  const fullMenuItems = [...leftPart, ...rightPart, contact]

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
      <img
        alt={alt}
        src={src}
        style={{
          width: 110,
        }}
      />
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
          <ul>
            {fullMenuItems.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    anchor
                    HTMLClass='itemBurgerMenu'
                    label={item.toLocaleUpperCase()}
                    to={item}
                  />
                </li>
              )
            })}
          </ul>,
          portal
        )}
    </>
  )
}

export default Menu
