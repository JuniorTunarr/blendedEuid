import { Link } from "react-router-dom";

const GlobalNavigationBar = () => {
  return (
    <nav className="globalNavigationBar fixed">
      <ul className="flex">
        <li className="focus:rounded focus:shadow-md focus:shadow-blue-600 active:text-{#373e6a}">
          <Link to="/about">소개</Link>
        </li>
        <li className="focus:rounded focus:shadow-md focus:shadow-blue-600 active:text-{#373e6a}">
          <Link to="/course">과정 &gt;</Link>
        </li>
        <li className="focus:rounded focus:shadow-md focus:shadow-blue-600">
          <Link to="/schedule" className="active:text-{#373e6a}">
            연간 일정
          </Link>
        </li>
        <li className="focus:rounded focus:shadow-md focus:shadow-blue-600 active:text-{#373e6a}">
          <Link to="/guide">학습 안내</Link>
        </li>
        <li className="focus:rounded focus:shadow-md focus:shadow-blue-600 active:text-{#373e6a}">
          <Link to="/faq">FAQ</Link>
        </li>
        <li className="focus:rounded focus:shadow-md focus:shadow-blue-600 active:text-{#373e6a}">
          <Link to="/story">브랜드 이야기</Link>
        </li>
        <li className="focus:rounded focus:shadow-md focus:shadow-blue-600 active:text-{#373e6a}">
          <Link to="/privacypolicy">정책 /환불 규정</Link>
        </li>
        <li className="focus:rounded focus:shadow-md focus:shadow-blue-600 active:text-{#373e6a}">
          <Link to="/shop">샵</Link>
        </li>
      </ul>
    </nav>
  );
};

export default GlobalNavigationBar;
