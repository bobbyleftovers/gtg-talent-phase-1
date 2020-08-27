// import Vue from 'vue'
import Header from './js/components/header.js'
// import init from './js/lib/init-modules'
// import { addClass, hasClass } from './js/lib/dom'

document.addEventListener('DOMContentLoaded', () => {
  new Header()
  // Init modules
  // init({
  //   'plugin-module': 'plugin-modules'
  // }).mount()

  // Add touch class if touch device and re-init modules
  // window.addEventListener('touchstart', () => {
  //   if (!hasClass('is-touch', document.body)) {
  //     addClass('is-touch', document.body)
  //     init({
  //       'plugin-module': 'plugin-modules'
  //     }).mount()
  //   }
  // })
})

// LoDash cuz its awesome
// window._ = require('lodash')

// import vue
// window.Vue = require('vue')

// Vue.prototype.$_window = window

/**
 * Startup Vue
 */

// const directory = document.querySelector('#profile-directory')

// if (directory) {
//   // set up vue
//   new Vue({
//     components: {
//       DirectoryMain
//     }
//   }).$mount('#profile-directory')
// }
