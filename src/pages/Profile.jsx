import { useAuth } from "@/contexts/Auth";
import DefaultUser from "/assets/defaultUser.svg"; // 기본 사용자 이미지
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import pb from "@/api/pocketbase";
function Profile() {
  const { user, signOut, cancelMembership, updateUser } = useAuth();
  const navigate = useNavigate();

  // 로그아웃 핸들러
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // 회원탈퇴 핸들러
  const handleCancelMembership = async () => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      await cancelMembership(user.id);
      navigate("/");
    }
  };

  // 프로필 수정 모드 상태
  const [isEditMode, setIsEditMode] = useState(false);

  // 변경할 사용자 정보 상태
  const [updatedUser, setUpdatedUser] = useState({
    username: user?.username,
    email: user?.email,
    avatar: DefaultUser,
    avatarFile: null,
  });

  useEffect(() => {
    setUpdatedUser({
      username: user?.username || "",
      email: user?.email || "",
      avatar: user?.avatar || DefaultUser,
    });
  }, [user]);
  console.log(user);
  // 프로필(이미지X) 변경 핸들러
  const handleProfileChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };
  // 프로필(이미지) 변경 핸들러
  const handleAvatarChange = (e) => {
    if (e.target.files[0]) {
      setUpdatedUser({
        ...updatedUser,
        avatar: URL.createObjectURL(e.target.files[0]),
        avatarFile: e.target.files[0],
      });
    }
  };
  // 프로필 변경정보 저장 핸들러
  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("username", updatedUser.username);
      formData.append("email", updatedUser.email);

      if (updatedUser.avatarFile) {
        formData.append("avatar", updatedUser.avatarFile);
      }

      // 사용자 정보 업데이트
      await updateUser(user.id, formData);

      // 업데이트된 사용자 정보 다시 불러오기
      const refreshedUser = await pb.collection("users").getOne(user.id);
      const avatarUrl = pb.files.getUrl(refreshedUser, refreshedUser.avatar);

      setUpdatedUser({
        ...refreshedUser,
        avatar: avatarUrl || DefaultUser,
        avatarFile: null,
      });

      alert("저장 완료!");
      setIsEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center p-8 bg-white rounded shadow-lg">
        {isEditMode ? (
          <>
            <div className="flex justify-between gap-5 min-w-[18.75rem]">
              <label htmlFor="avatar" className="cursor-pointer">
                <img
                  src={updatedUser.avatar ? updatedUser.avatar : DefaultUser}
                  alt="사용자 프로필"
                  className="w-24 h-24 rounded-full mb-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DefaultUser;
                  }}
                />
              </label>
              <input
                type="file"
                id="avatar"
                accept=".jpg,.png,.svg,.webp"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
              />
              <div className="flex flex-col">
                <input
                  type="text"
                  name="username"
                  value={updatedUser.username}
                  onChange={handleProfileChange}
                  className="border border-gray-300 p-2 mb-[1rem] w-[10rem] rounded-md"
                />
                <input
                  type="text"
                  name="email"
                  value={user.email}
                  readOnly
                  className="border border-gray-300 p-2 w-[10rem] rounded-md"
                />
              </div>
            </div>
            <div className="flex gap-[1rem] mt-3">
              <button
                onClick={handleSaveProfile}
                className="px-[1.5rem] py-[0.5rem] text-white bg-blue-500 hover:bg-blue-600 rounded"
              >
                저장
              </button>
              <button
                onClick={() => setIsEditMode(false)}
                className="px-[1.5rem] py-[0.5rem] text-white bg-red-500 hover:bg-red-600 rounded"
              >
                취소
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between gap-5">
              <img
                src={updatedUser.avatar}
                alt="사용자 프로필"
                className="w-24 h-24 rounded-full mb-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = DefaultUser;
                }}
              />
              <div className="mt-4">
                <h2 className="text-xl font-bold mb-2">{user?.username}</h2>
                <span className="text-gray-500 mb-6 block">{user?.email}</span>
              </div>
            </div>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setIsEditMode(true)}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                프로필 변경
              </button>
              <button
                type="button"
                onClick={handleSignOut}
                className="px-4 py-2  text-white bg-green-500 rounded hover:bg-green-600"
              >
                로그아웃
              </button>
              <button
                type="button"
                onClick={handleCancelMembership}
                className="px-4 py-2 text-white bg-red-400 border-none rounded hover:bg-red-500"
              >
                회원탈퇴
              </button>
            </div>
          </>
        )}
      </div>

      <div className="bg-white p-[10%] mt-[3rem] mx-auto w-[80%] h-[20rem] flex items-center justify-center">
        <h3 className="font-semibold text-xl text-center">
          아직 작성한 게시글이 없어요. 😢
        </h3>
      </div>
    </div>
  );
}

export default Profile;
