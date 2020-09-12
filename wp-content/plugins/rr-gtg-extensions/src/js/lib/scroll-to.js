import { delegate, scrollTop, getTopOffset } from './dom'
import getTarget from './get-hash-target.js'

/**
 * @param {HTMLElement} el Container element to bind <a> clicks to
 */
export default function scrollTo (el) {
    if (el) {
      scrollTop(getTopOffset(el) - 70)
    }
}
