import React from 'react';
import Contribution from '@/components/Contribution';
import Table from '@/components/Table';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const params = useParams();
  return (
    <div className="w-[1200px] my-0 mx-auto pt-[60px]">
      <Contribution params={params} />
      <Table params={params} />
    </div>
  );
};

export default ProfilePage;
