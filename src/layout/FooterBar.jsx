import FooterAbout from "@/components/Footer/FooterAbout";
import FooterCopyright from "@/components/Footer/FooterCopyright";
import FooterIllust from "@/components/Footer/FooterIllust";
import FooterInfo from "@/components/Footer/FooterInfo";

function FooterBar() {
  return (
    <footer className="relative w-full h-full">
      <div className="footerWrapper p-5 grid place-content-start max-w-[73.75rem] absolute bottom-5 left-1/2 -translate-x-1/2">
        <FooterAbout />
        <FooterInfo />
        <FooterCopyright />
        <FooterIllust />
      </div>
    </footer>
  );
}

export default FooterBar;
