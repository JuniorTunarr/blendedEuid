import GlobalNavigationBar from "@/components/Header/GlobalNavigationBar";
import HeaderHeading from "@/components/Header/HeaderHeading";
import { useState, useEffect } from "react";
import UserSection from "@/components/Header/UserSection";
function HeaderBar() {
  const [isFixed, setIsFixed] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 65) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full h-[6.5rem]${
        isFixed ? " fixed top-0 left-0 z-[50]" : " relative"
      }`}
      role="banner"
    >
      <div className="headerWrapper flex justify-between max-w-[73.75rem] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -my-1 items-center ">
        <HeaderHeading />
        <GlobalNavigationBar />
        <UserSection />
      </div>
    </header>
  );
}

export default HeaderBar;
