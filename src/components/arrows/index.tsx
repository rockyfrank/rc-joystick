import React from 'react';

import { IBaseArrowProps } from '../../typings';

const size = 20;
const getArrowColor = (isActive: boolean) => {
  return isActive ? '#a6a6a6' : '#ddd';
};

export const Down: React.FC<IBaseArrowProps> = ({ isActive }) => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="893"
      width={size}
      height={size}
    >
      <path
        d="M1003.52 240.64c-30.72-30.72-76.8-30.72-107.52 0L512 619.52 133.12 240.64C102.4 209.92 51.2 209.92 20.48 240.64s-30.72 76.8 0 107.52l435.2 435.2c30.72 30.72 76.8 30.72 107.52 0l435.2-435.2c30.72-30.72 30.72-76.8 5.12-107.52z"
        fill={getArrowColor(isActive)}
        p-id="894"
      ></path>
    </svg>
  );
};

export const Up: React.FC<IBaseArrowProps> = ({ isActive }) => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1031"
      width={size}
      height={size}
    >
      <path
        d="M20.48 783.36c30.72 30.72 76.8 30.72 107.52 0L512 404.48l378.88 378.88c30.72 30.72 76.8 30.72 107.52 0 30.72-30.72 30.72-76.8 0-107.52L563.2 240.64c-30.72-30.72-76.8-30.72-107.52 0L20.48 675.84c-25.6 30.72-25.6 76.8 0 107.52z"
        fill={getArrowColor(isActive)}
        p-id="1032"
      ></path>
    </svg>
  );
};

export const Left: React.FC<IBaseArrowProps> = ({ isActive }) => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1169"
      width={size}
      height={size}
    >
      <path
        d="M783.36 1003.52c30.72-30.72 30.72-76.8 0-107.52L404.48 512l378.88-378.88c30.72-30.72 30.72-76.8 0-107.52-30.72-30.72-76.8-30.72-107.52 0L240.64 455.68c-30.72 30.72-30.72 76.8 0 107.52l435.2 435.2c30.72 30.72 76.8 30.72 107.52 5.12z"
        fill={getArrowColor(isActive)}
        p-id="1170"
      ></path>
    </svg>
  );
};

export const Right: React.FC<IBaseArrowProps> = ({ isActive }) => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1307"
      width={size}
      height={size}
    >
      <path
        d="M240.64 20.48c-30.72 30.72-30.72 81.92 0 112.64l378.88 378.88-378.88 378.88c-30.72 30.72-30.72 76.8 0 107.52s76.8 30.72 107.52 0l435.2-435.2c30.72-30.72 30.72-76.8 0-107.52L348.16 20.48c-30.72-25.6-76.8-25.6-107.52 0z"
        fill={getArrowColor(isActive)}
        p-id="1308"
      ></path>
    </svg>
  );
};
