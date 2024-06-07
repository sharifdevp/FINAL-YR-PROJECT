import {
  HiMiniComputerDesktop,
  HiOutlineCog6Tooth,
  HiOutlineSquares2X2,
  HiOutlineUserGroup,
  HiOutlineUserCircle,
} from 'react-icons/hi2';
import { MdOutlineBalance } from 'react-icons/md';
import { TbListCheck } from 'react-icons/tb';

export const AdminRoutes = [
  { title: 'Portal', url: '/portal', icon: HiMiniComputerDesktop },
  { title: 'Dashboard', url: '/dashboard/', icon: HiOutlineSquares2X2 },
  { title: 'Balances', url: '/dashboard/balances', icon: MdOutlineBalance },
  { title: 'Leaves', url: '/dashboard/leaves', icon: TbListCheck },
  { title: 'Users', url: '/dashboard/users', icon: HiOutlineUserGroup },
  {
    title: 'Events',
    url: '/dashboard/settings',
    icon: HiOutlineCog6Tooth,
  },
];

export const UserRoutes = [
  {
    title: 'Profile',
    url: '/portal/profile',
    icon: HiOutlineUserCircle,
  },
  { title: 'Portal', url: '/portal', icon: HiMiniComputerDesktop },
  { title: 'History', url: '/portal/history', icon: TbListCheck },
];

export const ModeratorRoutes = [
  { title: 'Portal', url: '/portal', icon: HiMiniComputerDesktop },
  { title: 'Dashboard', url: '/dashboard/', icon: HiOutlineSquares2X2 },
  { title: 'Balances', url: '/dashboard/balances', icon: MdOutlineBalance },
  { title: 'Leaves', url: '/dashboard/leaves', icon: TbListCheck },
  { title: 'Users', url: '/dashboard/users', icon: HiOutlineUserGroup },
  {
    title: 'Settings',
    url: '/dashboard/settings',
    icon: HiOutlineCog6Tooth,
  },
];
