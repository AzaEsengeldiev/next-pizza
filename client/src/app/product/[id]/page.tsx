'use client'
import { ProductForm } from '@/components/shared/product-form'
import { useGetOneProductQuery } from '@/service/product-service'
import { useParams } from 'next/navigation'
import React from 'react'

const Product = () => {
	const { id } = useParams()

	const { data, error, isLoading } = useGetOneProductQuery(id as string)

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>Error loading product</div>

	console.log(data)

	return (
		<div>
			<ProductForm product={data} />
		</div>
	)
}

export default Product
