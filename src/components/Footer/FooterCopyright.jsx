import { useState } from "react";

const FooterCopyright = () => {
  // 현재(오늘) 년도를 화면에 출력하는 상태를 설정
  const [currentYear] = useState(() => new Date().getFullYear());
  return (
    <small className="text-base">
      Copyright &copy; <b>{currentYear}</b>. <strong>이듬(EUID)</strong>. All
      Rights Reserved{" "}
    </small>
  );
};

export default FooterCopyright;
