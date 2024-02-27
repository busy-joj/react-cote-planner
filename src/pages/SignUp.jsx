import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { supabaseClient } from '../supabase/client';

import SignLayout from '../components/SignLayout';
import Spinner from '../components/Spinner';
import ValidateMessage from '../components/ValidateMessage';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [baekjoonValidation, setBaekjoonValidation] = useState({
    isLoading: false,
    checked: false,
    text: 'Check',
  });
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm({ mode: 'onChange' });
  const onSubmit = data => {
    if (!baekjoonValidation.checked) {
      inputBaekjoonID.current.focus();
      return;
    }
    HandleSignUp(data);
  };

  const handleBaekjoonValidation = async e => {
    e.preventDefault();
    const baekjoonID = getValues('baekjoonID');
    setBaekjoonValidation({
      ...baekjoonValidation,
      isLoading: true,
    });
    await axios
      .get(`${import.meta.env.VITE_SERVER_URL}login?userId=${baekjoonID}`)
      .then(res => {
        const code = res.data;
        console.log(code);
        if (code === 404 || code === 403 || code === 401 || code === 402) {
          setBaekjoonValidation({
            ...baekjoonValidation,
            text: 'Failed',
            checked: false,
          });
        } else if (code === 200) {
          setBaekjoonValidation({
            ...baekjoonValidation,
            text: 'Checked',
            checked: true,
          });
        }
      })
      .catch(error => {
        console.log('Error', error);
      });
  };

  const HandleSignUp = async inputData => {
    const { email, pw, username, BaekjoonID } = inputData;
    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: pw,
        options: {
          data: {
            user_name: username,
            avatar_url: null,
            BaekjoonID: BaekjoonID,
          },
        },
      });
      if (error) console.error(error);
      navigate('/signup/confirm');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SignLayout>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            이메일
          </label>
          <input
            type="email"
            name="email"
            id="email"
            {...register('email', {
              required: '이메일을 입력하세요',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '이메일 형식으로 작성하세요',
              },
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
          />
          {errors.email && (
            <ValidateMessage>{errors.email.message}</ValidateMessage>
          )}
        </div>
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            이름
          </label>
          <input
            type="text"
            name="username"
            id="username"
            {...register('username', {
              required: '이름을 입력하세요',
              maxLength: 20,
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="이름을 입력하세요"
          />
          {errors.username && (
            <ValidateMessage>{errors.username.message}</ValidateMessage>
          )}
        </div>
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Baekjoon ID
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              name="baekjoonID"
              id="baekjoonID"
              {...register('baekjoonID', {
                required: 'baekjoonID를 입력하세요',
                validate: value =>
                  value !== null && baekjoonValidation.checked
                    ? true
                    : 'baekjoonID를 확인하세요',
              })}
              className="bg-gray-50 border flex-grow-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Baekjoon 아이디를 입력하세요"
              required=""
            />
            <button
              onClick={handleBaekjoonValidation}
              className="flex-shrink-0 text-white w-1/5 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-center items-center"
            >
              {baekjoonValidation.isLoading ? (
                <Spinner className="w-4 h-4" />
              ) : (
                `${baekjoonValidation.text}`
              )}
            </button>
          </div>
          {!baekjoonValidation.checked && errors.baekjoonID && (
            <ValidateMessage>{errors.baekjoonID.message}</ValidateMessage>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            비밀번호
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••••"
            {...register('pw', {
              required: '비밀번호를 입력하세요',
              pattern: {
                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/,
                message:
                  '비밀번호는 8자 이상, 대문자/소문자/특수문자 모두 포함되어야 합니다.',
              },
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.pw && <ValidateMessage>{errors.pw.message}</ValidateMessage>}
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            비밀번호 확인
          </label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="••••••••••"
            {...register('confirmPw', {
              require: '비밀번호를 확인하세요',
              validate: {
                matchPassword: value => {
                  const { pw } = getValues();
                  return pw === value || '비밀번호가 일치하지 않습니다';
                },
              },
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
          />
          {errors.confirmPw && (
            <ValidateMessage>{errors.confirmPw.message}</ValidateMessage>
          )}
        </div>
        <button
          type="submit"
          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Create an account
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Login here
          </Link>
        </p>
      </form>
    </SignLayout>
  );
};

export default SignUpPage;
