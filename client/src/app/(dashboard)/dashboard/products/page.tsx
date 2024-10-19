'use client'
import '../dashboard.css'
import {useDeleteProductMutation, useEditProductMutation, useGetProductsQuery} from "@/service/product-service";
import ControlForm from "@/components/shared/dashboard/controlForm";

const Products = () => {
    const {data, isLoading, error} = useGetProductsQuery('')
    const [editProduct] = useEditProductMutation()
    const [deleteProduct] = useDeleteProductMutation()


    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error fetching products!</p>

    const handleEditProduct = async (productId: number) => {
        const newTitle = prompt("Enter new product title", "New Product Title");
        const newPrice = parseFloat(prompt("Enter new product price", "100") || "0");
        const result = {id: productId, title: newTitle,};

        try {
            await editProduct(productId,).unwrap();
            console.log(`Product with id ${productId} has been edited successfully.`);
        } catch (err) {
            console.error("Failed to edit product: ", err);
        }
    }

    const handleDeleteProduct = async (productId: number) => {
        try {
            const result = await deleteProduct(productId).unwrap();
            console.log(`Product with id ${result} has been deleted successfully.`);
            return result
        } catch (err) {
            console.error("Failed to delete product: ", err);
        }
    }

    return (
        <div className='bg-bgSoft p-5 mt-4'>
            {data?.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <ControlForm data={data} edit={handleEditProduct} remove={handleDeleteProduct}/>
            )}
        </div>
    )
}

export default Products
