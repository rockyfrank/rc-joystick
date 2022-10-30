import React from 'react';

export const useStyleByRadius = (radius: number, style: React.CSSProperties = {}) => {
  const diameter = radius * 2;
  return {
    ...style,
    width: diameter,
    height: diameter,
  };
};
