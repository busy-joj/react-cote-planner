import React from 'react';
import mainBanner from '@/assets/landing.png';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  return (
    <div className="w-[1200px] my-0 mx-auto pt-[60px] flex flex-col h-screen">
      <div className="text-center py-6 w-4/5 mx-auto">
        <img src={mainBanner} className="inline-block" alt="" />
        <SearchBar />
      </div>
    </div>
  );
};

export default HomePage;
