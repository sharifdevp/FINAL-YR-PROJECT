import Link from 'next/link';
import { AuthForm } from './AuthForm';

const AuthComponent = () => {
  return (
    <div
      className='min-h-screen flex items-center justify-center'
      style={{
        backgroundImage: 'url("/tp4.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        <div className='flex flex-col space-y-2 text-center'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Leave Management Portal
          </h1>
          {/* text-muted-foreground */}
          <p className='text-sm  text-blue-600 font-extrabold'>
            Login with your <span className='text-blue-600'>w</span>
            <span className='text-blue-600'>o</span>
            <span className='text-white'>r</span>
            <span className='text-white'>k</span>{' '}
            <span className='text-black'>e</span>
            <span className='text-black'>m</span>
            <span className='text-black'>a</span>
            <span className='text-black'>i</span>
            <span className='text-white'>l</span>
            <span className='text-white'> to</span>
            <span className='text-black'> a</span>
            <span className='text-black'>ccess</span> your portal
          </p>
        </div>
        <AuthForm />
        <p className='px-8 text-center text-sm text-white'>
          By clicking continue, you agree to the company{' '}
          <Link
            href='/terms'
            className='underline underline-offset-4 hover:text-primary'
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href='/privacy'
            className='underline underline-offset-4 hover:text-primary'
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default AuthComponent;
