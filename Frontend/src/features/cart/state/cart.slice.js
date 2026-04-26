import { createSlice } from "@reduxjs/toolkit"


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload
        },
        addItem: (state, action) => {
            state.items.push(action.payload)
        },
        incrementCartItem: (state, action) => {
            const { productId, variantId } = action.payload

            state.items = state.items.map(item => {
                const productMatch = item.product._id === productId;
                const variantMatch = variantId
                    ? item.variant?._id === variantId  
                    : !item.variant;                    

                if (productMatch && variantMatch) {
                    return { ...item, quantity: item.quantity + 1 }
                }
                return item;
            })
        }
    }
})

export const { setItems, addItem, incrementCartItem } = cartSlice.actions
export default cartSlice.reducer