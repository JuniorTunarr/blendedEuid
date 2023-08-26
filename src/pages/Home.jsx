import HomeContents from "../components/Home/HomeContents";
import HomeHeading from "../components/Home/HomeHeading";

function Home() {
  return (
    <div
      id="home"
      className="tracking-[-0.02em] select-none block box-border min-h-[54vh]"
    >
      <HomeHeading />
      <HomeContents />
    </div>
  );
}

export default Home;
