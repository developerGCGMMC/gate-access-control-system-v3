import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const request = getQuery(event);
    const location_name = request.location == 'main'
        ? 'main_gate'
        : (request.location == 'opd'
            ? 'opd_gate'
            : 'back_gate');

    const data = await prisma.TimeLogs.findMany({
        select: {
            id: true,
            userType: true,
            // employeesID: true,
            // traineesID: true,
            timeLog: true,
            employee: {
                select: {
                    employeeID: true,
                    biometricsNo: true,
                    lastName: true,
                    firstName: true,
                    middleName: true,
                    serviceName: true
                }
            }
        },
        where: {
            location: location_name
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 4
    });

    return data;
});