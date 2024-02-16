import axios from 'axios';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../reducer/userSlice';

import { supabaseClient } from '../supabase/client';

const LoginPage = () => {
  const inputID = useRef(null);
  const inputPW = useRef(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLoginSubmit = e => {
    e.preventDefault();
    // const signupHandler = async () => {
    //   e.preventDefault();
    //   try {
    //     const { data, error } = await supabase.auth.signUp({
    //       email,
    //       password,
    //     });
    //     console.log(data);
    //     if (error) console.error(error);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    const checkID = async () => {
      await axios
        .get(
          `${import.meta.env.VITE_SERVER_URL}login?userId=${
            inputID.current.value
          }`,
        )
        .then(res => {
          const code = res.data;
          if (code === 404 || code === 403 || code === 401 || code === 402) {
            alert('ID를 정확히 입력하세요');
          } else if (code === 200) {
            alert('로그인 성공');
            dispatch(loginUser({ userID: inputID.current.value }));
            navigate('/');
          }
        })
        .catch(error => {
          console.log('Error', error);
        });
    };
    checkID();
  };
  // const handleLogin = async e => {
  //   e.preventDefault();
  //   try {
  //     const { data, error } = await supabaseClient.auth.signInWithPassword({
  //       email: inputID.current.value,
  //       password: inputPW.current.value,
  //     });
  //     if (error) console.error(error);
  //     navigate('/');
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleLoginKakao = async e => {
    e.preventDefault();
    try {
      const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'kakao',
      });
      if (error) console.error(error);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              <Link
                to="/"
                className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
              >
                💪코테PT
              </Link>
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <input
                  ref={inputID}
                  type="text"
                  name="userID"
                  id="userID"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="아이디 혹은 이메일을 입력해주세요"
                  required=""
                />
              </div>
              <div>
                <input
                  ref={inputPW}
                  type="password"
                  name="userPW"
                  id="userPW"
                  placeholder="비밀번호를 입력해주세요"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      로그인 상태 유지
                    </label>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLoginKakao}
                type="submit"
                className="w-full text-[#000000] text-opacity-85 bg-[#FEE500] focus:ring-4 focus:outline-none font-bold rounded-lg text-sm px-5 py-2.5 text-center relative after:absolute after:content-[''] after:bg-kakao-symbol after:w-6 after:h-[40px] after:bg-contain after:bg-center after:bg-no-repeat after:left-[15px] after:top-0 after:bottom-0"
              >
                카카오 로그인
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 flex gap-6 justify-center">
                <a
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:underline dark:text-primary-500 relative after:content-['|'] after:absolute after:top-[-1.5px] after:right-[-14px]"
                >
                  비밀번호 찾기
                </a>
                <a
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:underline dark:text-primary-500 relative after:content-['|'] after:absolute after:top-[-1.5px] after:right-[-14px]"
                >
                  아이디 찾기
                </a>
                <Link
                  to="/signUp"
                  className="font-medium text-gray-500 hover:underline dark:text-primary-500"
                >
                  회원가입
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
