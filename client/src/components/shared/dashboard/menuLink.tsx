'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface MenuLinkProps {
	item: MenuItem
}

const MenuLink = ({ item }: MenuLinkProps) => {
	const pathname = usePathname()

	return (
		<Link
			href={item.path}
			className={`flex items-center gap-2 p-5 mb-1 mt-1 hover:bg-[#2e374a]  ${
				pathname === item.path && 'bg-[#2e374a] rounded-md'
			}`}
		>
			{item.icon}
			<h1>{item.title}</h1>
		</Link>
	)
}

export default MenuLink
