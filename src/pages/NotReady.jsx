import React from 'react';
import { Link } from 'react-router-dom';

const NotReady = () => {
  return (
    <section className="bg-white dark:bg-gray-900 h-screen flex items-center">
      <div className="mx-auto max-w-screen-sm text-center">
        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
          📢서비스 준비중입니다📢
        </p>
        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
          보다 나은 서비스 제공을 위하여 페이지 준비중에 있습니다.
          <br />
          빠른 시일내에 준비하여 찾아뵙겠습니다.
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

export default NotReady;
