import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { userStore } from '@/store';
import { GiHamburgerMenu } from 'react-icons/gi';
import AvatarButton from './AvatarButton';
import { supabaseClient } from '../supabase/client';

const Header = () => {
  const { pathname } = useLocation();
  const { userInfo, setUserInfo } = userStore();
  const [loginIsIntialized, setLoginIsIntialized] = useState(false);

  useEffect(() => {
    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          const data = session?.user.user_metadata;
          setUserInfo(data);
        } else if (event === 'SIGNED_OUT') {
          [window.localStorage, window.sessionStorage].forEach(storage => {
            Object.entries(storage).forEach(([key]) => {
              stoWrage.removeItem(key);
            });
          });
        }
        setLoginIsIntialized(true);
      },
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (pathname === '/login' || pathname === '/signup') return null;
  return (
    <header className="shadow-sm z-50 fixed w-full">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              💪코테PT
            </span>
          </Link>
          <div className="flex items-center h-8 lg:order-2">
            {loginIsIntialized ? (
              userInfo?.user_name ? (
                <AvatarButton />
              ) : (
                <Link
                  to="/login"
                  className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-[6px] lg:py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  로그인
                </Link>
              )
            ) : null}

            <button
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <GiHamburgerMenu />
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  to="/ready"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  학습방
                </Link>
              </li>
              <li>
                <Link
                  to="/ready"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  복습방
                </Link>
              </li>
              <li>
                <Link
                  to="/ready"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  기록방
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
