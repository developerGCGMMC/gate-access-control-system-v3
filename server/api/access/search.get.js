import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const search = getQuery(event);

    if(search.code) {
        const employees_data = await prisma.Employees.findMany({
            select: {
                employeeID: true,
                lastName: true,
                firstName: true,
                middleName: true,
                genealogySuffix: true,
                activeStatus: true,
                qrCodeActiveStatus: true,
                barCodeActiveStatus: true,
                rfidUIDActiveStatus: true,
                rfidTagActiveStatus: true
            },
            where: {
                ...(search.code
                    ? {
                        employeeID: {
                            search: search.code
                        },
                        biometricsNo: {
                            search: search.code
                        },
                        qrCode: {
                            search: search.code
                        },
                        barCode: {
                            search: search.code
                        },
                        rfidUID: {
                            search: search.code
                        },
                        rfidTag: {
                            search: search.code
                        }
                    }
                    : {})
            }
        });

        const trainees_data = await prisma.Trainees.findMany({
            select: {
                traineeID: true,
                lastName: true,
                firstName: true,
                middleName: true,
                genealogySuffix: true,
                activeStatus: true,
                qrCodeActiveStatus: true,
                barCodeActiveStatus: true,
                rfidUIDActiveStatus: true,
                rfidTagActiveStatus: true
            },
            where: {
                ...(search.code
                    ? {
                        traineeID: {
                            search: search.code
                        },
                        qrCode: {
                            search: search.code
                        },
                        barCode: {
                            search: search.code
                        },
                        rfidUID: {
                            search: search.code
                        },
                        rfidTag: {
                            search: search.code
                        }
                    }
                    : {})
            }
        });

        return [...employees_data, ...trainees_data].sort((prev, next) => {
            return prev.lastName > next.lastName
                ? 1
                : ((prev.lastName < next.lastName)
                    ? -1
                    : ((prev.firstName > next.firstName)
                        ? 1
                        : ((prev.firstName < next.firstName)
                            ? -1
                            : 0)))
        });
    } else {
        return {
            message: 'Error: search parameters.'
        }
    }
});