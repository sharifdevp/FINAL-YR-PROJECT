import { Balances } from '@prisma/client';

export default async function calculateAndUpdateBalances(
  email: string,
  year: string,
  type: string,
  days: number
): Promise<void> {
  const balance = await prisma.balances.findFirst({
    where: {
      email,
      year,
    },
  });

  if (!balance) {
    throw new Error('Balance not found for the specified user and year');
  }

  let balanceUpdate: Partial<Balances> = {};

  // Convert type to uppercase
  const leaveType = type.toUpperCase();

  switch (leaveType) {
    case 'ANNUAL':
      balanceUpdate = {
        annualUsed: (balance.annualUsed as number) + days,
        annualAvailable:
          (balance.annualCredit as number) -
          ((balance.annualUsed as number) + days),
      };
      break;
    case 'SICK':
      balanceUpdate = {
        sickUsed: (balance.sickUsed as number) + days,
        sickAvailable:
          (balance.sickCredit as number) -
          ((balance.sickUsed as number) + days),
      };
      break;
    case 'MATERNITY':
      balanceUpdate = {
        maternityUsed: (balance.maternityUsed as number) + days,
        maternityAvailable:
          (balance.maternityCredit as number) -
          ((balance.maternityUsed as number) + days),
      };
      break;
    case 'PATERNITY':
      balanceUpdate = {
        paternityUsed: (balance.paternityUsed as number) + days,
        paternityAvailable:
          (balance.paternityCredit as number) -
          ((balance.paternityUsed as number) + days),
      };
      break;
    case 'COMPENSATION':
      balanceUpdate = {
        compensationUsed: (balance.compensationUsed as number) + days,
        compensationAvailable:
          (balance.compensationCredit as number) -
          ((balance.compensationUsed as number) + days),
      };
      break;
    case 'EMERGENCY':
      balanceUpdate = {
        emergencyUsed: (balance.emergencyUsed as number) + days,
        emergencyAvailable:
          (balance.emergencyCredit as number) -
          ((balance.emergencyUsed as number) + days),
      };
      break;
    case 'UNPAID':
      balanceUpdate = {
        unpaidUsed: (balance.unpaidUsed as number) + days,
      };
      break;
    default:
      throw new Error(`Unsupported leave type: ${leaveType}`);
  }

  await prisma.balances.update({
    where: { id: balance.id },
    data: balanceUpdate,
  });
}

// import { Balances } from '@prisma/client';

// export default async function calculateAndUpdateBalances(
//   email: string,
//   year: string,
//   type: string,
//   days: number
// ): Promise<void> {
//   const balance = await prisma.balances.findFirst({
//     where: {
//       email,
//       year,
//     },
//   });

//   if (!balance) {
//     throw new Error('Balance not found for the specified user and year');
//   }

//   let balanceUpdate: Partial<Balances> = {};

//   switch (type) {
//     case 'ANNUAL':
//       balanceUpdate = {
//         annualUsed: (balance.annualUsed as number) + days,
//         annualAvailable:
//           (balance.annualCredit as number) -
//           ((balance.annualUsed as number) + days),
//       };

//       break;
//     case 'SICK':
//       balanceUpdate = {
//         sickUsed: (balance.sickUsed as number) + days,
//         sickAvailable:
//           (balance.sickCredit as number) -
//           ((balance.sickUsed as number) + days),
//       };
//       break;
//     case 'MATERNITY':
//       balanceUpdate = {
//         maternityUsed: (balance.maternityUsed as number) + days,
//         maternityAvailable:
//           (balance.maternityCredit as number) -
//           ((balance.maternityUsed as number) + days),
//       };
//       break;
//     case 'PATERNITY':
//       balanceUpdate = {
//         paternityUsed: (balance.paternityUsed as number) + days,
//         paternityAvailable:
//           (balance.paternityCredit as number) -
//           ((balance.paternityUsed as number) + days),
//       };
//       break;
//     case 'COMPENSATION':
//       balanceUpdate = {
//         compensationUsed: (balance.compensationUsed as number) + days,
//         compensationAvailable:
//           (balance.compensationCredit as number) -
//           ((balance.compensationUsed as number) + days),
//       };
//       break;
//     case 'EMERGENCY':
//       balanceUpdate = {
//         emergencyUsed: (balance.emergencyUsed as number) + days,
//         emergencyAvailable:
//           (balance.emergencyCredit as number) -
//           ((balance.emergencyUsed as number) + days),
//       };
//       break;
//     case 'UNPAID':
//       balanceUpdate = {
//         unpaidUsed: (balance.unpaidUsed as number) + days,
//       };
//       break;
//     default:
//       throw new Error(`Unsupported leave type: ${type}`);
//   }

//   await prisma.balances.update({
//     where: { id: balance.id },
//     data: balanceUpdate,
//   });
// }
