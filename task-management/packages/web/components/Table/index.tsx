type TableItem = {
  id: string;
  name: string;
  createTime: Date;
  importance: number;
  status: string;
  people: string[];
};

type Props = {
  data: Array<TableItem>;
};

const Index = ({ data }: Props) => {
  return (
    <div className="rounded-lg border border-gray-200 w-full h-full">
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
                相关人员
              </th>
              <th className="px-4 py-2">更多操作</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  {item.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                  {item.status}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                  {item.importance}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                  {item.people.join(", ")}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-center flex justify-around">
                  <a
                    href="#"
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 text-center"
                  >
                    查看
                  </a>
                  <a
                    href="#"
                    className="inline-block rounded bg-red-400 px-4 py-2 text-xs font-medium text-white hover:bg-red-700 text-center"
                  >
                    删除
                  </a>
                </td>
              </tr>
            ))}
            {/* <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                John Doe
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                24/05/1995
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                Web Developer
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                $120,000
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-center flex justify-around">
                <a
                  href="#"
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 text-center"
                >
                  查看
                </a>
                <a
                  href="#"
                  className="inline-block rounded bg-red-400 px-4 py-2 text-xs font-medium text-white hover:bg-red-700 text-center"
                >
                  删除
                </a>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>

      <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
        <ol className="flex justify-end gap-1 text-xs font-medium">
          <li>
            <a
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

          <li>
            <a
              href="#"
              className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
            >
              1
            </a>
          </li>

          <li className="block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">
            2
          </li>

          <li>
            <a
              href="#"
              className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
            >
              3
            </a>
          </li>

          <li>
            <a
              href="#"
              className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
            >
              4
            </a>
          </li>

          <li>
            <a
              href="#"
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
