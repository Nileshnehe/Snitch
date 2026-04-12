import axios from "axios"

const authApiInstance = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,
})


export async function register({ email, contactNumber, password, fullname, isSeller }) {

    const response = await authApiInstance.post("/register", {
        email,
        contactNumber,
        password,
        fullname,
        isSeller
    })
    return response.data
}