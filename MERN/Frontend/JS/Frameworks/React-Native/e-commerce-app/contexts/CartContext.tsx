import { ProductType, getProduct } from "../services/products.service";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

const CartContext = createContext<{
  items: CartType[];
  setItems: Dispatch<SetStateAction<CartType[]>>;
  handleAddToCart: (id: number) => void;
  getItemsCount: () => number;
  getTotalPrice: () => number;
}>({
  items: [],
  setItems: () => {},
  handleAddToCart: () => {},
  getItemsCount: () => 0,
  getTotalPrice: () => 0,
});

export const useCart = () => {
  return useContext(CartContext);
};

type CartType = {
  id: number;
  qty: number;
  product: ProductType;
  totalPrice: number;
};

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartType[]>([]);

  const handleAddToCart = (id: number): void => {
    const product = getProduct(id) as ProductType;

    setItems((prevItems) => {
      const item = prevItems.find((item) => item.id == id);

      if (!item) {
        return [
          ...prevItems,
          {
            id,
            qty: 1,
            product,
            totalPrice: product?.price,
          },
        ];
      } else {
        return prevItems.map((item) => {
          if (item.id == id) {
            item.qty++;
            item.totalPrice += product.price;
          }

          return item;
        });
      }
    });
  };

  const getItemsCount = (): number => {
    return items.reduce((sum, item) => sum + item.qty, 0);
  };

  const getTotalPrice = (): number => {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  return (
    <CartContext.Provider
      value={{ items, setItems, handleAddToCart, getItemsCount, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
