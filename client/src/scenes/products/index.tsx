import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/state/api/productsApi";
import { useAppDispatch } from "@/state/hook";
import {
  categoryIdforProductSelected,
  updateOrDeleteProduct,
} from "@/state/services/productsSlice";
import { ProductsResponse } from "@/state/types";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiMinusCircle } from "react-icons/bi";
import { RxUpdate, RxCross2 } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import { aseertIsDefined } from "@/utils/assertIsDefined";
import { useGetAuthUsersQuery } from "@/state/api/authApi";
import UnauthedUserView from "../UserViews/UnauthedUserView";

const ViewProucts = () => {
  const { categoryId } = useParams();
  aseertIsDefined(categoryId);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isError, error } = useGetAuthUsersQuery();
  const { data: products } = useGetProductsQuery(categoryId, {
    skip: isError,
  });
  const [deleteProduct] = useDeleteProductMutation();

  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProdcuts] = useState<
    ProductsResponse[] | null
  >(null);
  const [edit, setEdit] = useState(false);

  const handleClick = () => {
    dispatch(categoryIdforProductSelected(categoryId));
    navigate("/products/addProduct");
  };

  const handleUpdateProduct = (productId: string) => {
    dispatch(categoryIdforProductSelected(categoryId));
    dispatch(updateOrDeleteProduct(productId));
    navigate("/products/updateProduct");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const filtered = products?.filter((product) =>
      product.productName.includes(e.target.value)
    );
    if (filtered) setFilteredProdcuts(filtered);
    console.log(filtered);
  };

  const handleDeleteProduct = (productId: string) => {
    deleteProduct(productId);
  };

  if (isError) {
    if ("status" in error && error?.status === 401) {
      return <UnauthedUserView />;
    } else
      return <div className="font-bold text-lg">Unknown error occurred</div>;
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3>Products</h3>
        <div className="flex gap-2 text-blue-600">
          <div className="cursor-pointer" onClick={() => setEdit(!edit)}>
            {edit ? (
              <div>
                <RxCross2 size={21} />
              </div>
            ) : (
              <p>Edit</p>
            )}
          </div>

          <AiOutlinePlus
            size={24}
            onClick={handleClick}
            className="cursor-pointer"
          />
        </div>
      </div>

      <input
        type="text"
        value={searchValue}
        placeholder="search"
        onChange={(e) => handleChange(e)}
      />
      <div>
        {filteredProducts
          ? filteredProducts?.map((product, i) => (
              <div
                key={i}
                className="flex justify-between text-lg border-b-2 border-b-[#6D6866] gap-2"
              >
                <div className={edit ? "flex gap-2 items-center" : "hidden"}>
                  <RxUpdate
                    size={22}
                    className="cursor-pointer text-blue-600 "
                    onClick={() => handleUpdateProduct(product._id)}
                  />
                  <BiMinusCircle
                    size={22}
                    className="cursor-pointer text-red-600"
                    onClick={() => handleDeleteProduct(product._id)}
                  />
                </div>
                <div className="flex justify-between w-full">
                  <p>{product.productName}</p>
                  <p>{product.price}</p>
                </div>
              </div>
            ))
          : products?.map((product, i) => (
              <div
                key={i}
                className="flex  gap-2 justify-between text-lg border-b-2 border-b-[#6D6866]"
              >
                <div className={edit ? "flex gap-2 items-center" : "hidden"}>
                  <RxUpdate
                    size={22}
                    className="cursor-pointer text-blue-600"
                    onClick={() => handleUpdateProduct(product._id)}
                  />
                  <BiMinusCircle
                    size={22}
                    className="cursor-pointer text-red-600"
                    onClick={() => handleDeleteProduct(product._id)}
                  />
                </div>
                <div className="flex justify-between w-full">
                  <p>{product.productName}</p>
                  <p>{product.price}</p>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};

export default ViewProucts;
