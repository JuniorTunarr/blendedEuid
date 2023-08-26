import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import pb from "@/api/pocketbase";
import debounce from "@/utils/debounce";
import ClosedEyeIcon from "/assets/closed_eye.svg";
import OpenedEyeIcon from "/assets/opened_eye.svg";
import MailIcon from "/assets/mail.svg";

function SignIn() {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const handleSignIn = async (e) => {
    e.preventDefault();

    const { email, password } = formState;

    await pb.collection("users").authWithPassword(email, password);

    navigate("/");
  };

  const handleInput = debounce((e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }, 400);

  const togglePasswordHidden = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };
  return (
    <div className="flex justify-center items-center my-10">
      <div className="p-6 w-[400px] h-auto max-w-md rounded-md flex flex-col items-center">
        <h2 className="text-3xl text-center text-slate-600 mb-4">
          이메일로 로그인
        </h2>
        <form
          onSubmit={handleSignIn}
          className="flex flex-col gap-2 mt-4 justify-center items-center w-full"
        >
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="email" className="text-slate-900">
              이메일
            </label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={formState.email}
              onChange={handleInput}
              className="border border-slate-300 p-2 rounded-md focus:ring-slate-500 focus:ring-opacity-50 focus:border-slate-500 focus:outline-none w-[300px]"
            />
            <img
              src={MailIcon}
              alt="메일 아이콘"
              className="cursor-pointer absolute right-[10px] top-[50px] transform -translate-y-[50%]"
            />
          </div>
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="password" className="text-slate-900">
              패스워드
            </label>
            <input
              type={isPasswordHidden ? "password" : "text"}
              name="password"
              id="password"
              defaultValue={formState.password}
              onChange={handleInput}
              className="border border-slate-300 p-2 rounded-md focus:ring-slate-500 focus:ring-opacity-50 focus:border-slate-500 focus:outline-none w-[300px]"
            />
            <img
              src={isPasswordHidden ? ClosedEyeIcon : OpenedEyeIcon}
              alt="비밀번호 숨김/표시 아이콘"
              onClick={togglePasswordHidden}
              className="cursor-pointer absolute right-[10px] top-[50px] transform -translate-y-[50%]"
            />
          </div>
          <div className="flex mt-4 gap-2 justify-between h-[40px] w-[300px]">
            <button
              type="submit"
              className=" text-white px-2 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500 cursor-pointer flex-grow"
            >
              로그인
            </button>
            <button
              type="reset"
              className="bg-red-400 text-white px-2 py-2 rounded-md flex-grow"
            >
              취소
            </button>
          </div>
        </form>
        <p className="mt-4 ">
          아직 회원이 아니신가요? &nbsp;
          <Link to="/signup" className="text-blue-600 underline">
            회원가입
          </Link>
        </p>
        {/*<button
          type="button"
          className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
          onClick={async () => {
            if (confirm("뭐가 맘에 안드시죠? 정말 탈퇴할 생각인가요?")) {
              if (pb.authStore.model) {
                try {
                  await pb.collection("users").delete(pb.authStore.model.id);
                  console.log("탈퇴 성공");
                } catch (error) {
                  console.error(error);
                }
              } else {
                console.log("현재 로그인 된 사용자가 없어요.");
              }
            }
          }}
        >
          탈퇴
        </button>*/}
      </div>
    </div>
  );
}

export default SignIn;
