import React, { FC } from 'react'

import { IMenu } from '../../interfaces'

import './menu.css'

interface PropsMenu {
  itemsNavigation: IMenu
}
const Menu: FC<PropsMenu> = ({ itemsNavigation }) => {
  const { contact, linkMenu, logo } = itemsNavigation
  const { src, alt } = logo
  return (
    <nav id='menu'>
      {console.log('ok')}
      <img src={src} alt={alt} />
      <ul>
        {linkMenu.map((link, index) => (
          <li key={index}>
            <a>{link.toUpperCase()}</a>
          </li>
        ))}
      </ul>
      <a>{contact.toUpperCase()}</a>
    </nav>
  )
}

export default Menu
