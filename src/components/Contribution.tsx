import { Suspense } from 'react';
import { DEFAULT_MONTH_LABELS } from '@/assets/constants';
import {
  getAllActivities,
  getMonthLabels,
  groupDatesByWeeks,
} from '@/utils/contribution';
import NewdayActivity from '@/components/NewdayActivity';
import Skeleton from '@/components/Skeleton';
import Table from '@/components/Table';
import { useSearchParams } from 'react-router-dom';

const ActivityLoading = () => {
  return (
    <>
      <tr className="relative h-[136px] py-4">
        <td>
          <Skeleton className="absolute h-full w-full rounded" />
        </td>
      </tr>
    </>
  );
};

interface IProps {
  params: {
    id: string;
  };
}

const Contribution = ({ params }: IProps) => {
  const allActivities = getAllActivities();
  const weeks = groupDatesByWeeks(allActivities);
  const monthLabel = getMonthLabels(weeks, DEFAULT_MONTH_LABELS);
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="relative py-8">
      <h2 className="mb-3 text-base font-bold lg:text-xl">Activities</h2>
      <div className="overflow-x-scroll p-4 shadow-md sm:rounded-lg lg:overflow-auto lg:p-8">
        <table className="w-max border-separate border-spacing-1 lg:w-full">
          <thead className="text-xs text-gray-700">
            <tr>
              <th className="text-left text-transparent opacity-0">요일</th>
              {monthLabel.map(({ weekIndex, label }) => {
                return (
                  <th
                    scope="col"
                    colSpan={weekIndex}
                    key={label}
                    className="text-left"
                  >
                    {label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody
            onClick={(
              e: React.MouseEvent<HTMLTableSectionElement, MouseEvent>,
            ) => {
              const target = e.target as HTMLElement; // HTMLElement로 타입 단언
              searchParams.set('sort', target.dataset.date || '');
              setSearchParams(searchParams);
            }}
          >
            <Suspense fallback={<ActivityLoading />}>
              <NewdayActivity allActivities={allActivities} params={params} />
            </Suspense>
          </tbody>
        </table>
        <div className="flex items-center gap-[3px] pt-3 lg:justify-end">
          <span className="text-sm text-gray-400">Bad</span>
          <span className="inline-block h-4 w-4 rounded-br-full rounded-tl-full bg-bad-4-full"></span>
          <span className="inline-block h-4 w-4 rounded-br-full rounded-tl-full bg-bad-3-full"></span>
          <span className="inline-block h-4 w-4 rounded-br-full rounded-tl-full bg-bad-2-full"></span>
          <span className="inline-block h-4 w-4 rounded-br-full rounded-tl-full bg-bad-1-full"></span>
          <span className="inline-block h-4 w-4 rounded-br-full rounded-tl-full bg-empty-full"></span>
          <span className="inline-block h-4 w-4 rounded-br-full rounded-tl-full bg-good-1-full"></span>
          <span className="inline-block h-4 w-4 rounded-br-full rounded-tl-full bg-good-2-full"></span>
          <span className="inline-block h-4 w-4 rounded-br-full rounded-tl-full bg-good-3-full"></span>
          <span className="inline-block h-4 w-4 rounded-br-full rounded-tl-full bg-good-4-full"></span>
          <span className="text-sm text-gray-400">Good</span>
        </div>
      </div>
      <div>
        <Table params={params} />
      </div>
    </div>
  );
};

export default Contribution;
