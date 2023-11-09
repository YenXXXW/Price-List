import { useNavigate } from "react-router-dom";

const UnauthedUserView = () => {
  const navigate = useNavigate();
  return (
    <section>
      <p className="font-bold ">Please Login In or SignUp to use the service</p>
      <div className="flex flex-col gap-1 w-[100px]">
        {/* <button className="authButton" onClick={() => navigate("/login")}>
          Log In
        </button>
        <button className="authButton" onClick={() => navigate("/signup")}>
          Sign Up
        </button> */}
      </div>
    </section>
  );
};

export default UnauthedUserView;
