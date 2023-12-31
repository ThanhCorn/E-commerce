import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Bloglist from "./pages/Bloglist";
import Blogcategorylist from "./pages/Blogcategorylist";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Colorlist from "./pages/Colorlist";
import Categorylist from "./pages/Categorylist";
import Brandlist from "./pages/Brandlist";
import Productlist from "./pages/Productlist";
import Addblog from "./pages/Addblog";
import Addblogcategory from "./pages/Addblogcategory";
import Addcolor from "./pages/Addcolor";
import Addcategory from "./pages/Addcategory";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Addcoupon from "./pages/Addcoupon";
import Couponlist from "./pages/Couponlist";
import ViewContact from "./pages/ViewContact";
import ViewOrder from "./pages/ViewOrder";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="contact" element={<Contact />} />
            <Route path="contact/:id" element={<ViewContact />} />
            <Route path="blog-list" element={<Bloglist />} />
            <Route path="blog" element={<Addblog />} />
            <Route path="blog/:id" element={<Addblog />} />
            <Route path="blog-category" element={<Addblogcategory />} />
            <Route path="blog-category/:id" element={<Addblogcategory />} />
            <Route path="blog-category-list" element={<Blogcategorylist />} />
            <Route path="orders" element={<Orders />} />
            <Route path="order/:id" element={<ViewOrder />} />
            <Route path="customers" element={<Customers />} />
            <Route path="list-color" element={<Colorlist />} />
            <Route path="color" element={<Addcolor />} />
            <Route path="color/:id" element={<Addcolor />} />
            <Route path="list-category" element={<Categorylist />} />
            <Route path="category" element={<Addcategory />} />
            <Route path="category/:id" element={<Addcategory />} />
            <Route path="list-brand" element={<Brandlist />} />
            <Route path="brand" element={<Addbrand />} />
            <Route path="brand/:id" element={<Addbrand />} />
            <Route path="list-product" element={<Productlist />} />
            <Route path="product" element={<Addproduct />} />
            <Route path="product/:id" element={<Addproduct />} />
            <Route path="coupon" element={<Addcoupon />} />
            <Route path="coupon/:id" element={<Addcoupon />} />
            <Route path="list-coupon" element={<Couponlist />} />
          </Route>
        </Routes>
        <ToastContainer position="top-right" />
      </Router>
    </>
  );
}

export default App;
