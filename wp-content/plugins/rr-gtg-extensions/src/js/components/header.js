import scrollTo from '../lib/scroll-to'
class Header {
	constructor () {
		this.navItems = document.querySelectorAll('.scroll-nav')
		this.init()
	}

	init () {
		const self = this
		this.navItems.forEach(item => {
			const link = item.querySelector('a')
			let toHash = null
			item.classList.forEach(cls => {
				if(cls.includes('scroll-nav--')){
					toHash = cls.split('--')[1]
				}
			})

			if(toHash && document.querySelector('#' + toHash)) {
				link.addEventListener('click', (e) => {
					e.preventDefault()
					const section = document.querySelector('#' + toHash)
					window.scrollTo({
						top: section.scrollTop + 70,
						left: 0,
						behavior: 'smooth'
					})
				})
			}
		})
	}
}

export default Header