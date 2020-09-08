import { delegate, scrollTop, getTopOffset } from './dom'
import getTarget from './get-hash-target.js'

/**
 * @param {HTMLElement} el Container element to bind <a> clicks to
 */
export default function scrollTo (el, cb = () => {}) {
  // console.log('scrollTo')
  // delegate('click', function (e) {
  //   const anchor = e.target
  //   const target = getTarget(anchor)
  //   console.log('target', target)
  //   if (target) {
  //     e.preventDefault()
  //     scrollTop(getTopOffset(target) - 70)
  //     cb()
  //   }
  // }, 'a', el)
}
