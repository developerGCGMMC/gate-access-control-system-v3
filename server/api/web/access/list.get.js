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
            rfidHFUID: true,
            rfidHFUIDActiveStatus: true,
            rfidHFTag: true,
            rfidHFTagActiveStatus: true,
            rfidUHFEPC: true,
            rfidUHFEPCActiveStatus: true
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

    const employee_rfid_hf_uids = employee_access.reduce((rfid_hf_uids, access) => {
        if((access.rfidHFUID && access.rfidHFUID != 'null') && access.rfidHFUIDActiveStatus == 'active') {
            rfid_hf_uids.push(access.rfidHFUID);
        }

        return rfid_hf_uids;
    }, []);

    const employee_rfid_hf_tags = employee_access.reduce((rfid_hf_tags, access) => {
        if((access.rfidHFTag && access.rfidHFTag != 'null') && access.rfidHFTagActiveStatus == 'active') {
            rfid_hf_tags.push(access.rfidHFTag);
        }

        return rfid_hf_tags;
    }, []);

    const employee_rfid_uhf_epcs = employee_access.reduce((rfid_uhf_epcs, access) => {
        if((access.rfidUHFEPC && access.rfidUHFEPC != 'null') && access.rfidUHFEPCActiveStatus == 'active') {
            rfid_uhf_epcs.push(access.rfidUHFEPC);
        }

        return rfid_uhf_epcs;
    }, []);

    // ! ---------------------------------------------------------------------------------------------------

    const trainee_access = await prisma.Trainees.findMany({
        select: {
            // lastName: true,
            // firstName: true,
            // middleName: true,
            // organization: true,
            qrCode: true,
            qrCodeActiveStatus: true,
            barCode: true,
            barCodeActiveStatus: true,
            rfidHFUID: true,
            rfidHFUIDActiveStatus: true,
            rfidHFTag: true,
            rfidHFTagActiveStatus: true,
            rfidUHFEPC: true,
            rfidUHFEPCActiveStatus: true
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

    const trainee_rfid_hf_uids = trainee_access.reduce((rfid_hf_uids, access) => {
        if((access.rfidHFUID && access.rfidHFUID != 'null') && access.rfidHFUIDActiveStatus == 'active') {
            rfid_hf_uids.push(access.rfidHFUID);
        }

        return rfid_hf_uids;
    }, []);

    const trainee_rfid_hf_tags = trainee_access.reduce((rfid_hf_tags, access) => {
        if((access.rfidHFTag && access.rfidHFTag != 'null') && access.rfidHFTagActiveStatus == 'active') {
            rfid_hf_tags.push(access.rfidHFTag);
        }

        return rfid_hf_tags;
    }, []);

    const trainee_rfid_uhf_epcs = trainee_access.reduce((rfid_uhf_epcs, access) => {
        if((access.rfidUHFEPC && access.rfidUHFEPC != 'null') && access.rfidUHFEPCActiveStatus == 'active') {
            rfid_uhf_epcs.push(access.rfidUHFEPC);
        }

        return rfid_uhf_epcs;
    }, []);

    // ! ---------------------------------------------------------------------------------------------------

    const remote_workers_access = await prisma.RemoteWorkers.findMany({
        select: {
            qrCode: true,
            qrCodeActiveStatus: true,
            barCode: true,
            barCodeActiveStatus: true,
            rfidHFUID: true,
            rfidHFUIDActiveStatus: true,
            rfidHFTag: true,
            rfidHFTagActiveStatus: true,
            rfidUHFEPC: true,
            rfidUHFEPCActiveStatus: true
        },
        where: {
            activeStatus: 'active'
        }
    });

    const remote_workers_qr_codes = remote_workers_access.reduce((qr_codes, access) => {
        if((access.qrCode && access.qrCode != 'null') && access.qrCodeActiveStatus == 'active') {
            qr_codes.push(access.qrCode);
        }

        return qr_codes;
    }, []);

    const remote_workers_bar_codes = remote_workers_access.reduce((bar_codes, access) => {
        if((access.barCode && access.barCode != 'null')  && access.barCodeActiveStatus == 'active') {
            bar_codes.push(access.barCode);
        }

        return bar_codes;
    }, []);

    const remote_workers_rfid_hf_uids = remote_workers_access.reduce((rfid_hf_uids, access) => {
        if((access.rfidHFUID && access.rfidHFUID != 'null') && access.rfidHFUIDActiveStatus == 'active') {
            rfid_hf_uids.push(access.rfidHFUID);
        }

        return rfid_hf_uids;
    }, []);

    const remote_workers_rfid_hf_tags = remote_workers_access.reduce((rfid_hf_tags, access) => {
        if((access.rfidHFTag && access.rfidHFTag != 'null') && access.rfidHFTagActiveStatus == 'active') {
            rfid_hf_tags.push(access.rfidHFTag);
        }

        return rfid_hf_tags;
    }, []);

    const remote_workers_rfid_uhf_epcs = trainee_access.reduce((rfid_uhf_epcs, access) => {
        if((access.rfidUHFEPC && access.rfidUHFEPC != 'null') && access.rfidUHFEPCActiveStatus == 'active') {
            rfid_uhf_epcs.push(access.rfidUHFEPC);
        }

        return rfid_uhf_epcs;
    }, []);

    // ! ---------------------------------------------------------------------------------------------------

    return {
        'employees': {
            'bar_codes': employee_bar_codes,
            'qr_codes': employee_qr_codes,
            'rfid_hf_uids': employee_rfid_hf_uids,
            'rfid_hf_tags': employee_rfid_hf_tags,
            'rfid_uhf_epcs': employee_rfid_uhf_epcs
        },
        'trainees': {
            'bar_codes': trainee_bar_codes,
            'qr_codes': trainee_qr_codes,
            'rfid_hf_uids': trainee_rfid_hf_uids,
            'rfid_hf_tags': trainee_rfid_hf_tags,
            'rfid_uhf_epcs': trainee_rfid_uhf_epcs
        },
        'remote_workers': {
            'bar_codes': remote_workers_bar_codes,
            'qr_codes': remote_workers_qr_codes,
            'rfid_hf_uids': remote_workers_rfid_hf_uids,
            'rfid_hf_tags': remote_workers_rfid_hf_tags,
            'rfid_uhf_epcs': remote_workers_rfid_uhf_epcs
        }
    };
});