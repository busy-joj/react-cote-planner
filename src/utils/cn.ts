import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: string[]) => {
  console.log(inputs)
  return twMerge(clsx(inputs));
};
