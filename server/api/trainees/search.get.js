import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const search = getQuery(event);

    if(search.name || search.trainee_id || search.last_name || search.first_name || search.middle_name || search.designation || search.organization) {
        const data = await prisma.Trainees.findMany({
            select: {
                id: true,
                traineeID: true,
                designation: true,
                lastName: true,
                firstName: true,
                middleName: true,
                genealogySuffix: true,
                activeStatus: true,
                qrCode: true,
                qrCodeActiveStatus: true,
                barCode: true,
                barCodeActiveStatus: true,
                rfidUID: true,
                rfidUIDActiveStatus: true,
                rfidTag: true,
                rfidTagActiveStatus: true,
                organization: true,
                rotationStart: true,
                rotationEnd: true,
                registeredAt: true
            },
            where: {
                ...(search.name
                    ? {
                        lastName: {
                            search: search.name
                        },
                        firstName: {
                            search: search.name
                        },
                        middleName: {
                            search: search.name
                        }
                    }
                    : {}),

                // ! ---------------------------------------------------------------------------------------------------

                ...(search.trainee_id ? { traineeID: search.trainee_id } : {}),
                ...(search.last_name
                    ? {
                        lastName: {
                            equals: search.last_name,
                            mode: 'insensitive'
                        }
                    }
                    : {}),
                ...(search.first_name
                    ? {
                        firstName: {
                            equals: search.first_name,
                            mode: 'insensitive'
                        }
                    }
                    : {}),
                ...(search.middle_name
                    ? {
                        middleName: {
                            equals: search.middle_name,
                            mode: 'insensitive'
                        }
                    }
                    : {}),
                ...(search.designation
                    ? {
                        designation: {
                            equals: search.designation,
                            mode: 'insensitive'
                        }
                    }
                    : {}),
                ...(search.organization
                    ? {
                        organization: {
                            equals: search.organization,
                            mode: 'insensitive'
                        }
                    }
                    : {})
            }
        });

        const sorted_data = data.sort((prev, next) => {
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

        return sorted_data;
    } else {
        return {
            message: 'Error: search parameters.'
        }
    }
});