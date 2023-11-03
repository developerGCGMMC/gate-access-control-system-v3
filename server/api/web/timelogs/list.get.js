import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { location } = getQuery(event);

    const data = await prisma.TimeLogs.findMany({
        select: {
            id: true,
            userType: true,
            timeLog: true,
            employee: {
                select: {
                    id: true,
                    biometricsNo: true,
                    lastName: true,
                    firstName: true,
                    middleName: true,
                    genealogySuffix: true,
                    serviceName: true
                }
            },
            trainee: {
                select: {
                    id: true,
                    designation: true,
                    lastName: true,
                    firstName: true,
                    middleName: true,
                    genealogySuffix: true,
                    organization: true
                }
            },
            remoteWorker: {
                select: {
                    id: true,
                    designation: true,
                    lastName: true,
                    firstName: true,
                    middleName: true,
                    genealogySuffix: true,
                    organization: true
                }
            }
        },
        where: {
            location: location
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 4
    });

    return data;
});