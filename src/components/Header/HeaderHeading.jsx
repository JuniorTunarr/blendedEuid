import { Link } from "react-router-dom";
import Homelogo from "/assets/homeLogo.svg";
function HeaderHeading() {
  return (
    <h1 className="header__title">
      <Link to="/" className="block p-2.5">
        <img
          src={Homelogo}
          alt="이듬(E.UID) 블렌디드 러닝"
          width={82}
          height={30}
        />
      </Link>
    </h1>
  );
}

export default HeaderHeading;
