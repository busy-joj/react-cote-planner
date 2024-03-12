import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="bg-white dark:bg-gray-900 h-screen flex items-center">
      <div className="mx-auto max-w-screen-sm text-center">
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
          404
        </h1>
        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
          🚨페이지를 찾을 수 없습니다🚨
        </p>
        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
          페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
          <br />
          입력하신 주소가 정확한지 다시 한 번 확인해주세요.
        </p>
        <Link
          to="/"
          className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
        >
          메인으로
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
