import Container from '@/components/Common/Container';
import LeaveCard from './LeaveCard';
import { Balances } from '@prisma/client';

type Props = {
  balances: Balances;
};

const UserBalances = ({ balances }: Props) => {
  return (
    <Container>
      <section className='grid grid-cols-1 gap-4 my-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        <LeaveCard
          year={balances?.year}
          leaveType={'ANNUAL'}
          credit={balances?.annualCredit as number}
          used={balances?.annualUsed as number}
          balance={balances?.annualAvailable as number}
        />
        <LeaveCard
          year={balances?.year}
          leaveType={'SICK'}
          credit={balances?.sickCredit as number}
          used={balances?.sickUsed as number}
          balance={balances?.sickAvailable as number}
        />

        <LeaveCard
          year={balances?.year}
          leaveType={'MATERNITY'}
          credit={balances?.maternityCredit as number}
          used={balances?.maternityUsed as number}
          balance={balances?.maternityAvailable as number}
        />
        <LeaveCard
          year={balances?.year}
          leaveType={'PATERNITY'}
          credit={balances?.paternityCredit as number}
          used={balances?.paternityUsed as number}
          balance={balances?.paternityAvailable as number}
        />
        <LeaveCard
          year={balances?.year}
          leaveType={'COMPENSATION'}
          credit={balances?.compensationCredit as number}
          used={balances?.compensationUsed as number}
          balance={balances?.compensationAvailable as number}
        />
        <LeaveCard
          year={balances?.year}
          leaveType={'EMERGENCY'}
          credit={balances?.emergencyCredit as number}
          used={balances?.emergencyUsed as number}
          balance={balances?.emergencyAvailable as number}
        />
        <LeaveCard
          year={balances?.year}
          leaveType={'UNPAID'}
          credit={balances?.unpaidCredit as number}
          used={balances?.unpaidUsed as number}
          balance={balances?.unpaidAvailable as number}
        />
      </section>
    </Container>
  );
};

export default UserBalances;
