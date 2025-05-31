import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";
export const Appcontext = createContext();

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
export const AppcontextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();

  const [user, setUser] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setshowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});


  // Fetch Seller Status
const fetchSeller = async () => {
  try {
    const { data } = await axios.get('/api/seller/is-auth');
    console.log('Seller auth response:', data);
    if (data.success) {
      setIsSeller(true);
    } else {
      setIsSeller(false);
    }
  } catch (error) {
    console.error('Error fetching seller auth:', error);
    setIsSeller(false);
  }
};


  const fetchProducts = async () => {
     try {
    const { data } = await axios.get('/api/product/list');
    
    if (data.success) {
      setProducts(data.products)
    } else {
      toast.error(data.message)
    }
  } catch (error) {
     toast.error(error.message)
  }
  };


  
  const fetchUser = async () => {
  try {
    const { data } = await axios.get('/api/user/is-auth', { withCredentials: true });

    if (data.success) {
      setUser(data.user);
      setCartItems(data.user.cartItems);
    } else {
      setUser(null); // 🔁 explicitly set null if not authenticated
    }
  } catch (error) {
    setUser(null); // 🔁 very important
    console.error("Auth check failed:", error.message);
  }
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

  const removeProductCart = (itemID) => {
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

  const getCartCount = () => {
    let totalCount = 0;
    for(const item in cartItems){
        totalCount += cartItems[item];
    }
    return totalCount;
  }

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems){
        let itemInfo = products.find((product)=> product._id === items);
        if(cartItems[items] > 0){
            totalAmount += itemInfo.offerPrice * cartItems[items]
        }
    }
    return Math.floor(totalAmount * 100) / 100;
  }

  useEffect(() => {
    fetchUser()
    fetchSeller()
    fetchProducts();
  }, []);

  // Update Database Cart Items
 useEffect(() => {
    const updateCart = async () => {
        try {
            const { data } = await axios.post('/api/cart/update', {
                userId: user._id,
                cartItems
            });
            if (!data.success) {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (user) {
        updateCart();
    }
}, [cartItems, user]);


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
    removeProductCart,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartAmount,
    getCartCount,
    axios,
    fetchProducts
  };

  return (
    <Appcontext.Provider value={value}>
      {children}
    </Appcontext.Provider>
  );
};

export const useAppcontext = () => useContext(Appcontext);
