import { NavLink, useNavigate, useParams } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useGetAuthUsersQuery } from "@/state/api/authApi";
import { useLogOutMutation } from "@/state/api/authApi";

const Navbar = () => {
  const { data: user, isError } = useGetAuthUsersQuery();

  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [logout] = useLogOutMutation();
  const handleClick = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="w-full flex items-center justify-between font-bold relative">
      <img src={logo} className="w-[120px] sm:w-[150px]" />
      <div className="flex gap-4 items-center">
        {categoryId && <NavLink to="/categories">Categories</NavLink>}
        {!isError ? (
          <div className="flex items-center justify-center gap-3">
            <div className="px-3 py-1 rounded-full border-[#B4924F] border-[1px]">
              {user?.username.charAt(0).toUpperCase()}
            </div>

            <div
              className="max-w-min ml-auto whitespace-nowrap cursor-pointer"
              onClick={handleClick}
            >
              Log out
            </div>
          </div>
        ) : (
          <div className="flex gap-3">
            <NavLink to="signup">
              <div className="max-w-min ml-auto whitespace-nowrap">Sign Up</div>
            </NavLink>
            <NavLink to="login">
              <div className="max-w-min ml-auto">LogIn</div>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
