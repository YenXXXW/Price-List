import { useGetAuthUsersQuery } from "@/state/api/authApi";
import { useCreateProductMutation } from "@/state/api/productsApi";
import { useAppSelector } from "@/state/hook";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UnauthedUserView from "../UserViews/UnauthedUserView";

const AddProduct = () => {
  const { isError, error } = useGetAuthUsersQuery();
  const [addProduct] = useCreateProductMutation();
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const categoryId = useAppSelector((state) => state.products.categoryId);
  console.log("category id is" + categoryId);

  const navigate = useNavigate();

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addProduct({
      productName,
      price,
      categoryId,
    });
    navigate(`/products/${categoryId}`);
  };

  if (isError) {
    if ("status" in error && error?.status === 401) {
      return <UnauthedUserView />;
    } else
      return <div className="font-bold text-lg">Unknown error occurred</div>;
  }

  return (
    <article className="w-full px-14">
      <form
        className="w-full"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label className="font-bold">Enter Product Name</label>
        <input
          type="text"
          required
          placeholder="product name"
          value={productName}
          onChange={(e) => {
            handleProductNameChange(e);
          }}
        />
        <label className="font-bold">Enter Product Price</label>
        <input
          type="text"
          placeholder="product price"
          required
          value={price}
          onChange={(e) => {
            handlePriceChange(e);
          }}
        />

        <button className="mt-6 p-2 w-full rounded-sm border-blue-600 border-[1px] text-center">
          Add
        </button>
      </form>
      <button
        onClick={() => navigate(`/products/${categoryId}`)}
        className="mt-6 p-2 w-full rounded-sm border-red-600 border-[1px] text-center"
      >
        Cancel
      </button>
    </article>
  );
};

export default AddProduct;
