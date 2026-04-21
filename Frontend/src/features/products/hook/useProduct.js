import { createProduct, getSellerProduct, getAllProducts, getProductById, addProductVariant } from "../services/product.api";
import { setSellerProducts, setProducts } from "../state/state.slice.js"
import { useDispatch } from "react-redux";


export const useProduct = () => {

    const dispatch = useDispatch()

    async function handleCreateProduct(formdata) {

        const data = await createProduct(formdata)
        return data.product
    }

    async function handleGetSellerProduct() {

        const data = await getSellerProduct()
        dispatch(setSellerProducts(data.products))
        return data.products
    }

    async function handleGetAllProducts() {
        const data = await getAllProducts()
         console.log("API DATA:", data)
        dispatch(setProducts(data.products))    
    }

    async function handleGetProductById(productId) {
        const data = await getProductById(productId)
        return data.product
    }

    async function handleAddProductVariant(productId, newProductVariant) {
        const data = await addProductVariant(productId, newProductVariant)

        return data
    }

    return { handleCreateProduct, handleGetSellerProduct, handleGetAllProducts, handleGetProductById, handleAddProductVariant }
}

