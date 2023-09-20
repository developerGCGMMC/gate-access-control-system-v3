import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const data = await prisma.Positions.findMany({
        select: {
            id: true,
            positionName: true
        }
    });

    const sorted_data = data.sort((prev, next) => {
        return prev.positionName > next.positionName
            ? 1
            : ((prev.positionName < next.positionName)
                ? -1
                : 0)
    });

    return sorted_data;
});