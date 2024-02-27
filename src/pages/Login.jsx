import axios from 'axios';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../reducer/userSlice';

import { supabaseClient } from '../supabase/client';
import SignLayout from '../components/SignLayout';

const LoginPage = () => {
  const inputID = useRef(null);
  const inputPW = useRef(null);

  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: inputID.current.value,
        password: inputPW.current.value,
      });
      if (error) console.error(error);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

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
    <SignLayout>
      <form className="space-y-4 md:space-y-6" action="#">
        <div className="border-b-[1px] border-gray-300 border-solid relative bottom-0 left-0 pb-6 after:absolute after:content-['OR'] after:bottom-0 after:left-[50%] after:translate-y-[50%] after:translate-x-[-50%] after:leading-[10px] after:bg-white after:text-gray-400 after:px-2 after:text-sm">
          <button
            onClick={handleLoginKakao}
            className="w-full text-[#000000] text-opacity-85 bg-[#FEE500] focus:ring-4 focus:outline-none font-bold rounded-lg text-sm px-5 py-2.5 text-center relative after:absolute after:content-[''] after:bg-kakao-symbol after:w-6 after:h-[40px] after:bg-contain after:bg-center after:bg-no-repeat after:left-[15px] after:top-0 after:bottom-0"
          >
            카카오 로그인
          </button>
        </div>
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
        <button
          onClick={handleLogin}
          type="submit"
          className="w-full bg-primary-500 text-white text-opacity-85  focus:ring-4 focus:outline-none font-bold rounded-lg text-sm px-5 py-2.5 text-center relative"
        >
          로그인
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
            to="/signup"
            className="font-medium text-gray-500 hover:underline dark:text-primary-500"
          >
            회원가입
          </Link>
        </p>
      </form>
    </SignLayout>
  );
};

export default LoginPage;
