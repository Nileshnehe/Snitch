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
    try {
      const data = await addItem({ productId, variantId });
      dispatch(addItemToCart(data.item || { productId, variantId, quantity: 1 }));
      return data;
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  }

  async function handleGetCart() {
    try {
      const data = await getCart();
      dispatch(setItems(data.cart.items));
    } catch (error) {
      console.error("Failed to fetch cart:", error)
    }
  }

  async function handleIncrementCartItem({ productId, variantId }) {

    try {
      await incrementCartItemApi({ productId, variantId });
      dispatch(incrementCartItem({ productId, variantId }));
    } catch (error) {
      console.error("Failed to increment cart item:", error)
    }
  }

  return {
    handleAddItem,
    handleGetCart,
    handleIncrementCartItem
  };
};