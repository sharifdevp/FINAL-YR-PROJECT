import Link from 'next/link';
import { AuthForm } from './AuthForm';

const AuthComponent = () => {
  return (
    <div className='relative min-h-screen flex items-center justify-center'>
      <div
        className='absolute inset-0'
        style={{
          backgroundImage: 'url("/tp4.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1,
        }}
      >
        <div className='absolute inset-0 bg-black opacity-30' />
      </div>
      <div className='relative mx-auto flex w-full flex-col justify-center sm:w-[350px]'>
        <div
          className='p-6 space-y-6 text-center'
          style={{
            backgroundColor: '#faf3e0', // Light beige background
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
          }}
        >
          <h1 className='text-2xl font-semibold tracking-tight text-indigo-900'>
            Leave Management Portal
          </h1>
          <p className='text-sm text-teal-800'>
            Login with your work email to access your portal
          </p>
          <AuthForm />
          <p className='px-8 text-center text-sm text-gray-800'>
            By clicking continue, you agree to the company{' '}
            <Link href='/terms'>
              <span className='underline underline-offset-4 text-indigo-700 hover:text-indigo-500 transition-colors duration-300'>
                Terms of Service
              </span>
            </Link>{' '}
            and{' '}
            <Link href='/privacy'>
              <span className='underline underline-offset-4 text-indigo-700 hover:text-indigo-500 transition-colors duration-300'>
                Privacy Policy
              </span>
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;

// import Link from 'next/link';
// import { AuthForm } from './AuthForm';

// const AuthComponent = () => {
//   return (
//     <div className='relative min-h-screen flex items-center justify-center'>
//       <div
//         className='absolute inset-0'
//         style={{
//           backgroundImage: 'url("/tp4.jpg")',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           zIndex: -1,
//         }}
//       >
//         <div className='absolute inset-0 bg-black opacity-30' />
//       </div>
//       <div className='relative mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
//         <div className='flex flex-col space-y-2 text-center'>
//           <h1
//             className='text-2xl font-semibold tracking-tight'
//             style={{
//               backgroundColor: 'white',
//               padding: '10px',
//               borderRadius: '5px',
//             }}
//           >
//             Leave Management Portal
//           </h1>
//           <p className='text-sm text-yellow-300 hover:text-primary'>
//             Login with your work email to access your portal
//           </p>
//         </div>
//         <AuthForm />
//         <p className='px-8 text-center text-sm text-white'>
//           By clicking continue, you agree to the company{' '}
//           <Link
//             href='/terms'
//             className='underline underline-offset-4 hover:text-primary'
//           >
//             Terms of Service
//           </Link>{' '}
//           and{' '}
//           <Link
//             href='/privacy'
//             className='underline underline-offset-4 hover:text-primary'
//           >
//             Privacy Policy
//           </Link>
//           .
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuthComponent;

// import Link from 'next/link';
// import { AuthForm } from './AuthForm';

// const AuthComponent = () => {
//   return (
//     <div
//       className='min-h-screen flex items-center justify-center'
//       style={{
//         backgroundImage: 'url("/tp4.jpg")',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
//         <div className='flex flex-col space-y-2 text-center'>
//           <h1 className='text-2xl font-semibold tracking-tight'>
//             Leave Management Portal
//           </h1>
//           {/* text-muted-foreground */}
//           <p className='text-sm  text-blue-600 font-extrabold'>
//             Login with your <span className='text-blue-600'>w</span>
//             <span className='text-blue-600'>o</span>
//             <span className='text-white'>r</span>
//             <span className='text-white'>k</span>{' '}
//             <span className='text-black'>e</span>
//             <span className='text-black'>m</span>
//             <span className='text-black'>a</span>
//             <span className='text-black'>i</span>
//             <span className='text-white'>l</span>
//             <span className='text-white'> to</span>
//             <span className='text-black'> a</span>
//             <span className='text-black'>ccess</span> your portal
//           </p>
//         </div>
//         <AuthForm />
//         <p className='px-8 text-center text-sm text-white'>
//           By clicking continue, you agree to the company{' '}
//           <Link
//             href='/terms'
//             className='underline underline-offset-4 hover:text-primary'
//           >
//             Terms of Service
//           </Link>{' '}
//           and{' '}
//           <Link
//             href='/privacy'
//             className='underline underline-offset-4 hover:text-primary'
//           >
//             Privacy Policy
//           </Link>
//           .
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuthComponent;
