import Container from '@/components/Common/Container';
import AddLeaveType from './AddLeaveType';
import LeaveTypesTable from './leaveTypesTable';
// import { getLeaveTypesData } from '@/lib/data/getLeaveTypesData';

const LeaveTypes = async () => {
  // const LeaveType = await getLeaveTypesData();

  return (
    <Container>
      <div>
        <div className=' my-4 py-6 rounded-md bg-white dark:bg-black'>
          <h2 className='text-xl text-center font-extrabold leading-tight  lg:text-2xl'>
            Leave Types
          </h2>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
          <AddLeaveType />
          <div className='col-span-2'>
            {/* <LeaveTypesTable leaveTypes={LeaveType} /> */}
            <LeaveTypesTable />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LeaveTypes;
