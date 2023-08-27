const GlobalNavigationBar = () => {
  return (
    <nav className="globalNavigationBar fixed">
      <ul className="flex">
        <li className="focus:rounded focus:shadow-md focus:shadow-blue-600">
          <a className="active:text-{#373e6a}" href="/blendedEuid/about">
            소개
          </a>
        </li>
        <li className="focus:rounded focus:shadow-md focus:shadow-blue-600">
          <a className="active:text-{#373e6a}" href="/blendedEuid/course">
            과정 &gt;
          </a>
        </li>
        <li className="focus:rounded focus:shadow-md focus:shadow-blue-600">
          <a className="active:text-{#373e6a}" href="/blendedEuid/schedule">
            연간 일정
          </a>
        </li>
        <li className="focus:rounded focus:shadow-md focus:shadow-blue-600">
          <a className="active:text-{#373e6a}" href="/blendedEuid/guide">
            학습 안내
          </a>
        </li>
        <li className="focus:rounded focus:shadow-md focus:shadow-blue-600">
          <a className="active:text-{#373e6a}" href="/blendedEuid/faq">
            FAQ
          </a>
        </li>
        <li className="focus:rounded focus:shadow-md focus:shadow-blue-600">
          <a className="active:text-{#373e6a}" href="/blendedEuid/story">
            브랜드 이야기
          </a>
        </li>
        <li className="focus:rounded focus:shadow-md focus:shadow-blue-600">
          <a
            className="active:text-{#373e6a}"
            href="/blendedEuid/privacypolicy"
          >
            정책 /환불 규정
          </a>
        </li>
        <li className="focus:rounded focus:shadow-md focus:shadow-blue-600">
          <a className="active:text-{#373e6a}" href="/blendedEuid/shop">
            샵
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default GlobalNavigationBar;
