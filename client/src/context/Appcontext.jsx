import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // don't forget this import

export const Appcontext = createContext();

export const AppcontextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(true);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setshowUserLogin] = useState(false);


    const value = { user,navigate, setUser, setIsSeller, isSeller,showUserLogin,setshowUserLogin };

    return (
        <Appcontext.Provider value={value}>
            {children}
        </Appcontext.Provider>
    );
};

export const useAppcontext = () => {
    return useContext(Appcontext);
};
