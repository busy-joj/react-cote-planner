import React from 'react';
import { cn } from '@/utils/cn';

const ValidateMessage = props => {
  const { className, children } = props;

  return (
    <p
      className={cn(
        'absolute text-xs pt-[1px] pl-[2px] text-red-600',
        className,
      )}
    >
      {children}
    </p>
  );
};

export default ValidateMessage;
