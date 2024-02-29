import React from 'react';
import SignLayout from '../components/SignLayout';

const SignUpConfirm = () => {
  return (
    <SignLayout>
      <p className="text-center leading-6">
        회원가입 인증 메일이 발송되었습니다. <br />
        메일 발송에 약 5분 내외 소요됩니다.
        <br /> 인증 메일 확인 후 로그인 가능합니다.
      </p>
    </SignLayout>
  );
};

export default SignUpConfirm;
