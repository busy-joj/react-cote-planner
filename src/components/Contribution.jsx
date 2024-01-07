const Contribution = () => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-5">
      <table className="p-5 bg-[#79572C] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-separate border-spacing-1 m-auto">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          Our products
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {/* <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Color
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">classclass
              <span className="sr-only">Edit</span>
            </th> */}
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((value) => (
            <tr
              className="border-b dark:bg-gray-800 dark:border-gray-700 h-3 text-white text-xs leading-3	"
              key={value}
            >
              <td>{value}</td>
              {/* <td className="ContributionCalendar-label" style="position: relative">
            <span className="sr-only">Monday</span>
            <span
              aria-hidden="true"
              style="clip-path: None; position: absolute; bottom: -3px"
            >
              Fri
            </span>
          </td> */}
              <td className="w-3 bg-[#BEE276] rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-[#8CB838] after:font-thin overflow-hidden"></td>
              {/* <td className="w-3 bg-[#BEE276] rounded-tl-full rounded-br-full relative after:content-[''] after:w-3 after:h-3 after:bg-[#BEE276] after:block after:rounded-bl-full after:rounded-tr-full after:left-[-4px] after:absolute"></td> */}
              <td className="w-3 bg-[#F0F0EF] rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
              <td className="w-3 bg-[#F0F0EF]  rounded-tl-full rounded-br-full relative after:content-['/'] after:absolute after:left-[2px] after:rotate-[20deg] after:top-[0.8px] after:text-gray-300"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contribution;
