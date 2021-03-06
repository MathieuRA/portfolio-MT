import { FC, useState } from 'react'

import { IMenu } from '../../interfaces'
import { Link } from '../templates'

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
  const isMobile = window.innerWidth <= 1024
  const {
    contact,
    leftPart,
    logo,
    rightPart,
  } = itemsNavigation
  const { alt, src } = logo

  return (
    <nav id='menu'>
      {isMobile ? (
        <CollapseMenu logo={logo} />
      ) : (
        <>
          <MenuSection position={'left'} items={leftPart}>
            <img
              alt={alt}
              src={src}
              style={{ width: 110, height: 'auto' }}
            />
          </MenuSection>
          <MenuSection position={'right'} items={rightPart}>
            <Link
              label={contact.toUpperCase()}
              anchor
              to={contact}
            />
          </MenuSection>
        </>
      )}
    </nav>
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
  logo: {
    alt: string
    src: string
  }
}
const CollapseMenu: FC<PropsCollpaseMenu> = ({ logo }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  const { alt, src } = logo
  const { bars, close, open } = BURGERMENUCONFIG

  const toggleMenu = () => {
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
    </>
  )
}

export default Menu
