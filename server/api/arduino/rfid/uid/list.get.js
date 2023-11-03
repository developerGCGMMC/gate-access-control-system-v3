import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const fetchEmployeesRFIDUID = prisma.Employees.findMany({
        select: {
            lastName: true,
            firstName: true,
            rfidUID: true
        },
        where: {
            activeStatus: 'active',
            AND: [
                {
                    rfidUID: {
                        not: null
                    }
                },
                {
                    rfidUID: {
                        not: 'null'
                    }
                }
            ],
            rfidUIDActiveStatus: 'active'
        }
    });

    const fetchTraineesRFIDUID = prisma.Trainees.findMany({
        select: {
            lastName: true,
            firstName: true,
            rfidUID: true
        },
        where: {
            activeStatus: 'active',
            // rfidUID: {
            //     not: null
            // },
            // rfidUID: {
            //     not: 'null'
            // },
            AND: [
                {
                    rfidUID: {
                        not: null
                    }
                },
                {
                    rfidUID: {
                        not: 'null'
                    }
                }
            ],
            rfidUIDActiveStatus: 'active'
        }
    });


    const [employees_rfid_uid, trainees_rfid_uid] = await prisma.$transaction([fetchEmployeesRFIDUID, fetchTraineesRFIDUID]);

    return {
        rfid_uid: {
            employees: employees_rfid_uid,
            trainees: trainees_rfid_uid
        }
    };







    // const { capitalizeAll } = useString();

    // const data = await prisma.Users.findMany({
    //     select: {
    //         lastName: true,
    //         firstName: true,
    //         userAccessCode: {
    //             select: {
    //                 rfidUID: true
    //             }
    //         }
    //     },
    //     where: {
    //         activeStatus: 'active',
    //         userAccessCode: {
    //             rfidUIDStatus: 'active'
    //         }
    //     }
    // });

    // const sorted_data = data.sort((prev, next) => {
    //     return prev.lastName > next.lastName
    //         ? 1
    //         : ((prev.lastName < next.lastName)
    //             ? -1
    //             : ((prev.firstName > next.firstName)
    //                 ? 1
    //                 : ((prev.firstName < next.firstName)
    //                     ? -1
    //                     : 0)))
    // });

    // const rfid_uid_data = sorted_data.reduce((rfid_uid_accumulator, user) => {
    //     rfid_uid_accumulator.push([
    //         user.userAccessCode?.rfidUID,
    //         capitalizeAll(user.lastName+" "+user.firstName.charAt(0))
    //     ]);

    //     return rfid_uid_accumulator;
    // }, []);

    // return rfid_uid_data;

    return 'Hello Mariamar';
});