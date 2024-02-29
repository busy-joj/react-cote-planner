import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { supabaseClient } from '../supabase/client';

import SignLayout from '../components/SignLayout';
import Spinner from '../components/common/Spinner';
import ValidateMessage from '../components/common/ValidateMessage';
import Button, { SubmitButton } from '../components/common/Button';
import Input, { LabelInput, Label } from '../components/common/Input';

const SignUpPage = () => {
  const navigate = useNavigate();
  const checkChangeRef = useRef(null);
  const [baekjoonValidation, setBaekjoonValidation] = useState({
    isLoading: false,
    checked: false,
    text: '인증',
  });
  const {
    register,
    formState: { errors },
    getValues,
    setFocus,
    setError,
    handleSubmit,
  } = useForm({ mode: 'onChange' });
  const onSubmit = data => {
    // 백준ID 인증 안했을 경우
    if (!baekjoonValidation.checked) {
      setFocus('baekjoonID');
      return;
    }
    // 백준ID 인증 후 백준ID를 수정하여 재인증 필요한 경우
    if (checkChangeRef.current !== data.baekjoonID) {
      setBaekjoonValidation({
        ...baekjoonValidation,
        checked: false,
        text: '인증',
      });
      setFocus('baekjoonID');
      setError('baekjoonID', {
        type: 'recheck',
        message: 'BeakjoonID를 다시 작성하셨군요! 다시 인증해주세요:)',
      });
      return;
    }
    HandleSignUp(data);
  };

  const handleBaekjoonValidation = async e => {
    e.preventDefault();
    const baekjoonID = getValues('baekjoonID');
    checkChangeRef.current = baekjoonID;
    setBaekjoonValidation({
      ...baekjoonValidation,
      isLoading: true,
    });
    await axios
      .get(`${import.meta.env.VITE_SERVER_URL}login?userId=${baekjoonID}`)
      .then(res => {
        const code = res.data;
        if (code === 404 || code === 403 || code === 401 || code === 402) {
          setBaekjoonValidation({
            ...baekjoonValidation,
            text: '실패',
            checked: false,
          });
        } else if (code === 200) {
          setBaekjoonValidation({
            ...baekjoonValidation,
            text: '성공',
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
          <LabelInput
            id="email"
            name="email"
            type="email"
            placeholder="name@company.com"
            {...register('email', {
              required: '이메일을 입력해주세요',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '이메일 형식으로 작성해주실래요?',
              },
            })}
          >
            이메일
          </LabelInput>
          {errors.email && (
            <ValidateMessage>{errors.email.message}</ValidateMessage>
          )}
        </div>
        <div>
          <LabelInput
            id="username"
            name="username"
            type="text"
            placeholder="이름을 입력해주세요"
            {...register('username', {
              required: '이름을 입력해주세요',
              maxLength: 20,
            })}
          >
            이름
          </LabelInput>
          {errors.username && (
            <ValidateMessage>{errors.username.message}</ValidateMessage>
          )}
        </div>
        <div>
          <Label htmlFor="baekjoonID">Baekjoon ID</Label>
          <div className="flex gap-2">
            <Input
              id="baekjoonID"
              name="baekjoonID"
              type="text"
              placeholder="BaekjoonID를 입력하세요"
              {...register('baekjoonID', {
                required: 'baekjoonID를 입력해주세요',
                validate: value =>
                  value !== null && baekjoonValidation.checked
                    ? true
                    : 'baekjoonID를 인증해주세요:)',
              })}
            />
            <Button
              onClick={handleBaekjoonValidation}
              className={`bg-primary-600 w-1/5 text-white ${
                (baekjoonValidation.text === '성공' && 'bg-lime-600') ||
                (baekjoonValidation.text === '실패' && 'bg-red-600')
              }`}
            >
              {baekjoonValidation.isLoading ? (
                <Spinner className="w-4 h-4" />
              ) : (
                `${baekjoonValidation.text}`
              )}
            </Button>
          </div>
          {!baekjoonValidation.checked && errors.baekjoonID && (
            <ValidateMessage>{errors.baekjoonID.message}</ValidateMessage>
          )}
        </div>
        <div>
          <LabelInput
            id="password"
            name="password"
            type="password"
            placeholder="••••••••••"
            {...register('pw', {
              required: '비밀번호를 입력하세요',
              validate: {
                checkMinLength: value => {
                  return value.length > 8 || '비밀번호는 8자 이상이어야 해요!';
                },
                checkInclude: value => {
                  const reg = '^(?=.*[@$!%*#?&]).{1,}$';
                  return (
                    value.match(reg) || '하나 이상의 특수문자가 포함되어야 해요'
                  );
                },
              },
            })}
          >
            비밀번호
          </LabelInput>
          {errors.pw && <ValidateMessage>{errors.pw.message}</ValidateMessage>}
        </div>
        <div>
          <LabelInput
            id="confirm-password"
            name="confirm-password"
            type="password"
            placeholder="••••••••••"
            {...register('confirmPw', {
              require: '비밀번호를 확인하세요',
              validate: {
                matchPassword: value => {
                  const { pw } = getValues();
                  return (
                    pw === value || '비밀번호가 달라요! 확인해 보시겠어요?'
                  );
                },
              },
            })}
          >
            비밀번호 확인
          </LabelInput>
          {errors.confirmPw && (
            <ValidateMessage>{errors.confirmPw.message}</ValidateMessage>
          )}
        </div>
        <SubmitButton className="w-full text-white bg-primary-600 hover:bg-primary-700">
          회원가입
        </SubmitButton>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          이미 회원이신가요?{' '}
          <Link
            to="/login"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            로그인
          </Link>
        </p>
      </form>
    </SignLayout>
  );
};

export default SignUpPage;
