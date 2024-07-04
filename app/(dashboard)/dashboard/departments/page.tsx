import Container from '@/components/Common/Container';
import AddDepartment from './AddDepartment';
import DepartmentsTable from './DepartmentsTable';

const Department = async () => {
  return (
    <Container>
      <div>
        <div className='my-4 py-6 rounded-md bg-white dark:bg-black'>
          <h2 className='text-xl text-center font-extrabold leading-tight lg:text-2xl'>
            Departments
          </h2>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
          <AddDepartment />
          <div className='col-span-2'>
            <DepartmentsTable />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Department;
