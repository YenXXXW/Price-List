import {
  useDeletecategoryMutation,
  useGetCategoriesQuery,
} from "@/state/api/categoryApi";
import { useNavigate } from "react-router-dom";
import { CategoryResponse } from "@/state/types";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiRightArrow, BiMinusCircle } from "react-icons/bi";
import { RxUpdate, RxCross2 } from "react-icons/rx";
import { updateCategory } from "@/state/services/categoriesSlice";
import { useGetAuthUsersQuery } from "@/state/api/authApi";
import { useAppDispatch } from "@/state/hook";
import UnauthedUserView from "../UserViews/UnauthedUserView";
const Categories = () => {
  const { isError, error } = useGetAuthUsersQuery();

  const { data: categories } = useGetCategoriesQuery(undefined, {
    skip: isError,
  });

  const [deleteCategory] = useDeletecategoryMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [filteredCategories, setFilteredCategories] = useState<
    CategoryResponse[] | null
  >(null);
  const [searchValue, setSearchValue] = useState("");
  const [edit, setEdit] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const filtered = categories?.filter((category) =>
      category.name.includes(e.target.value)
    );
    if (filtered) setFilteredCategories(filtered);
    console.log(filtered);
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/products/${categoryId}`);
  };

  const handleDeleteCategory = (categoryId: string) => {
    deleteCategory(categoryId);
  };

  const handleUpdateCategory = (categoryId: string) => {
    dispatch(updateCategory(categoryId));
    navigate("updateCategory");
  };

  if (isError) {
    if ("status" in error && error?.status === 401) {
      return <UnauthedUserView />;
    } else
      return <div className="font-bold text-lg">Unknown error occurred</div>;
  }

  if (categories?.length === 0) {
    return <p>No categories added.</p>;
  }

  return (
    <section className=" relative w-full h-full flex flex-col gap-4">
      <div className="flex justify-between">
        <p className="font-bold text-3xl">Categories</p>
        <div className="text-blue-200 font-bold flex gap-4">
          <div className="cursor-pointer" onClick={() => setEdit(!edit)}>
            {edit ? (
              <div>
                <RxCross2 size={24} />
              </div>
            ) : (
              <p>Edit</p>
            )}
          </div>
          <div
            className="cursor-pointer"
            onClick={() => navigate("addCategory")}
          >
            <AiOutlinePlus size={24} />
          </div>
        </div>
      </div>
      <input
        type="text"
        value={searchValue}
        placeholder="search"
        onChange={(e) => handleChange(e)}
      />
      <main>
        {filteredCategories
          ? filteredCategories?.map((category, i) => (
              <div
                key={i}
                className="border-b-[1px] border-[#6D6866] py-1 flex gap-2 items-center"
              >
                <div className={edit ? "flex gap-2" : "hidden"}>
                  <RxUpdate
                    size={22}
                    className="cursor-pointer text-blue-600"
                    onClick={() => handleUpdateCategory(category._id)}
                  />
                  <BiMinusCircle
                    size={22}
                    className="cursor-pointer text-red-600"
                    onClick={() => handleDeleteCategory(category._id)}
                  />
                </div>

                <div
                  className="flex items-center w-full justify-between"
                  onClick={() => handleCategoryClick(category._id)}
                >
                  <p className="text-xl">{category.name}</p>
                  <BiRightArrow />
                </div>
              </div>
            ))
          : categories?.map((category, i) => (
              <div
                key={i}
                className="border-b-[1px] border-[#6D6866] py-1 flex gap-2 items-center"
              >
                <div className={edit ? "flex gap-2" : "hidden"}>
                  <RxUpdate
                    size={22}
                    className="cursor-pinter text-blue-600"
                    onClick={() => handleUpdateCategory(category._id)}
                  />
                  <BiMinusCircle
                    size={22}
                    className="cursor-pointer text-red-600"
                    onClick={() => handleDeleteCategory(category._id)}
                  />
                </div>

                <div
                  className="flex items-center w-full justify-between"
                  onClick={() => handleCategoryClick(category._id)}
                >
                  <p className="text-xl">{category.name}</p>
                  <BiRightArrow />
                </div>
              </div>
            ))}
      </main>
    </section>
  );
};

export default Categories;
