import axios from "axios"
import { data } from "react-router"


const productApiInstance = axios.create({
    baseURL: "/api/products",
    withCredentials: true
})


export async function createProduct(formdata) {
    const response = await productApiInstance.post("/", formdata)

    return response.data
}

export async function getSellerProduct() {
    const response = await productApiInstance.get("/seller")

    return response.data
}

export async function getAllProducts() {
    const response = await productApiInstance.get("/")

    return response.data
}

export async function getProductById(productId) {
    const response = await productApiInstance.get(`/detail/${productId}`)
    console.log(data)
    return response.data
}