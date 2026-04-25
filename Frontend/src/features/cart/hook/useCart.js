import { addItem, getCart, incrementCartItemApi } from "../services/cart.api";
import {
  setItems,
  addItem as addItemToCart,
  incrementCartItem
} from "../state/cart.slice";
import { useDispatch } from "react-redux";

export const useCart = () => {
  const dispatch = useDispatch();

  async function handleAddItem({ productId, variantId }) {
    const data = await addItem({ productId, variantId });

    
    dispatch(addItemToCart(data.item || { productId, variantId, quantity: 1 }));

    return data;
  }

  async function handleGetCart() {
    const data = await getCart();
    dispatch(setItems(data.cart.items));
  }

  async function handleIncrementCartItem({ productId, variantId }) {
    await incrementCartItemApi({ productId, variantId });

    dispatch(incrementCartItem({ productId, variantId }));
  }

  return {
    handleAddItem,
    handleGetCart,
    handleIncrementCartItem
  };
};