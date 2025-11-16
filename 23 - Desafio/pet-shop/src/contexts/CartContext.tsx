import { createContext, useState, type ReactNode } from "react";
import type { Product } from "../pages/home";

interface CartContextData {
  cart: Cart[];
  addItemCart: (newItem: Product) => void;
}

interface Cart {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
  amount: number;
  total: number;
}

interface CartProvider {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

const CartProvider = ({ children }: CartProvider) => {
  const [cart, setCart] = useState<Cart[]>([]);

  function addItemCart(newItem: Product) {
    const indexItem = cart.findIndex((item) => item.id === newItem.id);

    if (indexItem !== -1) {
      let cartList = cart;
      cartList[indexItem].amount++;
      cartList[indexItem].total =
        cartList[indexItem].amount * cartList[indexItem].price;

      setCart(cartList);
      return;
    }
    let data = {
      ...newItem,
      amount: 1,
      total: newItem.price,
    };

    setCart((products) => [...products, data]);
  }

  return (
    <CartContext.Provider value={{ cart, addItemCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
