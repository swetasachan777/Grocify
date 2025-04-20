import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const Appcontext = createContext();

export const AppcontextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();

  const [user, setUser] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setshowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  const addToCart = (itemID) => {
    const cartData = { ...cartItems };
    if (cartData[itemID]) {
      cartData[itemID] += 1;
    } else {
      cartData[itemID] = 1;
    }
    setCartItems(cartData);
    toast.success("Added to cart");
  };

  const updateCartItem = (itemID, quantity) => {
    const cartData = { ...cartItems };
    cartData[itemID] = quantity;
    setCartItems(cartData);
    toast.success("Cart updated");
  };

  const RemoveProductCart = (itemID) => {
    const cartData = { ...cartItems };
    if (cartData[itemID]) {
      cartData[itemID] -= 1;
      if (cartData[itemID] === 0) {
        delete cartData[itemID];
      }
      setCartItems(cartData);
      toast.success("Removed from cart");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    user,
    navigate,
    setUser,
    setIsSeller,
    isSeller,
    showUserLogin,
    setshowUserLogin,
    products,
    currency,
    addToCart,
    updateCartItem,
    RemoveProductCart,
    cartItems,
  };

  return (
    <Appcontext.Provider value={value}>
      {children}
    </Appcontext.Provider>
  );
};

export const useAppcontext = () => useContext(Appcontext);
