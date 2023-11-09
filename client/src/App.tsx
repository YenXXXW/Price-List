import Categories from "@/scenes/categories";
import { Route, Routes } from "react-router-dom";
import LayOut from "./scenes/UserViews";
import LandingPage from "./scenes/UserViews/LandingPage";
import NotFound from "./scenes/UserViews/NotFound";
import Login from "./scenes/auth/Login";
import ViewProucts from "./scenes/products";
import AddProduct from "./scenes/products/addProduct";
import AddCategory from "./scenes/categories/AddCategory";
import UpdateCategory from "./scenes/categories/updateCategory";
import UpdateProduct from "./scenes/products/UpdateProduct";
import SignUp from "./scenes/auth/SignUp";

function App() {
  return (
    <section className="app">
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="categories">
            <Route index element={<Categories />} />
            <Route path="addCategory" element={<AddCategory />} />
            <Route path="updateCategory" element={<UpdateCategory />} />
          </Route>
          <Route path={`/products/:categoryId`} element={<ViewProucts />} />
          <Route path={"products/addProduct"} element={<AddProduct />} />
          <Route path={"products/updateProduct"} element={<UpdateProduct />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </section>
  );
}

export default App;
