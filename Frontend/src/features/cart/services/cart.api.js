import axios from "axios";


const cartApiInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/cart`,
    withCredentials: true,
})

export const addItem = async ({ productId, variantId }) => {
    let url = `/add/${productId}`
    if (variantId) {
        url += `/${variantId}`
    }
    const response = await cartApiInstance.post(url, {
        quantity: 1
    })
    return response.data
}

export const getCart = async () => {
    const response = await cartApiInstance.get("/", { withCredentials: true })
    return response.data
}

export const incrementCartItemApi = async ({ productId, variantId }) => {
    let url = `/quantity/increment/${productId}`

    if (variantId) {
        url += `/${variantId}`
    }
    console.log("URL:", url)
    const response = await cartApiInstance.patch(url)
    return response.data
    
}


