import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
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

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/reset-password" element={<Resetpassword />}></Route>
          <Route path="/forgot-password" element={<Forgotpassword />}></Route>
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="contact" element={<Contact />} />
            <Route path="blog-list" element={<Bloglist />} />
            <Route path="blog" element={<Addblog />} />
            <Route path="blog-category" element={<Addblogcategory />} />
            <Route path="blog-category-list" element={<Blogcategorylist />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="list-color" element={<Colorlist />} />
            <Route path="color" element={<Addcolor />} />
            <Route path="list-category" element={<Categorylist />} />
            <Route path="category" element={<Addcategory />} />
            <Route path="list-brand" element={<Brandlist />} />
            <Route path="brand" element={<Addbrand />} />
            <Route path="list-product" element={<Productlist />} />
            <Route path="product" element={<Addproduct />} />
          </Route>
        </Routes>
        <ToastContainer position="top-right" />
      </Router>
    </>
  );
}

export default App;
