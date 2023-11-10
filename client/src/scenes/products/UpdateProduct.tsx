import { useUpdateProductMutation } from "@/state/api/productsApi";
import { useAppSelector } from "@/state/hook";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UnauthedUserView from "../UserViews/UnauthedUserView";
import { useGetAuthUsersQuery } from "@/state/api/authApi";

const UpdateProduct = () => {
  const { isError, error } = useGetAuthUsersQuery();

  const categoryId = useAppSelector((state) => state.products.categoryId);
  const productId = useAppSelector((state) => state.products.productId);

  const navigate = useNavigate();
  const [updateProduct] = useUpdateProductMutation();

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProduct({
      productId,
      categoryId,
      productName,
      price,
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
    <section className="px-14">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Enter Product Name</label>
        <br />
        <input
          type="text"
          placeholder="product name"
          required
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="focus:outline-none bg-[#6D6866] px-2 rounded-md"
        />
        <br />
        <label>Enter Product Price</label>
        <br />
        <input
          type="text"
          placeholder="price"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="focus:outline-none bg-[#6D6866] px-2 rounded-md"
        />
        <br />
        <button className="mt-6 p-2 w-full rounded-sm border-green-600 border-[1px] text-center">
          Update
        </button>
      </form>
      <button
        onClick={() => navigate(`/products/${categoryId}`)}
        className="mt-6 p-2 w-full rounded-sm border-red-600 border-[1px] text-center"
      >
        Cancel
      </button>
    </section>
  );
};

export default UpdateProduct;
