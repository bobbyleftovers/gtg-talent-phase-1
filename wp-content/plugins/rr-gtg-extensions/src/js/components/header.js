// import scrollTo from '../lib/scroll-to'
class Header {
	constructor () {
		this.navItems = document.querySelectorAll('.scroll-nav')
		console.log('items', this.navItems)
		this.init()
	}

	init () {
		const self = this
		this.navItems.forEach(item => {
			const link = item.querySelector('a')
			console.log(link)
			let toHash = null
			item.classList.forEach(cls => {
				if(cls.includes('scroll-nav--')){
					toHash = cls.split('--')[1]
				}
			})

			console.log('toHash', toHash)

			if(toHash && document.querySelector('#' + toHash)) {
				console.log('add listener', toHash)
				link.addEventListener('click', (e) => {
					e.preventDefault()
					const section = document.querySelector('#' + toHash)
					console.log('section', section, section.scrollTop)
					window.scrollTo()
				})
			}
		})
	}
}

export default Header