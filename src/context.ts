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

/** Index of the ghost slot this joystick belongs to; null when not inside a GhostArea. */
export const SlotIndexContext = React.createContext<number | null>(null);

/** Shared mutable refs provided by GhostArea for synchronous touch-to-slot assignment. */
export const GhostAreaManagementContext = React.createContext<{
  /** Maps touch identifier → slot index (updated synchronously before document bubble). */
  touchAssignments: React.MutableRefObject<Map<number, number>>;
} | null>(null);
