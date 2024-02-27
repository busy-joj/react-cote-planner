import React from 'react';

const ValidateMessage = ({ children }) => {
  return (
    <p className="absolute text-xs pt-[1px] pl-[2px] text-red-600">
      {children}
    </p>
  );
};

export default ValidateMessage;
