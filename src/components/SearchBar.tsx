import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import fetchUserCheck from '@/apis/fetchUserCheck';
import fetchAchievement from '@/apis/fetchAchievement';
import { IoSearch } from 'react-icons/io5';
import { userStore } from '@/store';

const SearchBar = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const { userInfo } = userStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const checkID = async () => {
      const { data: code } = await queryClient.fetchQuery({
        queryKey: ['userCheck', searchRef.current?.value],
        queryFn: () => fetchUserCheck(searchRef.current?.value || ''),
      });
      console.log('ddfdf', userInfo);
      if (searchRef.current)
        if (!userInfo || userInfo.baekjoon_id !== searchRef.current.value) {
          queryClient.prefetchQuery({
            queryKey: ['solved', searchRef.current.value],
            queryFn: () => fetchAchievement(searchRef.current?.value || ''),
          });
        }

      if (code === 404 || code === 403 || code === 401 || code === 402) {
        alert('ID를 정확히 입력하세요');
      } else if (code === 200) {
        navigate(`/profile/${searchRef.current?.value}`);
      }
    };
    checkID();
  };
  return (
    <form onSubmit={handleSubmit} className="px-3 py-4 lg:px-0">
      <label
        htmlFor="default-search"
        className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <IoSearch className="h-6 w-6 fill-gray-500" />
        </div>
        <input
          ref={searchRef}
          type="search"
          id="default-search"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="백준 아이디를 검색하세요"
          required
        />
        <button
          type="submit"
          className="absolute bottom-2.5 end-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
