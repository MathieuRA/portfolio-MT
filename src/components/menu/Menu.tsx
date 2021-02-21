import { FC, useContext } from 'react'
import ScrollContext from '../../context/scrollContext'

import { IMenu } from '../../interfaces'
import { Link } from '../templates'

import './menu.css'

interface PropsMenu {
  itemsNavigation: IMenu
}
const Menu: FC<PropsMenu> = ({ itemsNavigation }) => {
  const {
    contact,
    leftPart,
    logo,
    rightPart,
  } = itemsNavigation
  const { alt, src } = logo

  return (
    <nav id='menu'>
      <MenuSection position={'left'} items={leftPart}>
        <img
          alt={alt}
          src={src}
          style={{ width: 110, height: 'auto' }}
        />
      </MenuSection>
      <MenuSection position={'right'} items={rightPart}>
        <Link label={contact.toUpperCase()} to={contact} />
      </MenuSection>
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

export default Menu
