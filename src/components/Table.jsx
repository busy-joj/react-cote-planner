import { useEffect, useState } from "react";

const Table = ({ fetchSolvedProblem }) => {
  const [problemData, setProblem] = useState([]);
  useEffect(() => {
    if (fetchSolvedProblem) {
      setProblem(Object.values(fetchSolvedProblem));
    }
  }, [fetchSolvedProblem]);
  return (
    <>
      {" "}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-3">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            BAEJOON
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                문제
              </th>
              <th scope="col" className="px-6 py-3">
                언어
              </th>
              <th scope="col" className="px-6 py-3">
                학습한 시간
              </th>
              <th scope="col" className="px-6 py-3">
                복습한 시간
              </th>
            </tr>
          </thead>
          <tbody>
            {problemData.length > 0 ? (
              problemData.map((problem, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      {problem?.problemNum}
                    </a>
                  </td>
                  <td className="px-6 py-4">{problem?.language}</td>
                  <td className="px-6 py-4">{problem?.solvedTime[0]}</td>
                  <td className="px-6 py-4">{problem?.solvedTime[1]}</td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex">
        <a
          href="#"
          className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <svg
            className="w-3.5 h-3.5 me-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Previous
        </a>
        <a
          href="#"
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </>
  );
};

export default Table;
