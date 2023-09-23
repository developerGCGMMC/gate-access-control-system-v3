import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const take = 8;

    const fetchTimeLogsMain = prisma.TimeLogs.findMany({
        select: {
            id: true,
            userType: true,
            // employeesID: true,
            // traineesID: true,
            timeLog: true,
            location: true,
            employee: {
                select: {
                    biometricsNo: true,
                    lastName: true,
                    firstName: true,
                    middleName: true,
                    serviceName: true
                }
            },
            trainee: {
                select: {
                    designation: true,
                    lastName: true,
                    firstName: true,
                    middleName: true,
                    organization: true
                }
            }
        },
        where: {
            location: 'main_gate'
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: take
    });

    const fetchTimeLogsOPD = prisma.TimeLogs.findMany({
        select: {
            id: true,
            userType: true,
            // employeesID: true,
            // traineesID: true,
            timeLog: true,
            location: true,
            employee: {
                select: {
                    biometricsNo: true,
                    lastName: true,
                    firstName: true,
                    middleName: true,
                    serviceName: true
                }
            },
            trainee: {
                select: {
                    designation: true,
                    lastName: true,
                    firstName: true,
                    middleName: true,
                    organization: true
                }
            }
        },
        where: {
            location: 'opd_gate'
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: take
    });

    const fetchTimeLogsBack = prisma.TimeLogs.findMany({
        select: {
            id: true,
            userType: true,
            // employeesID: true,
            // traineesID: true,
            timeLog: true,
            location: true,
            employee: {
                select: {
                    biometricsNo: true,
                    lastName: true,
                    firstName: true,
                    middleName: true,
                    serviceName: true
                }
            },
            trainee: {
                select: {
                    designation: true,
                    lastName: true,
                    firstName: true,
                    middleName: true,
                    organization: true
                }
            }
        },
        where: {
            location: 'back_gate'
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: take
    });

    const [ time_logs_main, time_logs_opd, time_logs_back ] = await prisma.$transaction([fetchTimeLogsMain, fetchTimeLogsOPD, fetchTimeLogsBack]);

    return {
        main_gate: time_logs_main,
        opd_gate: time_logs_opd,
        back_gate: time_logs_back
    };
});