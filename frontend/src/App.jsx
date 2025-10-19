import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Myaccount from "./pages/Myaccount";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Announcement from "./components/Announcement";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import Order from "./pages/Order";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const user = useSelector((state) => state.user);

  // Check for logout parameter from admin dashboard
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("logout") === "true") {
      // Clear localStorage
      localStorage.clear();
      // Remove the query parameter and reload
      window.history.replaceState({}, document.title, "/");
      window.location.reload();
    }
  }, []);

  const Layout = () => {
    return (
      <div>
       {/* <Announcement /> */}
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/create-account",
          element: <Register />,
        },
        {
          path: "/myaccount",
          element: user?.currentUser ? <Myaccount /> : <Home />
        },
        {
          path: "/product/:productId",
          element:  <Product />,
        },
        {
          path: "/products",
          element: <ProductList />,
        },
        {
          path: "/products/:searchterm",
          element: <ProductList />,
        },
        {
          path: "/orders",
          element: user?.currentUser ? <Order /> : <Login />
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
