import axios from "axios"


const productApiInstance = axios.create({
    baseURL: "/api/products",
    withCredentials: true
})


export async function createProduct(formdata){
    const response = await productApiInstance("/", formdata)

    return response.data
}

export async function getSellerProduct(){
    const response = await productApiInstance("/seller")

    return response.data 
}