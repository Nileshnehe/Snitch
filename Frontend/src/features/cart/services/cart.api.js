import axios from "axios";


const cartApiInstance = axios.create({
    baseURL: "/api/cart",
    withCredentials: true
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