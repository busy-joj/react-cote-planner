import { useEffect, useState } from "react";
import { dummy } from "../data/dummy";

const Table = () => {
  const [problemData, setProblem] = useState([]);
  useEffect(() => {
    setProblem(dummy);
  }, []);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-3">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          프로그래머스
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
              제출한 시간
            </th>
          </tr>
        </thead>
        <tbody>
          {problemData.map((problem, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  {problem.problemNum}
                </a>
              </td>
              <td className="px-6 py-4">{problem.language}</td>
              <td className="px-6 py-4">{problem.solvedTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
