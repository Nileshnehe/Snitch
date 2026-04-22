import axios from "axios";

const authApiInstance = axios.create({
    baseURL: "/api/auth",
    withCredentials: true,
})


export async function register({ email, contactNumber, password, fullName, isSeller }) {

    console.log("Sending:", { email, contactNumber, password, fullName, isSeller }) 
    

    const response = await authApiInstance.post("/register", {
        email,
        contactNumber,
        password,
        fullName,
        isSeller
    })

    return response.data
}

export async function login({ email, password }) {
    const response = await authApiInstance.post("/login", {
        email, password
    })

    return response.data
}

export async function getMe() {
    const response = await authApiInstance.get("/me")

    return response.data
}

