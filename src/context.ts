import React from 'react';

import { IGhostContextValue } from './typings';

export const GhostContext = React.createContext<IGhostContextValue>({
  isActive: false,
  ghost: false,
  getGhostArea: () => null,
});
