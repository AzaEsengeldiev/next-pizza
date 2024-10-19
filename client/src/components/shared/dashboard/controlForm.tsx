'use client'

import {Search} from "lucide-react";
import Link from "next/link";

interface Props {
    data: Product[]
    edit: any
    remove: any
}

const ControlForm = ({data, edit, remove}: Props) => {
    return (
        <div>
            <div className={'flex item-center justify-between mb-4'}>
                <div className='flex items-center gap-2  bg-[#2e374a] p-1 rounded-md'>
                    <Search width={15} height={15}/>
                    <input
                        className='bg-transparent border-none outline-none'
                        type='text'
                        placeholder='Search...'
                    />
                </div>
                <Link href={'/dashboard/products/add'} className='bg-purple-500 p-2 rounded-md'>
                    add new
                </Link>
            </div>
            <table className='w-full text-left'>
                <thead>
                <tr>
                    <th className='border p-2'>ID</th>
                    <th className='border p-2'>Name</th>
                    <th className='border p-2'>Price</th>
                    <th className='border p-2'>Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.map((product: Product) => (
                    <tr key={product.id}>
                        <td className='border p-2'>{product.id}</td>
                        <td className='border p-2'>{product.title}</td>
                        <td className='border p-2'>${product.price}</td>
                        <td className='border p-2'>
                            <button
                                onClick={() => edit(product.id)}
                                className='bg-yellow-500 text-white px-2 py-1 mr-2'
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => remove(product.id)}
                                className='bg-red-500 text-white px-2 py-1'
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ControlForm;