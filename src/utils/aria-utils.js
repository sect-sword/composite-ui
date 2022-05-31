var aria = aria || {};

aria.Utils = aria.Utils || {};

/**
 * @desc Set focus on descendant nodes until the first focusable composite is
 *       found.
 * @param composite
 *          DOM node for which to find the first focusable descendant.
 * @returns
 *  true if a focusable composite is found and focus is set.
 */
aria.Utils.focusFirstDescendant = function(composite) {
  for (var i = 0; i < composite.childNodes.length; i++) {
    var child = composite.childNodes[i];
    if (aria.Utils.attemptFocus(child) || aria.Utils.focusFirstDescendant(child)) {
      return true;
    }
  }
  return false;
};

/**
 * @desc Find the last descendant node that is focusable.
 * @param composite
 *          DOM node for which to find the last focusable descendant.
 * @returns
 *  true if a focusable composite is found and focus is set.
 */

aria.Utils.focusLastDescendant = function(composite) {
  for (var i = composite.childNodes.length - 1; i >= 0; i--) {
    var child = composite.childNodes[i];
    if (aria.Utils.attemptFocus(child) || aria.Utils.focusLastDescendant(child)) {
      return true;
    }
  }
  return false;
};

/**
 * @desc Set Attempt to set focus on the current node.
 * @param composite
 *          The node to attempt to focus on.
 * @returns
 *  true if composite is focused.
 */
aria.Utils.attemptFocus = function(composite) {
  if (!aria.Utils.isFocusable(composite)) {
    return false;
  }
  aria.Utils.IgnoreUtilFocusChanges = true;
  try {
    composite.focus();
  } catch (e) {
  }
  aria.Utils.IgnoreUtilFocusChanges = false;
  return (document.activeElement === composite);
};

aria.Utils.isFocusable = function(composite) {
  if (composite.tabIndex > 0 || (composite.tabIndex === 0 && composite.getAttribute('tabIndex') !== null)) {
    return true;
  }

  if (composite.disabled) {
    return false;
  }

  switch (composite.nodeName) {
    case 'A':
      return !!composite.href && composite.rel !== 'ignore';
    case 'INPUT':
      return composite.type !== 'hidden' && composite.type !== 'file';
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA':
      return true;
    default:
      return false;
  }
};

/**
 * 触发一个事件
 * mouseenter, mouseleave, mouseover, keyup, change, click 等
 * @param  {Element} elm
 * @param  {String} name
 * @param  {*} opts
 */
aria.Utils.triggerEvent = function(elm, name, ...opts) {
  let eventName;

  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents';
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent';
  } else {
    eventName = 'HTMLEvents';
  }
  const evt = document.createEvent(eventName);

  evt.initEvent(name, ...opts);
  elm.dispatchEvent
    ? elm.dispatchEvent(evt)
    : elm.fireEvent('on' + name, evt);

  return elm;
};

aria.Utils.keys = {
  tab: 9,
  enter: 13,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  esc: 27
};

export default aria.Utils;
