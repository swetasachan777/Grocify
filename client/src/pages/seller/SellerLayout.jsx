import { NavLink, Outlet, Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppcontext } from "../../context/Appcontext";

const SellerLayout = () => {
  const { setIsSeller } = useAppcontext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    setIsSeller(false);
  };

  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="md:w-64 w-16 border-r h-full text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 transition-all ${
                  isActive
                    ? "border-r-4 md:border-r-[6px] bg-primary/10 border-[#4fbf8b] text-[#4fbf8b]"
                    : "hover:bg-gray-100/90 border-white text-gray-700"
                }`
              }
            >
              <img src={item.icon} alt="" className="w-7 h-7" />
              <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>
          ))}
        </div>

        {/* Right side content */}
        <div className="flex-1 flex flex-col h-full overflow-y-auto">
          {/* Top Navbar */}
          <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
            <Link to="/">
              <img className="h-20 md:h-20 cursor-pointer" src={assets.logo} alt="logo" />
            </Link>
            <div className="flex items-center gap-5 text-gray-500">
              <p>Hi! Admin</p>
              <button onClick={logout} className="border rounded-full text-sm px-4 py-1">Logout</button>
            </div>
          </div>

          {/* Dynamic Page Content */}
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerLayout;
