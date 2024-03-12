import React, { useTransition } from 'react';
import Spinner from '@/components/common/Spinner';
import { cn } from '@/utils/cn';

const Button = props => {
  const { className, onClick, children } = props;
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        'flex-shrink-0 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-2.5 text-center flex justify-center items-center',
        className,
      )}
    >
      {children}
    </button>
  );
};

export const SubmitButton = props => {
  const { className, onClick, children } = props;
  return (
    <button
      onClick={onClick}
      type="submit"
      className={cn(
        'flex-shrink-0 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-2.5 text-center flex justify-center items-center',
        className,
      )}
    >
      {children}
    </button>
  );
};

export const LoadingButton = props => {
  const { className, onClick, fetch, key, children } = props;
  const [isPending, startTransition] = useTransition();

  const handleClick = e => {
    startTransition(() => {
      onClick(e);
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      type="button"
      className={cn(
        'flex-shrink-0 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-2.5 text-center flex justify-center items-center',
        className,
      )}
    >
      {isPending ? <Spinner /> : children}
    </button>
  );
};

export default Button;
