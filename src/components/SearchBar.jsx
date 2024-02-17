import React, { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { IoSearch } from 'react-icons/io5';

const SearchBar = () => {
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    const checkID = async () => {
      await axios
        .get(
          `${import.meta.env.VITE_SERVER_URL}login?userId=${
            searchRef.current.value
          }`,
        )
        .then(res => {
          const code = res.data;
          if (code === 404 || code === 403 || code === 401 || code === 402) {
            alert('ID를 정확히 입력하세요');
          } else if (code === 200) {
            navigate(`/profile/${searchRef.current.value}`);
          }
        })
        .catch(error => {
          console.log('Error', error);
        });
    };
    checkID();
  };
  return (
    <form onSubmit={handleSubmit} className="py-4">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <IoSearch className="fill-gray-500 w-6 h-6" />
        </div>
        <input
          ref={searchRef}
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="백준 아이디를 검색하세요"
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
