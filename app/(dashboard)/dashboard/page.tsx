'use client';

import Container from '@/components/Common/Container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MonthDateRangePicker } from './MonthDateRangePicker';
import StatsCards from './StatsCards';
import { useEffect, useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';

const Dashboard = () => {
  const [statsData, setStatsData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch('/api/dashboard-stats');
      const data = await response.json();
      setStatsData(data);
    };

    fetchStats();
  }, []);

  return (
    <Container>
      <div className='flex flex-col md:flex-row py-6 items-center justify-between'>
        <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
      </div>
      <div className='flex flex-col mt-4 mb-8'>
        <div className='flex justify-between items-center'>
          <Link href='/dashboard/report'>
            <Button size='lg' data-tip='Click to view reports related to leave'>
              Leave Reports
            </Button>
          </Link>
          {/* <ReactTooltip /> */}
        </div>
        <div className='mt-4 flex justify-end'>
          <MonthDateRangePicker />
        </div>
      </div>
      <StatsCards data={statsData} />
    </Container>
  );
};

export default Dashboard;

// 'use client';
// import Container from '@/components/Common/Container';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import { MonthDateRangePicker } from './MonthDateRangePicker';
// import StatsCards from './StatsCards';
// import { useEffect, useState } from 'react';

// const Dashboard = () => {
//   const [statsData, setStatsData] = useState([]);

//   useEffect(() => {
//     const fetchStats = async () => {
//       const response = await fetch('/api/dashboard-stats');
//       const data = await response.json();
//       setStatsData(data);
//     };

//     fetchStats();
//   }, []);

//   return (
//     <Container>
//       <div className='flex flex-col md:flex-row py-6 items-center justify-between '>
//         <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
//         <div className='flex items-center space-x-2'>
//           <MonthDateRangePicker />
//         </div>
//       </div>
//       <StatsCards data={statsData} />
//       <div>
//         <Link href='dashboard/report'>
//           <Button>Leave Reports</Button>
//         </Link>
//       </div>
//     </Container>
//   );
// };

// export default Dashboard;
