'use client'

import { Bell, Earth, MessageSquareText, Search } from 'lucide-react'
import { usePathname } from 'next/navigation'

const Navbar = () => {
	const pathname = usePathname()
	return (
		<div className='flex items-center justify-between rounded-md bg-bgSoft p-6'>
			<div className='font-bold capitalize'>{pathname.split('/').pop()}</div>
			<div className='flex items-center gap-5'>
				<div className='flex items-center gap-2.5  bg-[#2e374a] p-2.5 rounded-md'>
					<Search className='' />
					<input
						className='bg-transparent border-none outline-none'
						type='text'
						placeholder='Search...'
					/>
				</div>
				<div className='flex items-center gap-2'>
					<MessageSquareText size={20} />
					<Bell size={20} />
					<Earth size={20} />
				</div>
			</div>
		</div>
	)
}

export default Navbar
