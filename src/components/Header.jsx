// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { userStore } from '@/store';
import { defaultInstance } from '@/apis';
import { getBackjoonSolvedData } from '@/apis/crawling/backjoon';
import { GiHamburgerMenu } from 'react-icons/gi';
import AvatarButton from './AvatarButton';
import { supabaseClient } from '../supabase/client';
import { useQueryClient } from '@tanstack/react-query';

const Header = () => {
  const { pathname } = useLocation();
  const { userInfo, setUserInfo } = userStore();
  const baekjoonData = useRef();
  const queryClient = useQueryClient();

  const [loginIsIntialized, setLoginIsIntialized] = useState(false);

  useEffect(() => {
    let timeoutId;
    supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const data = session.user.user_metadata;
        setUserInfo(data);
        if (!baekjoonData.current) {
          // setTimeout으로 한 이유는 onAuthStateChange와 데드락을 피하기 위해 사용
          timeoutId = setTimeout(async () => {
            let { data: baekjoon, error } = await supabaseClient
              .from('baekjoon')
              .select('solved_recent')
              .eq('id', session.user.user_metadata.baekjoon_id);
            baekjoonData.current = baekjoon[0].solved_recent;
            // baekjoon 테이블에 있는 solved_recent 컬럼을 조회 후 없으면 크롤링
            // session에 baekjoon_id가 존재해야함
            if (
              session.user.user_metadata.baekjoon_id &&
              !baekjoon[0].solved_recent
            ) {
              const crawling = await queryClient.fetchQuery({
                queryKey: ['solved', session.user.user_metadata.baekjoon_id],
                queryFn: () =>
                  defaultInstance
                    .get(
                      `achievement?id=${session.user.user_metadata.baekjoon_id}`,
                    )
                    .then(res => {
                      return {
                        ...res.data,
                        solved_problem: getBackjoonSolvedData(
                          res.data.solved_problem,
                        ),
                      };
                    }),
              });
              // 크롤링한 데이터를 가지고 baekjoon 테이블 업데이트
              const { data: updateData, error } = await supabaseClient
                .from('baekjoon')
                .update({
                  solved_problem: crawling.solved_problem,
                  solved_count: crawling.solved_count,
                  solved_recent: crawling.solved_recent,
                })
                .eq('id', session.user.user_metadata.baekjoon_id)
                .select();
            }
          }, 0);
        }
      } else if (event === 'SIGNED_OUT') {
        [window.localStorage, window.sessionStorage].forEach(storage => {
          Object.entries(storage).forEach(([key]) => {
            storage.removeItem(key);
          });
        });
      }
      setLoginIsIntialized(true);
    });
    return () => clearTimeout(timeoutId);
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
              userInfo.user_name ? (
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
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  학습방
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  복습방
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  기록방
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
