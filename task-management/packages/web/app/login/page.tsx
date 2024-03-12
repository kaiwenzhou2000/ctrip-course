"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert } from "../../components/index";

const Page = () => {
  const router = useRouter();

  const [fromData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const onChange = (key: string, value: string) => {
    setFormData({ ...fromData, [key]: value });
  };

  const onLogin = (e) => {
    e.preventDefault();

    // console.log();
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fromData),
    })
      .then((res) => res.json())
      .then(({ data, code, message }) => {
        // 存储用户信息
        localStorage.setItem("user", JSON.stringify(data));
        if (code === 0) {
          router.push("/");
        } else {
          setAlertVisible(true);
          setAlertMessage(message);
          setTimeout(() => {
            setAlertVisible(false);
          }, 3000);
        }
      });
  };
  return (
    <>
      {alertVisible && <Alert type="fail" message={alertMessage} />}
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            携程作业-管理系统
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            使用 nextjs + express 完成的管理系统
            <br />
            {`<author>周凯文</author>`}
          </p>

          <form
            action="#"
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">登陆</p>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  defaultValue={fromData.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="输入邮箱"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  defaultValue={fromData.password}
                  onChange={(e) => onChange("password", e.target.value)}
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="输入密码"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
              onClick={onLogin}
            >
              登录
            </button>

            <p className="text-center text-sm text-gray-500">
              没有帐号?
              <Link className="underline" href={"../register"}>
                注册
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
