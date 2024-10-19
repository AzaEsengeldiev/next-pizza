interface MenuItem {
	title: string
	path: string
	icon: ReactNode
}

interface MenuGroup {
	title: string
	list: MenuItem[]
}
