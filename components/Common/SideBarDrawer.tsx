import { User } from '@prisma/client';
import Image from 'next/image';
import { TiThMenu } from 'react-icons/ti';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import LogoutBtn from './LogoutBtn';
import { RenderRoutes } from './RenderRoutes';
import { AdminRoutes, ModeratorRoutes, UserRoutes } from './Routes';
import ToggleDarkLight from './ToggleDarkLight';

type SideBarDrawerProps = {
  user: User;
};

const SideBarDrawer = ({ user }: SideBarDrawerProps) => {
  const adminRouter = () => {
    return <>{RenderRoutes({ routes: AdminRoutes })}</>;
  };

  const userRouter = () => {
    return <>{RenderRoutes({ routes: UserRoutes })}</>;
  };

  const moderatorRouter = () => {
    return <>{RenderRoutes({ routes: ModeratorRoutes })}</>;
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className='p-2 bg-blue-100 rounded-full text-blue-500'>
          {' '}
          <TiThMenu size={24} />{' '}
        </button>
      </SheetTrigger>
      <SheetContent side='left' className='flex flex-col justify-between w-52'>
        <div>
          <div className='flex mt-3 justify-center'>
            {/* <Image src="/spana-b.png" width={50} height={50} alt="logo" /> */}
            <Image src='/gtck3.png' width={150} height={150} alt='logo' />
          </div>
          <nav className='flex flex-col items-center px-3 overflow-y-auto'>
            {user?.role === 'ADMIN' && adminRouter()}
            {user?.role === 'USER' && userRouter()}
            {user?.role === 'MODERATOR' && moderatorRouter()}
          </nav>
        </div>
        <div className='flex items-center justify-around'>
          <ToggleDarkLight />
          <button className=' text-slate-500 dark:text-slate-300'>
            <LogoutBtn />
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideBarDrawer;
