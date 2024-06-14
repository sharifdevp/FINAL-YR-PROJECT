import Container from '@/components/Common/Container';
import AddOrgnTitle from './AddOrgnTitle';
import OrgnTitlesTable from './OrgnTitlesTable';


const OrgnTitlePage = async () => {
  return (
    <Container>
      <div>
        <div className='my-4 py-6 rounded-md bg-white dark:bg-black'>
          <h2 className='text-xl text-center font-extrabold leading-tight lg:text-2xl'>
            Organization Titles
          </h2>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
          <AddOrgnTitle />
          <div className='col-span-2'>
            <OrgnTitlesTable />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OrgnTitlePage;

// import Container from '@/components/Common/Container';
// import AddDepartment from './AddOrgnTitle';
// import DepartmentsTable from './OrgnTitlesTable';

// // Fetch departments data from the API
// const fetchDepartments = async () => {
//   const res = await fetch('http://localhost:3000/api/orgn-title/orgn-titleId'); // Ensuring the URL is correct
//   if (!res.ok) {
//     throw new Error('Failed to organisation Titles');
//   }
//   const departments = await res.json();
//   return departments;
// };

// const Department = async () => {
//   const departments = await fetchDepartments(); // Fetch departments data
//   console.log(departments); // Debugging line to check the structure of departments

//   return (
//     <Container>
//       <div>
//         <div className='my-4 py-6 rounded-md bg-white dark:bg-black'>
//           <h2 className='text-xl text-center font-extrabold leading-tight lg:text-2xl'>
//             Departments Settings
//           </h2>
//         </div>
//         <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
//           <AddDepartment />
//           <div className='col-span-2'>
//             <DepartmentsTable departments={departments} />
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default Department;
