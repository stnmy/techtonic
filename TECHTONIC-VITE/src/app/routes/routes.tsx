import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ProductBrowser from "../../features/productBrowser/ProductBrowser";
import ProductDetails from "../../features/productBrowser/ProductDetails";
import OfferPage from "../../features/offer/OfferPage";
import ServerError from "../error/ServerError";
import NotFound from "../error/NotFound";
import CartPage from "../../features/cart/cartPage";
import Checkout from "../../features/cart/checkout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/ProductBrowser", element: <ProductBrowser /> },
      { path: "/ProductBrowser/:id", element: <ProductDetails /> },
      { path: "/offers", element: <OfferPage /> },
      { path: "/server-error", element: <ServerError /> },
      { path: "/not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <Checkout /> },
    ],
  },
]);
