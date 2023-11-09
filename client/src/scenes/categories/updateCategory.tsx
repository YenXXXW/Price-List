import { useGetAuthUsersQuery } from "@/state/api/authApi";
import { useUpdateCategoryMutation } from "@/state/api/categoryApi";
import { useAppSelector } from "@/state/hook";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UnauthedUserView from "../UserViews/UnauthedUserView";

const UpdateCategory = () => {
  const { isError, error } = useGetAuthUsersQuery();

  const categoryId = useAppSelector((state) => state.category.UpdateCategoryId);
  console.log(categoryId);
  const [updateCategory] = useUpdateCategoryMutation();
  const navigate = useNavigate();

  const [category, setCategory] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCategory({
      name: category,
      categoryId,
    });
    navigate("/categories");
  };

  if (isError) {
    if ("status" in error && error?.status === 401) {
      return <UnauthedUserView />;
    } else
      return <div className="font-bold text-lg">Unknown error occurred</div>;
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label>Enter Category Name</label>
      <br />
      <input
        type="text"
        placeholder="category name"
        required
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="focus:outline-none bg-[#6D6866] w-[300px] px-2 rounded-md"
      />
      <br />
      <button>Update</button>
    </form>
  );
};

export default UpdateCategory;
