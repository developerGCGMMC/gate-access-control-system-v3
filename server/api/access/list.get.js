import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const employee_access = await prisma.Employees.findMany({
        select: {
            // lastName: true,
            // firstName: true,
            // middleName: true,
            qrCode: true,
            qrCodeActiveStatus: true,
            barCode: true,
            barCodeActiveStatus: true,
            rfidUID: true,
            rfidUIDActiveStatus: true,
            rfidTag: true,
            rfidTagActiveStatus: true
        },
        where: {
            activeStatus: 'active'
        },
        // orderBy: [
        //     {
        //         lastName: 'asc'
        //     },
        //     {
        //         firstName:  'asc'
        //     },
        //     {
        //         middleName: 'asc'
        //     }
        // ]
    });

    const employee_qr_codes = employee_access.reduce((qr_codes, access) => {
        if((access.qrCode && access.qrCode != 'null') && access.qrCodeActiveStatus == 'active') {
            qr_codes.push(access.qrCode);
        }

        return qr_codes;
    }, []);

    const employee_bar_codes = employee_access.reduce((bar_codes, access) => {
        if((access.barCode && access.barCode != 'null')  && access.barCodeActiveStatus == 'active') {
            bar_codes.push(access.barCode);
        }

        return bar_codes;
    }, []);

    const employee_rfid_uids = employee_access.reduce((rfid_uids, access) => {
        if((access.rfidUID && access.rfidUID != 'null') && access.rfidUIDActiveStatus == 'active') {
            rfid_uids.push(access.rfidUID);
        }

        return rfid_uids;
    }, []);

    const employee_rfid_tags = employee_access.reduce((rfid_tags, access) => {
        if((access.rfidTag && access.rfidTag != 'null') && access.rfidTagActiveStatus == 'active') {
            rfid_tags.push(access.rfidTag);
        }

        return rfid_tags;
    }, []);

    // ! ---------------------------------------------------------------------------------------------------

    const trainee_access = await prisma.Trainees.findMany({
        select: {
            // lastName: true,
            // firstName: true,
            // middleName: true,
            qrCode: true,
            qrCodeActiveStatus: true,
            barCode: true,
            barCodeActiveStatus: true,
            rfidUID: true,
            rfidUIDActiveStatus: true,
            rfidTag: true,
            rfidTagActiveStatus: true,
            // organization: true
        },
        where: {
            activeStatus: 'active'
        },
        // orderBy: [
        //     {
        //         organization: 'asc'
        //     },
        //     {
        //         lastName: 'asc'
        //     },
        //     {
        //         firstName:  'asc'
        //     },
        //     {
        //         middleName: 'asc'
        //     }
        // ]
    });

    const trainee_qr_codes = trainee_access.reduce((qr_codes, access) => {
        if((access.qrCode && access.qrCode != 'null') && access.qrCodeActiveStatus == 'active') {
            qr_codes.push(access.qrCode);
        }

        return qr_codes;
    }, []);

    const trainee_bar_codes = trainee_access.reduce((bar_codes, access) => {
        if((access.barCode && access.barCode != 'null')  && access.barCodeActiveStatus == 'active') {
            bar_codes.push(access.barCode);
        }

        return bar_codes;
    }, []);

    const trainee_rfid_uids = trainee_access.reduce((rfid_uids, access) => {
        if((access.rfidUID && access.rfidUID != 'null') && access.rfidUIDActiveStatus == 'active') {
            rfid_uids.push(access.rfidUID);
        }

        return rfid_uids;
    }, []);

    const trainee_rfid_tags = trainee_access.reduce((rfid_tags, access) => {
        if((access.rfidTag && access.rfidTag != 'null') && access.rfidTagActiveStatus == 'active') {
            rfid_tags.push(access.rfidTag);
        }

        return rfid_tags;
    }, []);

    // ! ---------------------------------------------------------------------------------------------------

    return {
        'employees': {
            'bar_codes': employee_bar_codes,
            'qr_codes': employee_qr_codes,
            'rfid_uids': employee_rfid_uids,
            'rfid_tags': employee_rfid_tags
        },
        'trainees': {
            'bar_codes': trainee_bar_codes,
            'qr_codes': trainee_qr_codes,
            'rfid_uids': trainee_rfid_uids,
            'rfid_tags': trainee_rfid_tags
        }
    };
});