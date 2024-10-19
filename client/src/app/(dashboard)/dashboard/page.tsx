import React from 'react'
import './dashboard.css'
import Card from '@/components/shared/dashboard/card'
import RightBar from '@/components/shared/dashboard/rightBar'
import Transactions from '@/components/shared/dashboard/transactions'
import Chart from '@/components/shared/dashboard/chart'

const AdminPanel = () => {
	return (
		<div className='flex gap-5 mt-5'>
			<div className='flex-[3] flex flex-col gap-5'>
				<div className='flex justify-between gap-5'>
					<Card />
					<Card />
					<Card />
				</div>
				<Transactions />
				<Chart />
			</div>
			<div>
				<RightBar />
			</div>
		</div>
	)
}

export default AdminPanel
