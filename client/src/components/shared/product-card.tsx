import Link from 'next/link'
import React from 'react'
import {Title} from './title'
import {Button} from '../ui/button'
import {Plus} from 'lucide-react'
import {BASE_URL} from '@/constants'

// import { Ingredient } from '@prisma/client'

interface Props {
    id: number
    title: string
    description: string
    price: number
    imageUrl: string
    ingredients: string[]
    className?: string
}

export const ProductCard: React.FC<Props> = ({
                                                 id,
                                                 title,
                                                 description,
                                                 price,
                                                 imageUrl,
                                                 ingredients,
                                                 className
                                             }) => {
    return (
        <div className={className}>
            <Link href={`/product/${id}`}>
                <div className='flex justify-center p-6 bg-orange-50 rounded-lg h-[260px]'>
                    <img
                        className='w-[215px] h-[215px]'
                        src={`${BASE_URL}/${imageUrl}`}
                        alt={title}
                    />
                </div>

                <Title text={title} size='sm' className='mb-1 mt-3 font-bold'/>

                <p className='text-sm text-gray-400'>
                    {ingredients && ingredients.map(ingredient => ingredient).join(', ')}
                </p>

                <div className='flex justify-between items-center mt-4'>
					<span className='text-[20px]'>
						от <b>{price} ₽</b>
					</span>

                    <Button
                        variant='secondary'
                        className='text-base  font-bold rounded-xl'
                    >
                        <Plus size={20} className='mr-1'/>
                        Добавить
                    </Button>
                </div>
            </Link>
        </div>
    )
}
