export enum Direction {
  Center = 'Center',
  Right = 'Right',
  RightTop = 'RightTop',
  Top = 'Top',
  TopLeft = 'TopLeft',
  Left = 'Left',
  LeftBottom = 'LeftBottom',
  Bottom = 'Bottom',
  BottomRight = 'BottomRight',
}

export enum DirectionCountMode {
  /**
   * Center、Right、Top、Left、Bottom
   */
  Five,
  /**
   * Center、Right、RightTop、Top、TopLeft、Left、LeftBottom、Bottom、BottomRight
   */
  Nine,
}
