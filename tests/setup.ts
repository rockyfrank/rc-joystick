import '@testing-library/jest-dom';

// 添加自定义的 jest-dom 匹配器
expect.extend({
  toBeInTheDocument(received) {
    const pass = received !== null;
    if (pass) {
      return {
        message: () => `expected ${received} not to be in the document`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be in the document`,
        pass: false,
      };
    }
  },
});

// jsdom 不支持 Touch 构造函数，添加 polyfill
if (typeof globalThis.Touch === 'undefined') {
  (globalThis as any).Touch = class Touch {
    identifier: number;
    target: EventTarget;
    clientX: number;
    clientY: number;
    pageX: number;
    pageY: number;
    screenX: number;
    screenY: number;
    radiusX: number;
    radiusY: number;
    rotationAngle: number;
    force: number;

    constructor(init: TouchInit) {
      this.identifier = init.identifier;
      this.target = init.target;
      this.clientX = init.clientX ?? 0;
      this.clientY = init.clientY ?? 0;
      this.pageX = init.pageX ?? 0;
      this.pageY = init.pageY ?? 0;
      this.screenX = init.screenX ?? 0;
      this.screenY = init.screenY ?? 0;
      this.radiusX = init.radiusX ?? 0;
      this.radiusY = init.radiusY ?? 0;
      this.rotationAngle = init.rotationAngle ?? 0;
      this.force = init.force ?? 0;
    }
  };
}
