import React, { useEffect, useState } from "react";
import { dummy } from "../data/dummy";

const Table = () => {
  const [problemData, setProblem] = useState([]);
  useEffect(() => {
    setProblem(dummy);
  }, []);
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg py-3">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          프로그래머스
        </caption>
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              문제
            </th>
            <th scope="col" class="px-6 py-3">
              언어
            </th>
            <th scope="col" class="px-6 py-3">
              제출한 시간
            </th>
          </tr>
        </thead>
        <tbody>
          {problemData.map((problem) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  {problem.problemNum}
                </a>
              </td>
              <td class="px-6 py-4">{problem.language}</td>
              <td class="px-6 py-4">{problem.solvedTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
