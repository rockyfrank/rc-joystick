import React from 'react';

import { IGhostContextValue } from './typings';

export const GhostContext = React.createContext<IGhostContextValue>({
  isActive: false,
  ghost: false,
});

export const GhostAreaInstanceContext = React.createContext<{
  getGhostArea: () => HTMLDivElement | null;
}>({
  getGhostArea: () => null,
});
