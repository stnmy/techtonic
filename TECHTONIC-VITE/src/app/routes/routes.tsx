import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ProductBrowser from "../../features/productBrowser/ProductBrowser";
import ProductDetails from "../../features/productBrowser/ProductDetails";
import OfferPage from "../../features/offer/OfferPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children:[
            {path: '', element: <HomePage/>},
            {path: '/ProductBrowser', element: <ProductBrowser/>},
            {path: '/ProductBrowser/:id', element: <ProductDetails/>},
            {path: '/offers', element: <OfferPage/>},
        ]
    }
])