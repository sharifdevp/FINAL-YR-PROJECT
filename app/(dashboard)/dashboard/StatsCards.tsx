import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HiArrowNarrowDown, HiArrowNarrowUp } from 'react-icons/hi';
import dynamic from 'next/dynamic';
import { createElement } from 'react';
import { MdCheckCircle } from 'react-icons/md'; // Import the icon

type IconKeys =
  | 'TbListCheck'
  | 'HiOutlineUserGroup'
  | 'RiCalendarEventLine'
  | 'MdOutlineBalance'
  | 'MdOutlinePending'
  | 'MdCheckCircle'; // Add the new icon key

interface StatsCardData {
  key: string;
  title: string;
  change: number;
  value: number;
  icon: IconKeys;
}

interface StatsCardsProps {
  data: StatsCardData[];
}

const iconComponents: Record<IconKeys, React.ComponentType<any>> = {
  TbListCheck: dynamic(() =>
    import('react-icons/tb').then((mod) => mod.TbListCheck)
  ),
  HiOutlineUserGroup: dynamic(() =>
    import('react-icons/hi2').then((mod) => mod.HiOutlineUserGroup)
  ),
  RiCalendarEventLine: dynamic(() =>
    import('react-icons/ri').then((mod) => mod.RiCalendarEventLine)
  ),
  MdOutlineBalance: dynamic(() =>
    import('react-icons/md').then((mod) => mod.MdOutlineBalance)
  ),
  MdOutlinePending: dynamic(() =>
    import('react-icons/md').then((mod) => mod.MdOutlinePending)
  ),
  MdCheckCircle: dynamic(
    () => import('react-icons/md').then((mod) => mod.MdCheckCircle) // Add the icon component
  ),
};

const StatsCards: React.FC<StatsCardsProps> = ({ data }) => {
  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
      {data.map((stat) => {
        const IconComponent = iconComponents[stat.icon];
        return (
          <Card key={stat.key} className='p-6'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
              <CardTitle className='text-lg font-medium'>
                {stat.title}
              </CardTitle>
              {IconComponent &&
                createElement(IconComponent, {
                  size: 32,
                })}
            </CardHeader>
            <CardContent>
              <div className='text-4xl font-bold'>{stat.value}</div>
              <p className='text-sm text-muted-foreground'>
                <span className='flex items-center'>
                  {stat.change > 0 ? (
                    <HiArrowNarrowUp className='text-green-600 ' size={20} />
                  ) : (
                    <HiArrowNarrowDown className='text-red-600 ' size={20} />
                  )}
                  {stat.change}
                </span>
                from last month up to now
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;

// // StatsCards.tsx
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { HiArrowNarrowDown, HiArrowNarrowUp } from 'react-icons/hi';
// import dynamic from 'next/dynamic';
// import { createElement } from 'react';

// type IconKeys =
//   | 'TbListCheck'
//   | 'HiOutlineUserGroup'
//   | 'RiCalendarEventLine'
//   | 'MdOutlineBalance';

// interface StatsCardData {
//   key: string;
//   title: string;
//   change: number;
//   value: number;
//   icon: IconKeys;
// }

// interface StatsCardsProps {
//   data: StatsCardData[];
// }

// const iconComponents: Record<IconKeys, React.ComponentType<any>> = {
//   TbListCheck: dynamic(() =>
//     import('react-icons/tb').then((mod) => mod.TbListCheck)
//   ),
//   HiOutlineUserGroup: dynamic(() =>
//     import('react-icons/hi2').then((mod) => mod.HiOutlineUserGroup)
//   ),
//   RiCalendarEventLine: dynamic(() =>
//     import('react-icons/ri').then((mod) => mod.RiCalendarEventLine)
//   ),
//   MdOutlineBalance: dynamic(() =>
//     import('react-icons/md').then((mod) => mod.MdOutlineBalance)
//   ),
// };

// const StatsCards: React.FC<StatsCardsProps> = ({ data }) => {
//   return (
//     <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
//       {data.map((stat) => {
//         const IconComponent = iconComponents[stat.icon];
//         return (
//           <Card key={stat.key}>
//             <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
//               <CardTitle className='text-sm font-medium'>
//                 {stat.title}
//               </CardTitle>
//               {IconComponent &&
//                 createElement(IconComponent, {
//                   size: 24,
//                 })}
//             </CardHeader>
//             <CardContent>
//               <div className='text-2xl font-bold'>{stat.value}</div>
//               <p className='text-xs text-muted-foreground'>
//                 <span className='flex items-center'>
//                   {' '}
//                   {stat.change > 0 ? (
//                     <HiArrowNarrowUp className='text-green-600 ' size={16} />
//                   ) : (
//                     <HiArrowNarrowDown className='text-red-600 ' size={16} />
//                   )}{' '}
//                   {stat.change}{' '}
//                 </span>{' '}
//                 from last month
//               </p>
//             </CardContent>
//           </Card>
//         );
//       })}
//     </div>
//   );
// };

// export default StatsCards;
