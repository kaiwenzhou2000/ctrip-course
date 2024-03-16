import { useState } from "react";

type FormData = {
  name: string;
  importance: number;
  status: number;
  description: string;
};

type Props = {
  onSubmit: (data: FormData, model: "create" | "edit" | "view") => void;
  onCancel: () => void;
  rawData: FormData;
  mode: "create" | "edit" | "view";
};

const Index = ({ onSubmit, onCancel, rawData, mode }: Props) => {
  const [data, setData] = useState<FormData>(rawData);

  const handleInput = (v: any, key: string) => {
    const value = v;
    setData({ ...data, [key]: value });
  };

  const isImportantFocus = (key: number) => {
    return key === data.importance
      ? "inline-block rounded-md bg-white px-4 py-2 text-sm text-blue-500 shadow-sm focus:relative"
      : "inline-block rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative";
  };

  const isStatusFocus = (key: number) => {
    return key !== data.status
      ? "block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black"
      : "block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black border-black bg-black text-white";
  };

  const buttonList = (mode: "create" | "edit" | "view") => {
    switch (mode) {
      case "create":
        return (
          <div className="mt-4 flex justify-around">
            <button
              onClick={(e) => {
                e.preventDefault();
                onSubmit(data, mode);
              }}
              className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
            >
              确认创建
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                onCancel();
              }}
              className="inline-block w-full rounded-lg bg-white px-5 py-3 font-medium text-black sm:w-auto border border-black border-1"
            >
              取消创建
            </button>
          </div>
        );
      case "edit":
        return (
          <div className="mt-4 flex justify-around">
            <button
              onClick={(e) => {
                e.preventDefault();
                onSubmit(data, mode);
              }}
              className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
            >
              确认修改
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                onCancel();
              }}
              className="inline-block w-full rounded-lg bg-white px-5 py-3 font-medium text-black sm:w-auto border border-black border-1"
            >
              取消修改
            </button>
          </div>
        );
      case "view":
        return (
          <div className="mt-4 flex justify-around">
            <button
              onClick={(e) => {
                e.preventDefault();
                onCancel();
              }}
              className="inline-block w-full rounded-lg bg-white px-5 py-3 font-medium text-black sm:w-auto border border-black border-1"
            >
              关闭查看
            </button>
          </div>
        );
    }
  };

  return (
    <section className="bg-gray-100 absolute w-3/4">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid justify-center">
          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form action="#" className="space-y-4">
              <div>
                <label className="sr-only" htmlFor="name">
                  Name
                </label>
                <input
                  disabled={mode === "view"}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="任务名称"
                  type="text"
                  id="name"
                  defaultValue={data.name}
                  onChange={(e) => handleInput(e.target.value, "name")}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div className="flex items-center col-span-1">
                  <label className="sr-only" htmlFor="email">
                    Email
                  </label>
                  重要性
                </div>

                <div className="col-span-3">
                  <label className="sr-only" htmlFor="phone">
                    Phone
                  </label>
                  <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
                    <button
                      disabled={mode === "view"}
                      className={isImportantFocus(0)}
                      onClick={(e) => {
                        e.preventDefault();
                        handleInput(0, "importance");
                      }}
                    >
                      P1
                    </button>
                    <button
                      disabled={mode === "view"}
                      className={isImportantFocus(1)}
                      onClick={(e) => {
                        e.preventDefault();
                        handleInput(1, "importance");
                      }}
                    >
                      P2
                    </button>
                    <button
                      disabled={mode === "view"}
                      className={isImportantFocus(2)}
                      onClick={(e) => {
                        e.preventDefault();
                        handleInput(2, "importance");
                      }}
                    >
                      P3
                    </button>
                    <button
                      disabled={mode === "view"}
                      className={isImportantFocus(3)}
                      onClick={(e) => {
                        e.preventDefault();
                        handleInput(3, "importance");
                      }}
                    >
                      P4
                    </button>
                    <button
                      disabled={mode === "view"}
                      className={isImportantFocus(4)}
                      onClick={(e) => {
                        e.preventDefault();
                        handleInput(4, "importance");
                      }}
                    >
                      P5
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="Option1"
                    className={isStatusFocus(0)}
                    tabIndex={0}
                  >
                    <input
                      disabled={mode === "view"}
                      className="sr-only"
                      id="Option1"
                      type="radio"
                      tabIndex={-1}
                      name="option"
                      onClick={(e) => {
                        e.preventDefault();
                        handleInput(0, "status");
                      }}
                    />

                    <span className="text-sm"> 未开始 </span>
                  </label>
                </div>

                <div>
                  <label
                    htmlFor="Option2"
                    className={isStatusFocus(1)}
                    tabIndex={0}
                  >
                    <input
                      disabled={mode === "view"}
                      className="sr-only"
                      id="Option2"
                      type="radio"
                      tabIndex={-1}
                      name="option"
                      onClick={(e) => {
                        e.preventDefault();
                        handleInput(1, "status");
                      }}
                    />

                    <span className="text-sm"> 进行中 </span>
                  </label>
                </div>

                <div>
                  <label
                    htmlFor="Option3"
                    className={isStatusFocus(2)}
                    tabIndex={0}
                  >
                    <input
                      disabled={mode === "view"}
                      className="sr-only"
                      id="Option3"
                      type="radio"
                      tabIndex={-1}
                      name="option"
                      onClick={(e) => {
                        e.preventDefault();
                        handleInput(2, "status");
                      }}
                    />

                    <span className="text-sm"> 已完成 </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="sr-only" htmlFor="message">
                  Message
                </label>

                <textarea
                  disabled={mode === "view"}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="任务描述"
                  rows={8}
                  id="message"
                  defaultValue={data.description}
                  onChange={(e) => handleInput(e.target.value, "description")}
                ></textarea>
              </div>

              {buttonList(mode)}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
