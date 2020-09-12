import scrollTo from '../lib/scroll-to'
class Header {
	constructor () {
		this.navItems = document.querySelectorAll('.button-custom-menu-item a')
		this.checkItems = document.querySelectorAll('.main-navigation a')
		this.init()
	}

	init () {
		const self = this
		this.navItems.forEach(item => {
			let toHash = item.getAttribute('href')

			if(toHash && document.querySelector(toHash)) {
				item.addEventListener('click', (e) => {
					e.preventDefault()
					const section = document.querySelector(toHash)
					scrollTo(section)
				})
			}
		})

		this.checkItems.forEach(item => {
			item.addEventListener('click', e => {
				let toHash = item.getAttribute('href')
				// check if hash is on page
				const exists = document.querySelector(toHash)

				if(!exists) {
					window.location.href = '/'
				}
			})
		})
	}
}

export default Header