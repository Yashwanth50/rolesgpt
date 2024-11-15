import React, { useState } from "react";
import axios from "axios";

const SignInUI: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSignIn = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Sign-in with email:", email, "password:", password);
  };

  const handleLogin = (logintype: string): void => {
    console.log("API base URL is not defined in the environment variables.", apiUrl);
  
    axios.get<{ authorization_url: string }>(`${apiUrl}/${logintype}`)
      .then((response) => {
        window.location.href = response.data.authorization_url;
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <div className="login mx-auto bg-[#F0F4F8] shadow-xl flex h-[100svh] md:h-screen overflow-y-hidden">
      <div className="box bg-transparent md:bg-[#F0F4F8] p-6 py-12 md:p-0 w-[90vw] md:w-full md:h-full flex md:justify-between">
        <div className="hidden md:block inner-box"></div>
        <div className="w-full md:w-[60%] p-6 relative">
          <img
            src="/images/roles-gpt-sign.svg"
            className="w-[136px]"
            alt="logo"
          />
          <div className="md:w-[434px] h-fit flex flex-col justify-center items-center md:items-start absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
            <h1 className="text-[24px] md:text-[32px] leading-[38px] font-medium md:font-semibold text-[#4E4E4E] md:text-[#323232] mt-8 md:mt-4">
              Welcome
            </h1>
            <h3 className=" font-normal text-[16px] leading-[24px] text-[#323232] mb-5 hidden md:block">
              Sign in to your account
            </h3>


            <form
              onSubmit={handleSignIn}
              className="w-full"
            >
              <div className="mb-4">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[42px] px-2 rounded-[4px] focus:outline-none"
                  placeholder="Enter your Email"
                />
              </div>
              <div className="mb-4">
                <div className="relative">
                  <input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-[42px] px-2 rounded-[4px] focus:outline-none"
                    placeholder="Enter your Password"
                  />
                  <button
                    type="button"
                    onClick={handlePasswordVisibility}
                    className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-600"
                  >
                    {isPasswordVisible ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div className="w-full text-gray-400 text-[12px] md:text-[12px] font-normal md:font-semibold text-start md:text-end my-4 ">
                <a href="/forgot-password" className=" text-[#4589FF] mx-1">
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full h-[42px] rounded md:text-[12px] font-normal md:font-semibold sign text-white hover:bg-blue-600"
              >
                Sign In
              </button>
            </form>


            <div className="w-full flex flex-col gap-4 mt-4">
              <div className="w-full  flex gap-0 md:gap-2 items-center py-2">
                <span className=" w-full border-b-2 border-gray-200"></span>
                <span className=" text-[12px] font-light text-[#8C939F] hidden md:block">
                  OR
                </span>
                <span className=" w-full border-b-2 border-gray-200"></span>
              </div>
              <div
                onClick={() => handleLogin("google-login")}
                className="w-full form-input border rounded-[8px] md:rounded-normal flex items-center justify-center gap-2 hover:border-2 hover:border-[#E78E24] cursor-pointer"
              >
                <img
                  src="/icons/google.svg"
                  alt="okta"
                  className="w-[16px] md:w-[16px]"
                />
                <span className=" text-[14px] md:text-[16px] font-semibold leading-[24px] text-[#25282E] mb-[1px]">
                  Continue with Google
                </span>
              </div>
              <div
                onClick={() => handleLogin("ms-login")}
                className="w-full form-input border rounded-[8px] md:rounded-normal flex items-center justify-center gap-2 hover:border-2 hover:border-[#E78E24] cursor-pointer"
              >
                <img
                  src="/icons/microsoft.svg"
                  alt="microsoft"
                  className="w-[16px] md:w-[24px]"
                />
                <span className=" text-[14px] md:text-[16px] font-semibold leading-[24px] text-[#25282E]">
                  Continue with Microsoft
                </span>
              </div>
              <div className="hidden md:block text-[#64645F] text-[12px] leading-[20px] font-medium">
                Don't have an account?
                <a href="/register" className=" text-[#4589FF] mx-1">
                  Sign Up
                </a>
              </div>
            </div>


            <div className=" text-gray-400 h-fit mt-32 text-[12px] leading-[18px] font-normal md:hidden flex w-full justify-between items-center">
              <a
                href="/terms-service"
                target="_blank"
                className=" text-[#B32C90] mx-1"
              >
                Terms and Conditions
              </a>
              <div className="border-r-[1px] border-border h-[14px]"></div>
              <a
                href="/usage-policy"
                target="_blank"
                className=" text-[#B32C90] mx-1"
              >
                Usage Policy
              </a>
              <div className="border-r-[1px] border-border h-[14px]"></div>
              <a
                href="/privacy-policy"
                target="_blank"
                className=" text-[#B32C90] mx-1"
              >
                Privacy Policy
              </a>
            </div>
          </div>
          <div className="w-[434px] absolute left-[50%] translate-x-[-50%] bottom-4 text-gray-400 h-fit text-[12px] leading-[18px] font-light hidden md:block text-center">
            <div>
              All Rights Reserved. By continuing, you agree to
              RolesGPT's
            </div>
            <a
              href="/terms-service"
              target="_blank"
              className=" text-[#656C78] mx-1 underline"
            >
              Consumer Terms
            </a>
            and
            <a
              href="/usage-policy"
              target="_blank"
              className=" text-[#656C78] mx-1 underline"
            >
              {" "}
              Usage Policy</a>, and acknowledge their
            <a
              href="/privacy-policy"
              target="_blank"
              className=" text-[#656C78] mx-1 underline"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInUI;
