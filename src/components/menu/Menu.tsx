import React, { FC } from 'react'

import { IMenu } from '../../interfaces'

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
        <img src={src} alt={alt} />
      </MenuSection>
      <MenuSection position={'right'} items={rightPart}>
        <a>{contact.toUpperCase()}</a>
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
            {items.map((item) => (
              <li>
                <a>{item}</a>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li>
                <a>{item}</a>
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
