import { cn } from '@/utils/cn';

const Skeleton = props => {
  const { className } = props;
  return (
    <div className="animate-pulse flex">
      <div className={cn('bg-slate-200', className)}></div>
    </div>
  );
};

export default Skeleton;
