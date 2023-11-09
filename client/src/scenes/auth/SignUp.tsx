import { useSignUpMutation } from "@/state/api/authApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [signUp] = useSignUpMutation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errortext, setErrortext] = useState(false);

  const isValidEmail = (email: string) => {
    return /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g.test(
      email
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setErrortext(true);
      return;
    }
    setErrortext(false);
    signUp({
      username,
      email,
      password,
    });
    navigate("/categories");
  };

  return (
    <section className="text-[#b3aeae]">
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
          {errortext ? (
            <label>Enter a valid emil address</label>
          ) : (
            <label>Enter Email</label>
          )}

          <input
            type="email"
            value={email}
            required
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className={`bg-[#0d1727] focus:outline-none w-full py-2 px-1 mt-1 ${
              errortext ? "border-red-500" : "border-[#6D6866] "
            }`}
          />
        </div>
        <div>
          <label>Enter password</label>
          <input
            type="password"
            value={password}
            required
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="border-[1px] border-green-500 w-full py-2">
          Sign Up
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

export default SignUp;
