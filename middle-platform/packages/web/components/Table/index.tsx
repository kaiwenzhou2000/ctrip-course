type TableItem = {
  _id: string;
  name: string;
  createTime: Date;
  importance: number;
  status: number;
  description: string;
};

type Props = {
  data: Array<TableItem>;
  currentPage: number;
  totalPages: number;
  onPaginate: (page: number) => void;
  onDelete: (id: string) => void;
  onEidt: (id: string) => void;
  onView: (id: string) => void;
};

const success = () => (
  <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="-ms-1 me-1.5 h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>

    <p className="whitespace-nowrap text-sm">已完成</p>
  </span>
);

const warning = () => (
  <span className="inline-flex items-center justify-center rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="-ms-1 me-1.5 h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z"
      />
    </svg>

    <p className="whitespace-nowrap text-sm">进行中</p>
  </span>
);

const error = () => (
  <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="-ms-1 me-1.5 h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>

    <p className="whitespace-nowrap text-sm">未开始</p>
  </span>
);

const status = (status: number) => {
  switch (status) {
    case 0:
      return error();
    case 1:
      return warning();
    case 2:
      return success();
  }
};

const Index = ({
  data,
  totalPages,
  currentPage,
  onPaginate,
  onDelete,
  onView,
  onEidt,
}: Props) => {
  return (
    <div className="rounded-lg border border-gray-200 w-full">
      <div className="overflow-x-auto rounded-t-lg">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                任务名称
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                状态
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                重要性
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                描述
              </th>
              <th className="px-4 py-2">更多操作</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item._id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  {item.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                  {status(item.status)}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                  <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700">
                    {`p ${item.importance + 1}`}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                  {item.description}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-center flex justify-around">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      onView(item._id);
                    }}
                    href="#"
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 text-center"
                  >
                    查看
                  </a>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      onEidt(item._id);
                    }}
                    href="#"
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 text-center"
                  >
                    编辑
                  </a>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      onDelete(item._id);
                    }}
                    href="#"
                    className="inline-block rounded bg-red-400 px-4 py-2 text-xs font-medium text-white hover:bg-red-700 text-center"
                  >
                    删除
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
        <ol className="flex justify-end gap-1 text-xs font-medium">
          <li>
            <a
              onClick={
                currentPage === 1
                  ? () => onPaginate(1)
                  : () => onPaginate(currentPage - 1)
              }
              href="#"
              className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
            >
              <span className="sr-only">Prev Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>

          {Array.from({ length: totalPages }).map((_, index) => (
            <li key={index}>
              <a
                href="#"
                onClick={() => onPaginate(index + 1)}
                className={
                  currentPage === index + 1
                    ? "block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white"
                    : "block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                }
              >
                {index + 1}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#"
              onClick={
                currentPage === totalPages
                  ? () => onPaginate(currentPage)
                  : () => onPaginate(currentPage + 1)
              }
              className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
            >
              <span className="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Index;
