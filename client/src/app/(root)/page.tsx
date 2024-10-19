'use client'
import {Container, Filters, Title} from '@/components/shared'
import {ProductCard} from '@/components/shared/product-card'
import {cn} from '@/lib/utils'
import {useGetProductsQuery} from '@/service/product-service'

export default function Home() {
    const {data, isError, isLoading} = useGetProductsQuery('')

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error loading products</p>

    console.log(data)

    return (
        <>
            <Container className='mt-10'>
                <Title text='Все пиццы' size='lg' className='font-extrabold'/>
            </Container>

            <Container className='mt-10 pb-14'>
                <div className='flex gap-[80px]'>
                    <div className='w-[250px]'>
                        <Filters/>
                    </div>

                    <div className='flex-1'>
                        <div className='flex flex-col gap-16'>
                            <div className={cn('grid grid-cols-3 gap-[50px]')}>
                                {data &&
                                    data.map((product: Product, idx: number) => (
                                        <ProductCard
                                            key={idx}
                                            id={product.id ?? 0}
                                            description={product.description}
                                            title={product.title}
                                            imageUrl={product.image}
                                            price={product.price ?? 0}
                                            ingredients={product.ingredients}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
