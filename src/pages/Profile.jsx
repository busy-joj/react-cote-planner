import React from 'react';
import Contribution from '@/components/Contribution';
import Table from '@/components/Table';
import ProfileCard from '@/components/ProfileCard';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const params = useParams();
  return (
    <div className="lg:w-[1200px] my-0 mx-auto pt-[60px] px-[16px] lg:px-0">
      <ProfileCard />
      <Contribution params={params} />
      {/* <Table params={params} /> */}
    </div>
  );
};

export default ProfilePage;
