import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import pb from "@/api/pocketbase";
import debounce from "@/utils/debounce";
import ClosedEyeIcon from "/assets/closed_eye.svg";
import OpenedEyeIcon from "/assets/opened_eye.svg";
import MailIcon from "/assets/mail.svg";
import UserIcon from "/assets/person.svg";
import CheckIcon from "/assets/green_check_icon.svg";
import WrongIcon from "/assets/red_x_icon.svg";

function SignUp() {
  const navigate = useNavigate();

  const nameRegex = /^.{2,10}$/; // 2~10글자
  const usernameRegex = /^.{2,15}$/; // 2~15글자
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 일반적인 이메일 형식
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/; // 8~16글자 영문+숫자

  const [formState, setFormState] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  // 유효성 검사 상태
  const [validationErrors, setValidationErrors] = useState({
    name: false,
    username: false,
    email: false,
    password: false,
    passwordConfirm: false,
  });

  // 유효성 검사 전체 통과 확인
  const isFormValid = () => {
    return Object.values(validationErrors).every((error) => error === false);
  };

  // 비밀번호 숨김/표시 상태 관리
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);

  // 회원가입 등록 핸들러
  const handleRegister = async (e) => {
    e.preventDefault();

    const { password, passwordConfirm } = formState;

    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다. 다시 확인해보세요.");
      return;
    }

    // PocketBase SDK 인증 요청
    await pb.collection("users").create({
      ...formState,
      emailVisibility: true,
    });

    navigate("/");
  };

  // 인풋 핸들러
  const handleInput = (e) => {
    const { name, value } = e.target;

    let isValid;

    switch (name) {
      case "name":
        isValid = nameRegex.test(value);
        break;
      case "username":
        isValid = usernameRegex.test(value);
        break;
      case "email":
        isValid = emailRegex.test(value);
        break;
      case "password":
        isValid = passwordRegex.test(value);
        break;
      case "passwordConfirm":
        isValid = formState.password === value;
        break;
      default:
        return;
    }

    setValidationErrors({
      ...validationErrors,
      [name]: !isValid,
    });

    if (isValid) {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  const handleDebounceInput = debounce(handleInput, 500);
  // 비밀번호 숨김/표시 토글 함수
  const togglePasswordHidden = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };
  const toggleConfirmPasswordHidden = () => {
    setIsConfirmPasswordHidden(!isConfirmPasswordHidden);
  };

  return (
    <div className="flex justify-center items-center my-10">
      <div className="w-[400px] h-auto max-w-md rounded-md flex flex-col items-center">
        <h2 className="text-3xl text-center text-slate-600">회원가입</h2>
        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-2 mt-4 justify-start items-start"
        >
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="name" className="text-slate-900">
              사용자 이름
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="2~10글자"
              defaultValue={formState.name}
              onChange={handleDebounceInput}
              className={`border ${
                validationErrors.name
                  ? "border-red-500"
                  : !validationErrors.name && formState.name !== ""
                  ? "border-green-600"
                  : "border-slate-300"
              } p-2 rounded-md focus:ring-blue-400 focus:ring-opacity-50 focus:border-blue-400 focus:outline-none w-[300px]`}
            />
            <img
              src={UserIcon}
              alt="유저 아이콘"
              className="cursor-pointer absolute right-[10px] top-[50px] transform -translate-y-[50%]"
            />
            {validationErrors.name && (
              <>
                <img
                  src={WrongIcon}
                  alt="유효성 검사 실패 아이콘"
                  className="cursor-pointer absolute -right-[25px] top-[50px] transform -translate-y-[50%]"
                />
                <span className="text-red-500 text-xs">
                  사용자 이름은 2~10자로 입력해주세요.
                </span>
              </>
            )}
            {!validationErrors.name && formState.name !== "" && (
              <>
                <img
                  src={CheckIcon}
                  alt="유효성 검사 통과 아이콘"
                  className="cursor-pointer absolute -right-[25px] top-[50px] transform -translate-y-[50%]"
                />
                <span className="text-green-600 text-xs">
                  사용가능한 이름입니다.
                </span>
              </>
            )}
          </div>
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="username" className="text-slate-900">
              계정 이름(별명)
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="15글자 내외"
              defaultValue={formState.username}
              onChange={handleDebounceInput}
              className={`border ${
                validationErrors.username
                  ? "border-red-500"
                  : !validationErrors.username && formState.username !== ""
                  ? "border-green-600"
                  : "border-slate-300"
              } p-2 rounded-md focus:ring-blue-400 focus:ring-opacity-50 focus:border-blue-400 focus:outline-none w-[300px]`}
            />
            {!validationErrors.username && formState.username !== "" && (
              <>
                <img
                  src={CheckIcon}
                  alt="유효성 검사 통과 아이콘"
                  className="cursor-pointer absolute -right-[25px] top-[50px] transform -translate-y-[50%]"
                />
                <span className="text-green-600 text-xs">
                  사용가능한 계정 이름입니다.
                </span>
              </>
            )}
            {validationErrors.username && (
              <>
                <img
                  src={WrongIcon}
                  alt="유효성 검사 실패 아이콘"
                  className="cursor-pointer absolute -right-[25px] top-[50px] transform -translate-y-[50%]"
                />
                <span className="text-red-500 text-xs">
                  계정 이름은 15자 내로 입력해주세요.
                </span>
              </>
            )}
          </div>
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="email" className="text-slate-900">
              이메일
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="@를 포함한 이메일 형식"
              defaultValue={formState.email}
              onChange={handleDebounceInput}
              className={`border ${
                validationErrors.email
                  ? "border-red-500"
                  : !validationErrors.email && formState.email !== ""
                  ? "border-green-600"
                  : "border-slate-300"
              } p-2 rounded-md focus:ring-blue-400 focus:ring-opacity-50 focus:border-blue-400 focus:outline-none w-[300px]`}
            />
            <img
              src={MailIcon}
              alt="메일 아이콘"
              className="cursor-pointer absolute right-[10px] top-[50px] transform -translate-y-[50%]"
            />
            {!validationErrors.email && formState.email !== "" && (
              <>
                <img
                  src={CheckIcon}
                  alt="유효성 검사 통과 아이콘"
                  className="cursor-pointer absolute -right-[25px] top-[50px] transform -translate-y-[50%]"
                />
                <span className="text-green-600 text-xs">
                  사용가능한 이메일입니다.
                </span>
              </>
            )}
            {validationErrors.email && (
              <>
                <img
                  src={WrongIcon}
                  alt="유효성 검사 실패 아이콘"
                  className="cursor-pointer absolute -right-[25px] top-[50px] transform -translate-y-[50%]"
                />
                <span className="text-red-500 text-xs">
                  올바른 이메일 형식으로 입력해주세요.
                </span>
              </>
            )}
          </div>
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="password" className="text-slate-900">
              패스워드
            </label>
            <input
              type={isPasswordHidden ? "password" : "text"}
              name="password"
              id="password"
              placeholder="영문,숫자 포함 8자~16자"
              defaultValue={formState.password}
              onChange={handleDebounceInput}
              className={`border ${
                validationErrors.password
                  ? "border-red-500"
                  : !validationErrors.password && formState.password !== ""
                  ? "border-green-600"
                  : "border-slate-300"
              } p-2 rounded-md focus:ring-blue-400 focus:ring-opacity-50 focus:border-blue-400 focus:outline-none w-[300px]`}
            />
            <img
              src={isPasswordHidden ? ClosedEyeIcon : OpenedEyeIcon}
              alt="비밀번호 숨김/표시 아이콘"
              onClick={togglePasswordHidden}
              className="cursor-pointer absolute right-[10px] top-[50px] transform -translate-y-[50%]"
            />
            {!validationErrors.password && formState.password !== "" && (
              <>
                <img
                  src={CheckIcon}
                  alt="유효성 검사 통과 아이콘"
                  className="cursor-pointer absolute -right-[25px] top-[50px] transform -translate-y-[50%]"
                />
                <span className="text-green-600 text-xs">
                  사용가능한 비밀번호입니다.
                </span>
              </>
            )}
            {validationErrors.password && (
              <span className="text-red-500 text-xs">
                비밀번호는 영문, 숫자를 포함하여 8자~16자로 입력해주세요.
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="passwordConfirm" className="text-slate-900">
              패스워드 확인
            </label>
            <input
              type={isConfirmPasswordHidden ? "password" : "text"}
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="비밀번호 재확인"
              defaultValue={formState.passwordConfirm}
              onChange={handleDebounceInput}
              className={`border ${
                validationErrors.passwordConfirm
                  ? "border-red-500"
                  : !validationErrors.passwordConfirm &&
                    formState.passwordConfirm !== ""
                  ? "border-green-600"
                  : "border-slate-300"
              } p-2 rounded-md focus:ring-blue-400 focus:ring-opacity-50 focus:border-blue-400 focus:outline-none w-[300px]`}
            />
            <img
              src={isConfirmPasswordHidden ? ClosedEyeIcon : OpenedEyeIcon}
              alt="비밀번호 확인 숨김/표시 아이콘"
              onClick={toggleConfirmPasswordHidden}
              className="cursor-pointer absolute right-[10px] top-[50px] transform -translate-y-[50%]"
            />
            {!validationErrors.passwordConfirm &&
              formState.passwordConfirm !== "" && (
                <>
                  <img
                    src={CheckIcon}
                    alt="유효성 검사 통과 아이콘"
                    className="cursor-pointer absolute -right-[25px] top-[50px] transform -translate-y-[50%]"
                  />
                  <span className="text-green-600 text-xs">
                    비밀번호와 일치합니다.
                  </span>
                </>
              )}
            {validationErrors.passwordConfirm && (
              <span className="text-red-500 text-xs">
                비밀번호와 일치하지 않습니다. 다시 확인해주세요.
              </span>
            )}
          </div>
          <div className="flex gap-4 mt-4 justify-between w-full">
            <button
              type="submit"
              disabled={!isFormValid()}
              className={`text-white px-10 py-2 rounded-md w-full ${
                isFormValid()
                  ? "bg-blue-500 cursor-pointer"
                  : "bg-blue-200 cursor-not-allowed"
              }`}
            >
              가입
            </button>
            <button
              type="button"
              className="bg-red-400 text-white px-10 py-2 rounded-md w-full"
            >
              취소
            </button>
          </div>
        </form>
        <p className="mt-5 ">
          이미 회원이신가요? &nbsp;
          <Link to="/signin" className="text-blue-600 underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
