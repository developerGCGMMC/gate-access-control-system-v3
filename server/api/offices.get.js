import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const data = await prisma.Offices.findMany({
        select: {
            id: true,
            officeName: true,
            officeAbbreviation: true,
            service: {
                select: {
                    serviceName: true
                }
            },
            isHeadOffice: true
        },
        where: {
            activeStatus: {
                equals: 'active'
            }
        }
    });

    const sorted_data = data.sort((prev, next) => {
        return prev.officeName > next.officeName
            ? 1
            : ((prev.officeName < next.officeName)
                ? -1
                : 0)
    });

    return sorted_data;
});