import ResizeObserver from 'resize-observer-polyfill';

const isServer = typeof window === 'undefined';

/* istanbul ignore next */
const resizeHandler = function(entries) {
  for (let entry of entries) {
    const listeners = entry.target.__resizeListeners__ || [];
    if (listeners.length) {
      listeners.forEach(fn => {
        fn();
      });
    }
  }
};

/* istanbul ignore next */
export const addResizeListener = function(composite, fn) {
  if (isServer) return;
  if (!composite.__resizeListeners__) {
    composite.__resizeListeners__ = [];
    composite.__ro__ = new ResizeObserver(resizeHandler);
    composite.__ro__.observe(composite);
  }
  composite.__resizeListeners__.push(fn);
};

/* istanbul ignore next */
export const removeResizeListener = function(composite, fn) {
  if (!composite || !composite.__resizeListeners__) return;
  composite.__resizeListeners__.splice(composite.__resizeListeners__.indexOf(fn), 1);
  if (!composite.__resizeListeners__.length) {
    composite.__ro__.disconnect();
  }
};
