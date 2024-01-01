import { Direction, DirectionCountMode } from './enums';

export interface IJoystickChangeValue {
  direction: Direction;
  angle: number | undefined;
  distance: number;
}

export interface IJoystickProps {
  /**
   * joystick container's extra className
   */
  className?: string;
  /**
   * joystick controller's extra className
   */
  controllerClassName?: string;
  /**
   * joystick base radius
   * @default 75
   */
  baseRadius?: number;
  /**
   * joystick controller radius
   * @default 35
   */
  controllerRadius?: number;
  /**
   * controller will always be inside joystick's base if `insideMode` is true
   * @default false
   */
  insideMode?: boolean;
  /**
   * direction count mode
   * five for: Center、Right、Top、Left、Bottom
   * nine for: Center、Right、RightTop、Top、TopLeft、Left、LeftBottom、Bottom、BottomRight
   * @default DirectionCountMode.Five
   */
  directionCountMode?: DirectionCountMode;
  /**
   * Trigger throttle (ms)
   * @default 0
   */
  throttle?: number;
  /**
   * Trigger when the any of angle/direction/distance state is changing
   */
  onChange?: (val: IJoystickChangeValue) => void;
  /**
   * Trigger when the angle state is changing
   */
  onAngleChange?: (angle?: number) => void;
  /**
   * Trigger when the direction state is changing
   */
  onDirectionChange?: (direction: Direction) => void;
  /**
   * Trigger when the distance state is changing
   */
  onDistanceChange?: (distance: number) => void;
  /**
   * Custom render controller
   */
  renderController?: (props: IJoystickControllerProps) => React.ReactNode;
  /**
   * custom arrows render map
   */
  renderArrows?: ICustomArrowsRenderMap;
}

export interface IBaseArrowProps {
  isActive: boolean;
}

export interface ICustomArrowsRenderMap {
  [Direction.Top]?: React.FC<IBaseArrowProps>;
  [Direction.Right]?: React.FC<IBaseArrowProps>;
  [Direction.Bottom]?: React.FC<IBaseArrowProps>;
  [Direction.Left]?: React.FC<IBaseArrowProps>;
}

export interface IJoystickControllerProps {
  radius: number;
  className?: string;
}

export interface IControllerWrapperProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  location: ILocation;
  /**
   * Transition time for controller to return to origin (unit: ms)
   */
  transition?: number;
}

export interface ILocation {
  top: number;
  left: number;
}

export interface IRange {
  min: number;
  max: number;
}

export interface IGhostContextValue {
  isActive: boolean;
  ghost: boolean;
  getGhostArea: () => HTMLDivElement | null;
}
