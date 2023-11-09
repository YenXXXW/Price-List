import { useLogInMutation } from "@/state/api/authApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login] = useLogInMutation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    login({
      username,
      password,
    });
    navigate("/categories");
  };

  return (
    <section className="text-[#b3aeae] px-10 h-full">
      <form
        className="grid grid-flow-row gap-5"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div>
          <label>Enter user name</label>
          <input
            type="text"
            value={username}
            required
            placeholder="User name"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Enter password</label>
          <input
            type="text"
            value={password}
            required
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="border-[1px] border-green-500 w-full py-2">
          Login
        </button>
      </form>
      <button
        onClick={() => navigate(`/`)}
        className="mt-6 p-2 w-full rounded-sm border-red-600 border-[1px] text-center"
      >
        Cancel
      </button>
    </section>
  );
};

export default Login;
