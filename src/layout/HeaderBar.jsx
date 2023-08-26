import GlobalNavigationBar from "@/components/Header/GlobalNavigationBar";
import HeaderHeading from "@/components/Header/HeaderHeading";
import { useState, useEffect } from "react";

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
      <div className="headerWrapper flex justify-between max-w-[73.75rem] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -my-1 items-center">
        <HeaderHeading />
        <GlobalNavigationBar />
        <button className="flex items-center h-[42px] shadow-[rgba(0,0,0,0.18)_0px_1px_2px] bg-[white] cursor-pointer pl-4 pr-1.5 py-0 rounded-[21px] border-0">
          <svg width={12} height={8} viewBox="0 0 12 8" fill="#222">
            <path
              d="M12 1.6H0V0h12v1.6zm0 1.6H0v1.6h12V3.2zm0 3.2H0V8h12V6.4z"
              fill="#222"
            />
          </svg>
          <img
            src="/assets/unloginUser.svg"
            className="ml-2 w-[30px] h-[30px] border rounded-full object-cover"
            alt="사용자 프로필"
          ></img>
        </button>
      </div>
    </header>
  );
}

export default HeaderBar;
