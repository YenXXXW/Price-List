import { useGetAuthUsersQuery } from "@/state/api/authApi";
import { useAddCategoryMutation } from "@/state/api/categoryApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UnauthedUserView from "../UserViews/UnauthedUserView";

const AddCategory = () => {
  const { isError, error } = useGetAuthUsersQuery();

  const [categoryName, setCategoryName] = useState<string>("");
  const [addCategory] = useAddCategoryMutation();

  const navigate = useNavigate();

  const navigateBack = () => {
    navigate("/categories");
  };

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault;
    addCategory(categoryName);
    navigateBack();
  };

  if (isError) {
    if ("status" in error && error?.status === 401) {
      return <UnauthedUserView />;
    } else
      return <div className="font-bold text-lg">Unknown error occurred</div>;
  }

  return (
    <section className="h-full" onSubmit={(e) => handleSubmit(e)}>
      <form className="flex flex-col gap-2 text-[#b3aeae]">
        <label className="text-lg">Enter the category name</label>
        <input
          type="text"
          value={categoryName}
          required
          placeholder="Category Name"
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button className="mt-6 p-2 w-full rounded-sm border-blue-600 border-[1px] text-center">
          Add
        </button>
      </form>
      <button
        onClick={() => navigate(`/categories`)}
        className="mt-6 p-2 w-full rounded-sm border-red-600 border-[1px] text-center"
      >
        Cancel
      </button>
    </section>
  );
};

export default AddCategory;
