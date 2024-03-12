import { userStore } from '../store';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import DonutChart from './DonutChart';

const ProfileCard = () => {
  const { userInfo } = userStore();
  const params = useParams();
  if (userInfo == null) {
    return;
  }
  return (
    <section className="flex justify-between py-8">
      <article className="w-1/3">
        <picture>
          {userInfo.avatar_url ? (
            <img
              src={userInfo.avatar_url}
              alt="프로필 사진"
              className="rounded-full object-contain max-h-[100px] bg-gray-300"
              width={100}
              height={100}
            />
          ) : (
            <div className="w-[100px] h-[100px] bg-gray-300 rounded-full"></div>
          )}
        </picture>
        <div className="">
          <h1 className="font-bold text-3xl mb-3">
            {userInfo.user_name ?? 'Guest'}
          </h1>
          <p className="text-gray-500 mb-4 text-base">
            {params.id || userInfo.user_name}
          </p>
          {userInfo.user_name ? null : (
            <div className="border border-solid rounded-xl p-3.5 text-base border-gray-300 w-full">
              <Link to="/login">카카오 연동하고 나만의 PT를 받아보세요.</Link>
            </div>
          )}
        </div>
      </article>
      <article className="w-1/3 h-60 bg-profileCard-study rounded-xl font-bold text-white p-8 mx-6">
        <p>학습일</p>
        <div className="flex justify-center items-center h-full">
          <p className="text-3xl">0일 / 365일</p>
        </div>
      </article>
      <article className="w-1/3 h-60 bg-profileCard-review rounded-xl font-bold text-white p-8">
        <p>복습력</p>
        <div className="flex justify-around items-center h-full">
          <DonutChart
            width={100}
            height={100}
            value={60}
            innerRadius={40}
            outerRadius={49}
          />
          <ul className="list-disc text-base">
            <li>문제 해결 100문제</li>
            <li>복습 6문제</li>
          </ul>
        </div>
      </article>
    </section>
  );
};

export default ProfileCard;
