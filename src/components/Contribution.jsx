import { Suspense } from 'react';
import { DEFAULT_MONTH_LABELS } from '@/assets/constants';
import {
  getAllActivities,
  getMonthLabels,
  groupDatesByWeeks,
} from '@/utils/contribution';
import NewdayActivity from '@/components/NewdayActivity';
import Skeleton from '@/components/Skeleton';

const ActivityLoading = () => {
  return (
    <>
      <tr className="py-4 relative h-[136px]">
        <td>
          <Skeleton className="absolute w-full h-full rounded" />
        </td>
      </tr>
    </>
  );
};

const Contribution = ({ params }) => {
  const allActivities = getAllActivities();
  const weeks = groupDatesByWeeks(allActivities);
  const monthLabel = getMonthLabels(weeks, DEFAULT_MONTH_LABELS);

  return (
    <div className="relative py-8">
      <h2 className="font-bold mb-3 text-xl">Activities</h2>
      <div className="shadow-md sm:rounded-lg p-8">
        <table className="w-full border-spacing-1 border-separate">
          <thead className="text-xs text-gray-700">
            <tr>
              <th className="text-transparent text-left opacity-0">요일</th>
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
          <tbody>
            <Suspense fallback={<ActivityLoading />}>
              <NewdayActivity allActivities={allActivities} params={params} />
            </Suspense>
          </tbody>
        </table>
        <div className="flex gap-[3px] pt-3 justify-end items-center">
          <span className="text-gray-400 text-sm">Bad</span>
          <span className="w-4 h-4 rounded-tl-full rounded-br-full bg-bad-4-full inline-block"></span>
          <span className="w-4 h-4 rounded-tl-full rounded-br-full bg-bad-3-full inline-block"></span>
          <span className="w-4 h-4 rounded-tl-full rounded-br-full bg-bad-2-full inline-block"></span>
          <span className="w-4 h-4 rounded-tl-full rounded-br-full bg-bad-1-full inline-block"></span>
          <span className="w-4 h-4 rounded-tl-full rounded-br-full bg-empty-full inline-block"></span>
          <span className="w-4 h-4 rounded-tl-full rounded-br-full bg-good-1-full inline-block"></span>
          <span className="w-4 h-4 rounded-tl-full rounded-br-full bg-good-2-full inline-block"></span>
          <span className="w-4 h-4 rounded-tl-full rounded-br-full bg-good-3-full inline-block"></span>
          <span className="w-4 h-4 rounded-tl-full rounded-br-full bg-good-4-full inline-block"></span>
          <span className="text-gray-400 text-sm">Good</span>
        </div>
      </div>
    </div>
  );
};

export default Contribution;
