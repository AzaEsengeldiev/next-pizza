import {api} from '../redux/index'

const extendedApi = api.injectEndpoints({
    endpoints: build => ({
        getUsers: build.query({
            query: () => ({
                url: 'users',
                method: 'GET'
            }),
            providesTags: ['crud']
        }),
        getOneProduct: build.query({
            query: (id: string) => ({
                url: `products/${id}`,
                method: 'GET'
            }),
            providesTags: ['crud']
        }),
        createProduct: build.mutation({
            query: (product) => {
                return {
                    url: `products/create`,
                    method: 'POST',
                    body: product,
                };
            },
            invalidatesTags: ['crud'],
        }),
        editProduct: build.mutation({
            query: (id, ...patch) => ({
                url: `products/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: ['crud']
        }),
        deleteProduct: build.mutation({
            query: (id) => ({
                url: `products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['crud']
        }),
    }),
    overrideExisting: false
});

export const {
    useGetUsersQuery,
    useGetOneProductQuery,
    useEditProductMutation,
    useDeleteProductMutation,
    useCreateProductMutation,
} = extendedApi;
