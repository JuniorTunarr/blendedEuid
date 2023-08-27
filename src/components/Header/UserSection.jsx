import { useEffect, useState } from "react";
import UnLoginUser from "/assets/unloginUser.svg";
import DefaultUser from "/assets/defaultUser.svg";
import { useAuth } from "@/contexts/Auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import pb from "@/api/pocketbase";

function UserSection() {
  const [isListVisible, setIsListVisible] = useState(false);
  const { isAuth, user, signOut } = useAuth();
  const navigate = useNavigate();

  const [profileImageUrl, setProfileImageUrl] = useState(DefaultUser);

  useEffect(() => {
    if (isAuth && user?.avatar) {
      setProfileImageUrl(pb.files.getUrl(user, user.avatar));
    } else if (isAuth) {
      setProfileImageUrl(DefaultUser);
    } else {
      setProfileImageUrl(UnLoginUser);
    }
  }, [isAuth, user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="relative">
      <button
        className="flex items-center h-[42px] shadow-[rgba(0,0,0,0.18)_0px_1px_2px] bg-[white] cursor-pointer pl-4 pr-1.5 py-0 rounded-[21px] border-0"
        onClick={() => setIsListVisible(!isListVisible)}
      >
        <svg width={12} height={8} viewBox="0 0 12 8" fill="#222">
          <path
            d="M12 1.6H0V0h12v1.6zm0 1.6H0v1.6h12V3.2zm0 3.2H0V8h12V6.4z"
            fill="#222"
          />
        </svg>
        <img
          src={profileImageUrl}
          className="ml-2 w-[30px] h-[30px] border rounded-full object-cover"
          alt="사용자 프로필"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = DefaultUser;
          }}
        ></img>
      </button>
      <ul
        className={`transition-all duration-300 bg-white border border-gray-300 w-[100px] absolute top-[55px] -right-2 rounded-md p-2 ${
          isListVisible ? "block" : "hidden"
        }`}
      >
        {isAuth ? (
          <>
            <li className="p-1">
              <Link to="/profile">나의 프로필</Link>
            </li>
            <div className="w-full h-px bg-[rgb(221,221,221)] mx-0 my-2"></div>
            <li className="p-1">
              <button onClick={handleSignOut}>로그아웃</button>
            </li>
          </>
        ) : (
          <>
            <li className="p-1 block">
              <Link to="/signin">로그인</Link>
            </li>
            <div className="w-full h-px bg-[rgb(221,221,221)] mx-0 my-2"></div>
            <li className="block relative z-50">
              <Link to="/signup">회원가입</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default UserSection;
