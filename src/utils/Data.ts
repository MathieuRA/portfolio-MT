import config from '../config.json'

import { IMenu, ISliderConfiguration } from '../interfaces'

const { menu, slider } = config
const { contact, item, logo } = menu
const { leftPart, rightPart } = item

/**
 * Data is a singelton
 */
class Data {
  static instance: Data

  private constructor() {}

  public static getInstance(): Data {
    if (!this.instance) {
      this.instance = new Data()
    }
    return this.instance
  }

  /**
   * getMenuItems returning every menu item
   *
   * @return string[]
   */
  public getMenuItems(): string[] {
    return [...leftPart, ...rightPart]
  }

  /**
   * Get the number of elements in the menu
   *
   * @return number
   */
  public getMenuItemsLenght(): number {
    return leftPart.length + rightPart.length
  }

  /**
   * getNavigation is returning the navigation configuration as IMenu object
   *
   * ```typescript
   * {
   *  contact: string,
   *  leftPart: string[],
   *  logo: string,
   *  rightPart: string[]
   * }
   * ```
   *
   * @return object of type IMenu
   */
  public getNavigation(): IMenu {
    return { contact, leftPart, logo, rightPart }
  }

  /**
   * getSliderImgs returning the img path of each img on slider
   *
   *  ```typescript
   * {
   *    slider1: string[],
   *    slider2: string[],
   *    ...
   * }
   * ```
   *
   * @return object
   */
  public getSliderImgs(): ISliderConfiguration {
    return slider
  }
}

export default Data
