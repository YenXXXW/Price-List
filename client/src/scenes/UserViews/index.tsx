import Navbar from "@/scenes/navabar/index";
import { Outlet } from "react-router-dom";

const LayOut = () => {
  return (
    <section className="h-full grid grid-rows-layout">
      <header className="">
        <Navbar />
      </header>
      <main className="">
        <Outlet />
      </main>
    </section>
  );
};

export default LayOut;
