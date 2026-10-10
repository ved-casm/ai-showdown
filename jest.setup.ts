import "@testing-library/jest-dom";

class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
}
// @ts-ignore
global.IntersectionObserver = global.IntersectionObserver || IO;
// @ts-ignore
global.ResizeObserver = global.ResizeObserver || IO;
if (!window.matchMedia) {
  // @ts-ignore
  window.matchMedia = (q: string) => ({
    matches: false,
    media: q,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  });
}
