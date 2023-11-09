import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <main className="w-full pt-[15vh] gap-2">
      <div className="flex">
        <div className="text-[25px] md:text-[35px] font-bold italic">
          Track, Save, Thrive: Your Price, Your Power
        </div>
        <img
          src={"https://voxyard.com/assets/img/content/coding.gif"}
          width={250}
          className="rounded-full"
        />
      </div>

      <button
        className="px-4 py-2 text-lg border-[1px] border-[#d1d4d8] whitespace-nowrap mt-6"
        onClick={() => navigate("/categories")}
      >
        Categories
      </button>
    </main>
  );
};

export default LandingPage;
