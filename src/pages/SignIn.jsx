import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import pb from "@/api/pocketbase";
import debounce from "@/utils/debounce";

function SignIn() {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

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

  return (
    <div className="flex justify-center items-center my-20">
      <div className="p-6 w-[400px] h-[400px] max-w-md rounded-md">
        <h2 className="text-2xl text-center">이메일로 로그인</h2>
        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-slate-900">
              이메일
            </label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={formState.email}
              onChange={handleInput}
              className="border border-slate-300 p-2 rounded-md focus:ring-slate-500 focus:ring-opacity-50 focus:border-slate-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-slate-900">
              패스워드
            </label>
            <input
              type="password"
              name="password"
              id="password"
              defaultValue={formState.password}
              onChange={handleInput}
              className="border border-slate-300 p-2 rounded-md focus:ring-slate-500 focus:ring-opacity-50 focus:border-slate-500 focus:outline-none"
            />
          </div>
          <div className="flex gap-2 mt-4 justify-center">
            <button
              type="submit"
              className="bg-slate-500 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              로그인
            </button>
            <button
              type="reset"
              className="bg-slate-300 text-white px-4 py-2 rounded-md"
            >
              취소
            </button>
          </div>
        </form>
        <p className="mt-4 ">
          아직 회원이 아니신가요?{" "}
          <Link to="/signup" className="text-blue-600 underline">
            회원가입
          </Link>
        </p>
        <button
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
        </button>
      </div>
    </div>
  );
}

export default SignIn;
