export const getPositionOfEachSections = (
  sections: NodeListOf<HTMLElement>
): number[][] => {
  let sectionPosition: number[][] = []
  for (let index = 0; index < sections.length; index++) {
    const element = sections[index]
    if (typeof sectionPosition[0] === 'undefined') {
      sectionPosition = [[0, element.clientHeight]]
    } else {
      const previousValue =
        sectionPosition[sectionPosition.length - 1]
      const nextValue = [
        previousValue[1],
        previousValue[1] + element.clientHeight,
      ]
      sectionPosition.push(nextValue)
    }
  }
  return sectionPosition
}
