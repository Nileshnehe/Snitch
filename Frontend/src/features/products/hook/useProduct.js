import { createProduct, getSellerProduct } from "../services/product.api";
import {setSellerProducts} from "../state/state.slice"
import { useDispatch } from "react-redux";


export const useProduct = ()=> {
    const dispatch = useDispatch()

    async function handleCreateProduct(formdata) {
        const data = await createProduct(formdata)
        return data.product
    }

    async function handleGetSellerProduct() {
        const data = await getSellerProduct()
        dispatch(setSellerProducts(data.product))
        return data.products
    }
    return {handleCreateProduct, handleGetSellerProduct}
}

