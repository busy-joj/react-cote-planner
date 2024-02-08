import useGetData from '@/hooks/useGetData';
import { getBackjoonSolvedData } from '@/apis/crawling/backjoon';
const FetchTable = ({ params }) => {
  const problemData = useGetData(
    `achievement?id=${params.id}`,
    getBackjoonSolvedData,
  );

  return (
    <>
      {problemData ? (
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
    </>
  );
};

export default FetchTable;
