import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userStore } from '../store';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { FaUserAlt } from 'react-icons/fa';
import { handleLogOut } from '../utils/logout';

const AvatarButton = () => {
  const { userInfo, deleteUserInfo } = userStore();
  const navigate = useNavigate();
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useOnClickOutside(ref, () => setVisible(false));

  return (
    <div id="header-profile" className="relative left-0 top-0" ref={ref}>
      <button
        className="inline-block text-gray-700 w-8 h-8 rounded-full bg-gray-300 overflow-hidden"
        onClick={() => setVisible(!visible)}
      >
        {userInfo.avatar_url ? (
          <img
            src={userInfo.avatar_url}
            className="w-full"
            alt={`${userInfo.user_name}님의 프로필 사진`}
          />
        ) : (
          <FaUserAlt className="w-full fill-white" />
        )}
      </button>
      {visible && (
        <ul className="absolute w-[150px] right-0 top-[100%] bg-white rounded-lg drop-shadow-md flex flex-col text-sm mt-1 overflow-hidden">
          <li className="text-center border-b-[1px] border-gray-100 border-solid px-4 py-3">
            {userInfo.user_name}
          </li>
          <li className=" hover:bg-gray-50">
            <Link to={`/profile`} className="px-4 py-3 w-full inline-block">
              마이페이지
            </Link>
          </li>
          <li className=" hover:bg-gray-50">
            <button
              className="px-4 py-3 w-full text-left"
              onClick={e => handleLogOut(e, deleteUserInfo, navigate)}
            >
              로그아웃
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default AvatarButton;
