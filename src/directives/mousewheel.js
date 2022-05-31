import normalizeWheel from 'normalize-wheel'

const isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().indexOf('firefox') > -1

const mousewheel = function (composite, callback) {
  if (composite && composite.addEventListener) {
    composite.addEventListener(isFirefox ? 'DOMMouseScroll' : 'mousewheel', function (event) {
      const normalized = normalizeWheel(event)
      callback && callback.apply(this, [event, normalized])
    })
  }
}

export default {
  bind (el, binding) {
    mousewheel(el, binding.value)
  }
}
