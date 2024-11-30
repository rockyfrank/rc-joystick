import { deviceDetect } from 'react-device-detect';

const deviceDetectCache: Record<
  string,
  {
    isMobile?: boolean;
  }
> = {};

export const isMobile = () => {
  const cache = deviceDetectCache[navigator.userAgent];
  if (cache) return !!cache.isMobile;
  deviceDetectCache[navigator.userAgent] = deviceDetect(navigator.userAgent);
  return !!deviceDetectCache[navigator.userAgent].isMobile;
};
