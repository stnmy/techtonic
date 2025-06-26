import { createBrowserRouter, Navigate } from "react-router-dom";

// Main layout for the shop site
import App from "../layout/App";

// Public pages
import HomePage from "../../features/home/HomePage";
import ProductBrowser from "../../features/productBrowser/ProductBrowser";
import ProductDetails from "../../features/productBrowser/ProductDetailsPage/ProductDetails";
import OfferPage from "../../features/offer/OfferPage";
import ServerError from "../error/ServerError";
import NotFound from "../error/NotFound";
import CartPage from "../../features/cart/cartPage";
import Checkout from "../../features/cart/checkout";
import Search from "../../features/search/Search";
import LoginForm from "../../features/account/LoginForm";
import RegisterForm from "../../features/account/RegisterForm";
import Account from "../../features/account/Account";

// Auth-guarded user pages
import RequireAuth from "./RequireAuth";
import RequireModeratorAuth from "./RequireModeratorAuth";
import RequireAdminAuth from "./RequireAdminAuth";

import Orders from "../../features/order/Orders";
import OrderDetails from "../../features/order/OrderDetails";

// Admin dashboard layout and pages
import DashboardLayout from "../../features/management/DashboardLayout";
import DashboardStatistics from "../../features/management/DashboardStatistics";
import Inventory from "../../features/management/Inventory";
import CreateProduct from "../../features/management/CreateProduct";
import EditProduct from "../../features/management/EditProduct";
import AdminOrders from "../../features/management/AdminOrders";
import UnansweredQuestions from "../../features/management/UnansweredQuestions";
import AdminProductReviews from "../../features/management/AdminProductReviews";
import CriteriarManagement from "../../features/management/CriteriaManagement";
import AdminUserRoleManagement from "../../features/management/AdminUserRoleManagement";

export const router = createBrowserRouter([
  // Public and shop-related routes (with main layout)
  {
    path: "/",
    element: <App />,
    children: [
      // 🔒 Protected user routes
      {
        element: <RequireAuth />,
        children: [
          { path: "checkout", element: <Checkout /> },
          { path: "account", element: <Account /> },
          { path: "orders", element: <Orders /> },
          { path: "orders/:orderNumber", element: <OrderDetails /> },
        ],
      },

      // 🌐 Public routes
      { path: "", element: <HomePage /> },
      { path: "ProductBrowser", element: <ProductBrowser /> },
      { path: "ProductBrowser/:id", element: <ProductDetails /> },
      { path: "offers", element: <OfferPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "search/:search", element: <Search /> },
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },

      // ⚠️ Error pages
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },

  {
    path: "/admin",
    element: <RequireModeratorAuth />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "products", element: <Inventory /> },
          { path: "products/create", element: <CreateProduct /> },
          { path: "products/edit/:id", element: <EditProduct /> },
          { path: "orders", element: <AdminOrders /> },
          { path: "unansweredQuestions", element: <UnansweredQuestions /> },
          { path: "reviews", element: <AdminProductReviews /> },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <RequireAdminAuth />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "", element: <DashboardStatistics /> },
          { path: "criteria", element: <CriteriarManagement /> },
          { path: "roleManagement", element: <AdminUserRoleManagement /> },
        ],
      },
    ],
  },
]);
