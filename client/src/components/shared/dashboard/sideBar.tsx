import {
	ArrowLeftRight,
	LayoutDashboard,
	User,
	BarChart2,
	Settings,
	Pizza,
	CircleDollarSign,
	LogOut
} from 'lucide-react'
import MenuLink from './menuLink'
import Image from 'next/image'
import noavatar from '../../../../public/image.png'

const SideBar = () => {
	const menuItems: MenuGroup[] = [
		{
			title: 'Pages',
			list: [
				{
					title: 'Dashboard',
					path: '/dashboard',
					icon: <LayoutDashboard />
				},
				{
					title: 'Users',
					path: '/dashboard/users',
					icon: <User />
				},
				{
					title: 'Products',
					path: '/dashboard/products',
					icon: <Pizza />
				},
				{
					title: 'Transactions',
					path: '/dashboard/transactions',
					icon: <CircleDollarSign />
				}
			]
		},
		{
			title: 'Analytics',
			list: [
				{
					title: 'Overview',
					path: '/analytics/overview',
					icon: <BarChart2 />
				},
				{
					title: 'User Statistics',
					path: '/analytics/user-stats',
					icon: <User />
				},
				{
					title: 'Product Performance',
					path: '/analytics/product-performance',
					icon: <LayoutDashboard />
				},
				{
					title: 'Revenue Reports',
					path: '/analytics/revenue-reports',
					icon: <ArrowLeftRight />
				}
			]
		},
		{
			title: 'Settings',
			list: [
				{
					title: 'Profile',
					path: '/settings/profile',
					icon: <User />
				},
				{
					title: 'Account Settings',
					path: '/settings/account',
					icon: <Settings />
				},
				{
					title: 'Notifications',
					path: '/settings/notifications',
					icon: <LayoutDashboard />
				},
				{
					title: 'Security',
					path: '/settings/security',
					icon: <ArrowLeftRight />
				}
			]
		}
	]

	return (
		<div className='sticky top-5'>
			<div className='flex items-center gap-5 mb-5'>
				<Image
					className='rounded-[50%] object-cover'
					src={noavatar}
					alt=''
					width='50'
					height='50'
				/>
				<div className='flex items-center flex-col'>
					<span className='font-medium'>John</span>
					<span className='text-xs'>Adminstrator</span>
				</div>
			</div>
			<ul className='list-none font-bold text-xs '>
				{menuItems &&
					menuItems.map(cat => (
						<li key={cat.title}>
							<span>{cat.title}</span>
							{cat.list.map(item => (
								<MenuLink key={item.path} item={item} />
							))}
						</li>
					))}
			</ul>
			<button className='flex items-center gap-2.5 p-5 mb-1 mt-1 rounded-[10px] bg-none border-none w-[100%] text-white text-sm'>
				<LogOut />
				Logout
			</button>
		</div>
	)
}

export default SideBar
