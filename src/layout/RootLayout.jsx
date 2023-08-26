import { Outlet } from "react-router-dom";
import FooterBar from "./FooterBar";
import HeaderBar from "./HeaderBar";

function RootLayout() {
  return (
    <>
      <HeaderBar />
      <main className="min-h-[calc(100vh_-_474px)]">
        <Outlet />
      </main>
      <FooterBar />
    </>
  );
}

export default RootLayout;
