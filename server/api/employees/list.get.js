import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const data = await prisma.Employees.findMany({
        select: {
            id: true,
            employeeID: true,
            biometricsNo: true,
            employment: true,
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
            serviceName: true,
            dateAppointment: true,
            dateAppointmentExpiry: true,
            createdAt: true
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
});