import React from 'react';
import SignLayout from '../components/SignLayout';
import { Link, useParams } from 'react-router-dom';

const Confirm = () => {
  const { state } = useParams();
  const TextType = [
    {
      type: 'updatePassword',
      text: '비밀번호 변경이 완료되었습니다.',
      confirm: '확인',
      redirectUrl: '/login',
    },
    {
      type: 'resetPassword',
      text: `비밀번호 설정 메일이 전송되었습니다💌\n메일을 확인해주세요.\n(메일 발송에 약 5분 내외 소요됩니다.)`,
      confirm: null,
      redirectUrl: '/',
    },
    {
      type: 'error',
      text: `요청에 실패했습니다.\n잠시 후에 시도해주세요😥`,
      confirm: '확인',
      redirectUrl: '/',
    },
  ];
  const content = TextType.filter(v => v.type === state)[0];
  return (
    <SignLayout>
      <p className="text-center leading-6 whitespace-break-spaces">
        {content.text}
      </p>
      {content.confirm !== null && (
        <Link
          to={content.redirectUrl}
          className="flex-shrink-0 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-2.5 text-center flex justify-center items-center bg-primary-600 w-1/4 mt-4 mx-auto"
        >
          {content.confirm}
        </Link>
      )}
    </SignLayout>
  );
};

export default Confirm;
