import { PrismaClient } from '@prisma/client';
import moment from 'moment';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { matched_code } = await readBody(event);

    if(matched_code.user == 'employee') {
        try {
            const matched_employee = await prisma.Employees.findFirst({
                select: {
                    id: true,
                    // employeeID: true,
                    // lastName: true,
                    // firstName: true,
                    // serviceName: true
                },
                where: {
                    ...(matched_code.access == 'qr_code' ? { qrCode: matched_code.code } : {}),
                    ...(matched_code.access == 'bar_code' ? { barCode: matched_code.code } : {}),
                    ...(matched_code.access == 'rfid_tag' ? { rfidTag: matched_code.code } : {})
                }
            });

            // console.log(matched_employee);
            // return matched_employee;

            if(matched_employee) {
                try {
                    const time_log = await prisma.TimeLogs.create({
                        data: {
                            userType: matched_code.user,
                            employeesID: matched_employee.id,
                            accessType: matched_code.access,
                            timeLog: moment().format('YYYY-MM-DD HH:mm:ss'),
                            location: matched_code.location
                        }
                    });

                    return time_log;
                } catch(error) {
                    console.error(error);

                    throw error;
                }
            } else {
                return {
                    message: '[ERROR] No query match.'
                }
            }
        } catch(error) {
            console.error(error);

            throw error;
        }
    } else if(matched_code.user == 'trainee') {
        try {
            const matched_trainee = await prisma.Trainees.findFirst({
                select: {
                    id: true,
                    // traineeID: true,
                    // designation: true,
                    // lastName: true,
                    // firstName: true,
                    // organization: true
                },
                where: {
                    ...(matched_code.access == 'qr_code' ? { qrCode: matched_code.code } : {}),
                    ...(matched_code.access == 'bar_code' ? { barCode: matched_code.code } : {}),
                    ...(matched_code.access == 'rfid_tag' ? { rfidTag: matched_code.code } : {})
                }
            });

            // console.log(matched_trainee);
            // return matched_trainee;

            if(matched_trainee) {
                try {
                    const time_log = await prisma.TimeLogs.create({
                        data: {
                            userType: matched_code.user,
                            traineesID: matched_trainee.id,
                            accessType: matched_code.access,
                            timeLog: moment().format('YYYY-MM-DD HH:mm:ss'),
                            location: matched_code.location
                        }
                    });

                    return time_log;
                } catch(error) {
                    console.error(error);

                    throw error;
                }
            } else {
                return {
                    message: '[ERROR] No query match.'
                }
            }
        } catch(error) {
            console.error(error);

            throw error;
        }
    } else {
        // ! HERE trainees
        // try {

        // } catch(error) {
        //     console.error(error);

        //     throw error;
        // }

        return {
            message: '[ERROR] No match.'
        }
    }
});