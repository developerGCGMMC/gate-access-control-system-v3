import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ! ---------------------------------------------------------------------------------------------------

async function seedOffices() {
    const office_of_medical_center_chief_seed = await prisma.Services.create({
        data: {
            serviceName: "Office of the Medical Center Chief"
        }
    });
    const medical_service_seed = await prisma.Services.create({
        data: {
            serviceName: "Medical Service"
        }
    });
    const nursing_service_seed = await prisma.Services.create({
        data: {
            serviceName: "Nursing Service"
        }
    });
    const hospital_operations_and_patient_support_service_seed = await prisma.Services.create({
        data: {
            serviceName: "Hospital Operations and Patient Support Service"
        }
    });
    const finance_service_seed = await prisma.Services.create({
        data: {
            serviceName: "Finance Service"
        }
    });
    const allied_health_professional_service_seed = await prisma.Services.create({
        data: {
            serviceName: "Allied Health Professional Service"
        }
    });

    const mcco_seeds = await prisma.Offices.create({
        data: {
            officeName: "Medical Center Chief Office",
            officeAbbreviation: "MCCO",
            serviceId: office_of_medical_center_chief_seed.id,
            isHeadOffice: "true"
        }
    });
    const cmps_seeds = await prisma.Offices.create({
        data: {
            officeName: "Chief of Medical Professional Staff Office",
            officeAbbreviation: "CMPS",
            serviceId: medical_service_seed.id,
            isHeadOffice: "true"
        }
    });
    const nso_seeds = await prisma.Offices.create({
        data: {
            officeName: "Nursing Service Office",
            officeAbbreviation: "NSO",
            serviceId: nursing_service_seed.id,
            isHeadOffice: "true"
        }
    });
    const cao_seeds = await prisma.Offices.create({
        data: {
            officeName: "Office of the Chief Administrative Officer",
            officeAbbreviation: "CAO",
            serviceId: hospital_operations_and_patient_support_service_seed.id,
            isHeadOffice: "true"
        }
    });
    const fmo_seeds = await prisma.Offices.create({
        data: {
            officeName: "Financial Management Office",
            officeAbbreviation: "FMO",
            serviceId: finance_service_seed.id,
            isHeadOffice: "true"
        }
    });
    const ocahs_seeds = await prisma.Offices.create({
        data: {
            officeName: "Office of the Chief of the Allied Health Services",
            officeAbbreviation: "OCAHS",
            serviceId: allied_health_professional_service_seed.id,
            isHeadOffice: "true"
        }
    });

    const imiss_seeds = await prisma.Offices.create({
        data: {
            officeName: "Integrated Management Information System Section",
            officeAbbreviation: "IMISS",
            serviceId: hospital_operations_and_patient_support_service_seed.id
        }
    });

    const acco_seeds = await prisma.Offices.create({
        data: {
            officeName: "Accounting",
            officeAbbreviation: "ACCO",
            serviceId: finance_service_seed.id
        }
    });
    const acu_seeds = await prisma.Offices.create({
        data: {
            officeName: "Acute Stroke Unit",
            officeAbbreviation: "ACU",
            serviceId: nursing_service_seed.id
        }
    });
    const admit_seeds = await prisma.Offices.create({
        data: {
            officeName: "Admitting and Information",
            officeAbbreviation: "ADMIT",
            serviceId: medical_service_seed.id
        }
    });
    const anes_seeds = await prisma.Offices.create({
        data: {
            officeName: "Anesthesia Department",
            officeAbbreviation: "ANES",
            serviceId: medical_service_seed.id
        }
    });
    const bill_seeds = await prisma.Offices.create({
        data: {
            officeName: "Billing",
            officeAbbreviation: "BILL",
            serviceId: finance_service_seed.id
        }
    });
    const bclaims_seeds = await prisma.Offices.create({
        data: {
            officeName: "Billing and Claims",
            officeAbbreviation: "BCLAIMS",
            serviceId: finance_service_seed.id
        }
    });
    const biomed_seeds = await prisma.Offices.create({
        data: {
            officeName: "Biomed",
            officeAbbreviation: "BIOMED",
            serviceId: hospital_operations_and_patient_support_service_seed.id
        }
    });
    const bb_seeds = await prisma.Offices.create({
        data: {
            officeName: "Blood Bank",
            officeAbbreviation: "BB",
            serviceId: medical_service_seed.id
        }
    });
    const budget_seeds = await prisma.Offices.create({
        data: {
            officeName: "Budget",
            officeAbbreviation: "BUDGET",
            serviceId: finance_service_seed.id
        }
    });
    const burn_seeds = await prisma.Offices.create({
        data: {
            officeName: "Burn Unit",
            officeAbbreviation: "BURN",
            serviceId: medical_service_seed.id
        }
    });
    const crdiomso_seeds = await prisma.Offices.create({
        data: {
            officeName: "Cardiology Department - Medical Service",
            officeAbbreviation: "CRDIOMSO",
            serviceId: medical_service_seed.id
        }
    });
    const cash_seeds = await prisma.Offices.create({
        data: {
            officeName: "Cash Operations",
            officeAbbreviation: "CASH",
            serviceId: finance_service_seed.id
        }
    });
    const csrnso_seeds = await prisma.Offices.create({
        data: {
            officeName: "Central Supply Room - Nursing Service",
            officeAbbreviation: "CSRNSO",
            serviceId: nursing_service_seed.id
        }
    });
    const claims_seeds = await prisma.Offices.create({
        data: {
            officeName: "Claims",
            officeAbbreviation: "CLAIMS",
            serviceId: finance_service_seed.id
        }
    });
    const clnic_seeds = await prisma.Offices.create({
        data: {
            officeName: "Clinical Department",
            officeAbbreviation: "CLNIC",
            serviceId: medical_service_seed.id
        }
    });
    const cnu_seeds = await prisma.Offices.create({
        data: {
            officeName: "Clinical Nursing Units",
            officeAbbreviation: "CNU",
            serviceId: nursing_service_seed.id
        }
    });
    const drlr_seeds = await prisma.Offices.create({
        data: {
            officeName: "Delivery Room - Labor Room",
            officeAbbreviation: "DRLR",
            serviceId: nursing_service_seed.id
        }
    });
    const drobr_seeds = await prisma.Offices.create({
        data: {
            officeName: "Delivery Room - OB Room",
            officeAbbreviation: "DROBR",
            serviceId: nursing_service_seed.id
        }
    });
    const dental_seeds = await prisma.Offices.create({
        data: {
            officeName: "Dental",
            officeAbbreviation: "DENTAL",
            serviceId: medical_service_seed.id
        }
    });
    const dmc_seeds = await prisma.Offices.create({
        data: {
            officeName: "Diabetes Mellitus Clinic",
            officeAbbreviation: "DMC",
            serviceId: nursing_service_seed.id
        }
    });
    const dietary_seeds = await prisma.Offices.create({
        data: {
            officeName: "Dietary",
            officeAbbreviation: "DIETARY",
            serviceId: allied_health_professional_service_seed.id
        }
    });
    const emdep_seeds = await prisma.Offices.create({
        data: {
            officeName: "Emergency Medicine Department",
            officeAbbreviation: "DMDEP",
            serviceId: medical_service_seed.id
        }
    });
    const efms_seeds = await prisma.Offices.create({
        data: {
            officeName: "Engineering and Facilities Management Section",
            officeAbbreviation: "EFMS",
            serviceId: hospital_operations_and_patient_support_service_seed.id
        }
    });
    const fmdep_seeds = await prisma.Offices.create({
        data: {
            officeName: "Family and Community Medicine Department",
            officeAbbreviation: "FMDEP",
            serviceId: medical_service_seed.id
        }
    });
    const gso_seeds = await prisma.Offices.create({
        data: {
            officeName: "General Service Office",
            officeAbbreviation: "GSO",
            serviceId: hospital_operations_and_patient_support_service_seed.id
        }
    });
    const geria_seeds = await prisma.Offices.create({
        data: {
            officeName: "Geriatics",
            officeAbbreviation: "GERIA",
            serviceId: medical_service_seed.id
        }
    });
    const hfdu_seeds = await prisma.Offices.create({
        data: {
            officeName: "Health Facility Development Unit",
            officeAbbreviation: "HFDU",
            serviceId: office_of_medical_center_chief_seed.id
        }
    });
    const hidep_seeds = await prisma.Offices.create({
        data: {
            officeName: "Health Information Department",
            officeAbbreviation: "HIDEP",
            serviceId: medical_service_seed.id
        }
    });
    const hdu_seeds = await prisma.Offices.create({
        data: {
            officeName: "Hemo-Dialysis Unit",
            officeAbbreviation: "HDU",
            serviceId: nursing_service_seed.id
        }
    });
    const hesu_seeds = await prisma.Offices.create({
        data: {
            officeName: "Hospital Epidemiology Surveillance Unit",
            officeAbbreviation: "HESU",
            serviceId: office_of_medical_center_chief_seed.id
        }
    });
    const him_seeds = await prisma.Offices.create({
        data: {
            officeName: "Hospital Information Management",
            officeAbbreviation: "HIM",
            serviceId: allied_health_professional_service_seed.id
        }
    });
    const hsc_seeds = await prisma.Offices.create({
        data: {
            officeName: "Hospital Safety Committee",
            officeAbbreviation: "HSC",
            serviceId: office_of_medical_center_chief_seed.id
        }
    });
    const hrmo_seeds = await prisma.Offices.create({
        data: {
            officeName: "Human Resource Management Office",
            officeAbbreviation: "HRMO",
            serviceId: hospital_operations_and_patient_support_service_seed.id
        }
    });
    const ipcu_seeds = await prisma.Offices.create({
        data: {
            officeName: "Infection Prevention and Control Unit",
            officeAbbreviation: "IPCU",
            serviceId: office_of_medical_center_chief_seed.id
        }
    });
    const irb_seeds = await prisma.Offices.create({
        data: {
            officeName: "Institutional Review Board",
            officeAbbreviation: "IRB",
            serviceId: medical_service_seed.id
        }
    });
    const imnso_seeds = await prisma.Offices.create({
        data: {
            officeName: "Internal Medicine - Nursing Service",
            officeAbbreviation: "IMNSO",
            serviceId: nursing_service_seed.id
        }
    });
    const immso_seeds = await prisma.Offices.create({
        data: {
            officeName: "Internal Medicine Department - Medical Service",
            officeAbbreviation: "IMMSO",
            serviceId: medical_service_seed.id
        }
    });
    const iso_seeds = await prisma.Offices.create({
        data: {
            officeName: "ISO Office",
            officeAbbreviation: "ISO",
            serviceId: office_of_medical_center_chief_seed.id
        }
    });
    const labor_seeds = await prisma.Offices.create({
        data: {
            officeName: "Labor Room",
            officeAbbreviation: "LABOR",
            serviceId: nursing_service_seed.id
        }
    });
    const lab_seeds = await prisma.Offices.create({
        data: {
            officeName: "Laboratory",
            officeAbbreviation: "LAB",
            serviceId: medical_service_seed.id
        }
    });
    const mlskt_seeds = await prisma.Offices.create({
        data: {
            officeName: "Malasakit Center",
            officeAbbreviation: "MLSKT",
            serviceId: hospital_operations_and_patient_support_service_seed.id
        }
    });
    const mms_seeds = await prisma.Offices.create({
        data: {
            officeName: "Materials Management Section",
            officeAbbreviation: "MMS",
            serviceId: hospital_operations_and_patient_support_service_seed.id
        }
    });
    const med1_seeds = await prisma.Offices.create({
        data: {
            officeName: "Medical 1",
            officeAbbreviation: "MED1",
            serviceId: nursing_service_seed.id
        }
    });
    const med2_seeds = await prisma.Offices.create({
        data: {
            officeName: "Medical 2",
            officeAbbreviation: "MED2",
            serviceId: nursing_service_seed.id
        }
    });
    const med3_seeds = await prisma.Offices.create({
        data: {
            officeName: "Medical 3",
            officeAbbreviation: "MED3",
            serviceId: nursing_service_seed.id
        }
    });
    const micunso_seeds = await prisma.Offices.create({
        data: {
            officeName: "Medical Intensive Care Unit - Nursing Service",
            officeAbbreviation: "MICUNSO",
            serviceId: nursing_service_seed.id
        }
    });
    const mr_seeds = await prisma.Offices.create({
        data: {
            officeName: "Medical Records",
            officeAbbreviation: "MR",
            serviceId: medical_service_seed.id
        }
    });
    const medsw_seeds = await prisma.Offices.create({
        data: {
            officeName: "Medical Social Worker Service",
            officeAbbreviation: "MEDSW",
            serviceId: allied_health_professional_service_seed.id
        }
    });
    const mso_seeds = await prisma.Offices.create({
        data: {
            officeName: "Medical Staff Organization",
            officeAbbreviation: "MSO",
            serviceId: medical_service_seed.id
        }
    });
    const mwic_seeds = await prisma.Offices.create({
        data: {
            officeName: "Medical Ward Intermediate Care",
            officeAbbreviation: "MWIC",
            serviceId: nursing_service_seed.id
        }
    });
    const mhprt_seeds = await prisma.Offices.create({
        data: {
            officeName: "MHPRT",
            officeAbbreviation: "MHPRT",
            serviceId: medical_service_seed.id
        }
    });
    const mbio_seeds = await prisma.Offices.create({
        data: {
            officeName: "Micro Biology",
            officeAbbreviation: "MBIO",
            serviceId: medical_service_seed.id
        }
    });
    const molec_seeds = await prisma.Offices.create({
        data: {
            officeName: "Molecular Laboratory",
            officeAbbreviation: "MOLEC",
            serviceId: medical_service_seed.id
        }
    });
    const nicunso_seeds = await prisma.Offices.create({
        data: {
            officeName: "Neonatal Intensive Care Unit - Nursing Service",
            officeAbbreviation: "NICUNSO",
            serviceId: nursing_service_seed.id
        }
    });
    const obcmso_seeds = await prisma.Offices.create({
        data: {
            officeName: "Obstetric Complex - Medical Service",
            officeAbbreviation: "OBCMSO",
            serviceId: medical_service_seed.id
        }
    });
    const obcnso_seeds = await prisma.Offices.create({
        data: {
            officeName: "Obstetric Complex - Nursing Service",
            officeAbbreviation: "OBCNSO",
            serviceId: nursing_service_seed.id
        }
    });
    const obor_seeds = await prisma.Offices.create({
        data: {
            officeName: "Obstetrical Operating Room",
            officeAbbreviation: "OBOR",
            serviceId: nursing_service_seed.id
        }
    });
    const obgynenso_seeds = await prisma.Offices.create({
        data: {
            officeName: "Obstetrics-Gynecology - Nursing Service",
            officeAbbreviation: "OBGYNENSO",
            serviceId: nursing_service_seed.id
        }
    });
    const obgynemso_seeds = await prisma.Offices.create({
        data: {
            officeName: "Obstetrics-Gynecology Department - Medical Service",
            officeAbbreviation: "OBGYNEMSO",
            serviceId: medical_service_seed.id
        }
    });
    const osm_seeds = await prisma.Offices.create({
        data: {
            officeName: "Office for Strategic Management",
            officeAbbreviation: "OSM",
            serviceId: office_of_medical_center_chief_seed.id
        }
    });
    const onco_seeds = await prisma.Offices.create({
        data: {
            officeName: "Oncology Unit",
            officeAbbreviation: "ONCO",
            serviceId: medical_service_seed.id
        }
    });
    const or_seeds = await prisma.Offices.create({
        data: {
            officeName: "Operating Room",
            officeAbbreviation: "OR",
            serviceId: nursing_service_seed.id
        }
    });
    const orpacu_seeds = await prisma.Offices.create({
        data: {
            officeName: "Operating Room - Post Anesthesia Care Unit",
            officeAbbreviation: "ORPACU",
            serviceId: nursing_service_seed.id
        }
    });
    const order_seeds = await prisma.Offices.create({
        data: {
            officeName: "Orderlies",
            officeAbbreviation: "ORDER",
            serviceId: nursing_service_seed.id
        }
    });
    const ortho_seeds = await prisma.Offices.create({
        data: {
            officeName: "Orthopedics",
            officeAbbreviation: "ORTHO",
            serviceId: medical_service_seed.id
        }
    });
    const opdmso_seeds = await prisma.Offices.create({
        data: {
            officeName: "Out-Patient Department - Medical Service",
            officeAbbreviation: "OPDMSO",
            serviceId: medical_service_seed.id
        }
    });
    const opdnso_seeds = await prisma.Offices.create({
        data: {
            officeName: "Out-Patient Department - Nursing Service",
            officeAbbreviation: "OPDNSO",
            serviceId: nursing_service_seed.id
        }
    });
    const opg_seeds = await prisma.Offices.create({
        data: {
            officeName: "Oxygen Plant Generator",
            officeAbbreviation: "OPG",
            serviceId: office_of_medical_center_chief_seed.id
        }
    });
    const patho_seeds = await prisma.Offices.create({
        data: {
            officeName: "Pathology Department",
            officeAbbreviation: "PATHO",
            serviceId: medical_service_seed.id
        }
    });
    const psc_seeds = await prisma.Offices.create({
        data: {
            officeName: "Patient Safety Committee",
            officeAbbreviation: "PSC",
            serviceId: office_of_medical_center_chief_seed.id
        }
    });
    const pdiamso_seeds = await prisma.Offices.create({
        data: {
            officeName: "Pediatrics Department - Medical Service",
            officeAbbreviation: "PDIAMSO",
            serviceId: medical_service_seed.id
        }
    });
    const picunso_seeds = await prisma.Offices.create({
        data: {
            officeName: "Pediatrics Intensive Care Unit - Nursing Service",
            officeAbbreviation: "PICUNSO",
            serviceId: nursing_service_seed.id
        }
    });
    const pharm_seeds = await prisma.Offices.create({
        data: {
            officeName: "Pharmacy",
            officeAbbreviation: "PHARM",
            serviceId: allied_health_professional_service_seed.id
        }
    });
    const pdu_seeds = await prisma.Offices.create({
        data: {
            officeName: "Planning and Development Unit",
            officeAbbreviation: "PDU",
            serviceId: office_of_medical_center_chief_seed.id
        }
    });
    const procs1_seeds = await prisma.Offices.create({
        data: {
            officeName: "Processing 1",
            officeAbbreviation: "PROCS1",
            serviceId: finance_service_seed.id
        }
    });
    const procs2_seeds = await prisma.Offices.create({
        data: {
            officeName: "Processing 2",
            officeAbbreviation: "PROCS2",
            serviceId: finance_service_seed.id
        }
    });
    const procs3_seeds = await prisma.Offices.create({
        data: {
            officeName: "Processing 3",
            officeAbbreviation: "PROCS3",
            serviceId: finance_service_seed.id
        }
    });
    const procs4_seeds = await prisma.Offices.create({
        data: {
            officeName: "Processing 4",
            officeAbbreviation: "PROCS4",
            serviceId: finance_service_seed.id
        }
    });
    const proc_seeds = await prisma.Offices.create({
        data: {
            officeName: "Procurement Office",
            officeAbbreviation: "PROC",
            serviceId: hospital_operations_and_patient_support_service_seed.id
        }
    });
    const petro_seeds = await prisma.Offices.create({
        data: {
            officeName: "Professional Education Training and Research Office",
            officeAbbreviation: "PETRO",
            serviceId: office_of_medical_center_chief_seed.id
        }
    });
    const psycho_seeds = await prisma.Offices.create({
        data: {
            officeName: "Psychology",
            officeAbbreviation: "PSYCHO",
            serviceId: medical_service_seed.id
        }
    });
    const phu_seeds = await prisma.Offices.create({
        data: {
            officeName: "Public Health Unit",
            officeAbbreviation: "PHU",
            serviceId: office_of_medical_center_chief_seed.id
        }
    });
    const qms_seeds = await prisma.Offices.create({
        data: {
            officeName: "Quality Management System",
            officeAbbreviation: "QMS",
            serviceId: office_of_medical_center_chief_seed.id
        }
    });
    const radio_seeds = await prisma.Offices.create({
        data: {
            officeName: "Radiology Department",
            officeAbbreviation: "RADIO",
            serviceId: medical_service_seed.id
        }
    });
    const rehab_seeds = await prisma.Offices.create({
        data: {
            officeName: "Rehabilation Medicine Department",
            officeAbbreviation: "REHAB",
            serviceId: medical_service_seed.id
        }
    });
    const respi_seeds = await prisma.Offices.create({
        data: {
            officeName: "Respiratory Unit",
            officeAbbreviation: "RESPI",
            serviceId: medical_service_seed.id
        }
    });
    const guard_seeds = await prisma.Offices.create({
        data: {
            officeName: "Security",
            officeAbbreviation: "GUARD",
            serviceId: hospital_operations_and_patient_support_service_seed.id
        }
    });
    const surgmso_seeds = await prisma.Offices.create({
        data: {
            officeName: "Surgery Department - Medical Service",
            officeAbbreviation: "SURGMSO",
            serviceId: medical_service_seed.id
        }
    });
    const surg1_seeds = await prisma.Offices.create({
        data: {
            officeName: "Surgical 1",
            officeAbbreviation: "SURG1",
            serviceId: nursing_service_seed.id
        }
    });
    const surg2_seeds = await prisma.Offices.create({
        data: {
            officeName: "Surgical 2",
            officeAbbreviation: "SURG2",
            serviceId: nursing_service_seed.id
        }
    });
    const sicunso_seeds = await prisma.Offices.create({
        data: {
            officeName: "Surgical Intensive Care Unit - Nursing Service",
            officeAbbreviation: "SICUNSO",
            serviceId: nursing_service_seed.id
        }
    });
    const tbdots_seeds = await prisma.Offices.create({
        data: {
            officeName: "Tuberculosis-Directly Observed Treatment Strategy",
            officeAbbreviation: "TBDOTS",
            serviceId: medical_service_seed.id
        }
    });
    const wcpu_seeds = await prisma.Offices.create({
        data: {
            officeName: "Women and Child Protection Unit",
            officeAbbreviation: "WCPU",
            serviceId: medical_service_seed.id
        }
    });
}

seedOffices()
.then(async () => {
    await prisma.$disconnect();
})
.catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});

// ! ---------------------------------------------------------------------------------------------------

async function seedPositions() {
    const accountant_four_seed = await prisma.Positions.create({
        data: {
            positionName: "Accountant IV"
        }
    });
    const accountant_three_seed = await prisma.Positions.create({
        data: {
            positionName: "Accountant III"
        }
    });
    const accountant_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Accountant II"
        }
    });
    const accountant_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Accountant I"
        }
    });
    const administrative_aide_six_seed = await prisma.Positions.create({
        data: {
            positionName: "Administrative Aide VI"
        }
    });
    const administrative_aide_five_seed = await prisma.Positions.create({
        data: {
            positionName: "Administrative Aide V"
        }
    });
    const administrative_aide_four_seed = await prisma.Positions.create({
        data: {
            positionName: "Administrative Aide IV"
        }
    });
    const administrative_aide_three_seed = await prisma.Positions.create({
        data: {
            positionName: "Administrative Aide III"
        }
    });
    const administrative_aide_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Administrative Aide II"
        }
    });
    const administrative_aide_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Administrative Aide I"
        }
    });
    const administrative_assistant_three_seed = await prisma.Positions.create({
        data: {
            positionName: "Administrative Assistant III"
        }
    });
    const administrative_assistant_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Administrative Assistant II"
        }
    });
    const administrative_assistant_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Administrative Assistant I"
        }
    });

    const administrative_officer_five_seed = await prisma.Positions.create({
        data: {
            positionName: "Administrative Officer V"
        }
    });
    const administrative_officer_four_seed = await prisma.Positions.create({
        data: {
            positionName: "Administrative Officer IV"
        }
    });
    const administrative_officer_three_seed = await prisma.Positions.create({
        data: {
            positionName: "Administrative Officer III"
        }
    });
    const administrative_officer_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Administrative Officer II"
        }
    });
    const administrative_officer_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Administrative Officer I"
        }
    });
    const architect_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Architect II"
        }
    });
    const architect_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Architect I"
        }
    });
    const attorney_four_seed = await prisma.Positions.create({
        data: {
            positionName: "Attorney IV"
        }
    });

    const chief_administrative_officer_seed = await prisma.Positions.create({
        data: {
            positionName: "Chief Administrative Officer"
        }
    });
    const chief_health_program_officer_seed = await prisma.Positions.create({
        data: {
            positionName: "Chief Health Program Officer"
        }
    });
    const computer_maintenance_technologist_three_seed = await prisma.Positions.create({
        data: {
            positionName: "Computer Maintenance Technologist III"
        }
    });
    const computer_maintenance_technologist_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Computer Maintenance Technologist II"
        }
    });
    const computer_maintenance_technologist_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Computer Maintenance Technologist I"
        }
    });
    const computer_programmer_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Computer Programmer II"
        }
    });
    const computer_programmer_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Computer Programmer I"
        }
    });

    const cook_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Cook II"
        }
    });
    const cook_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Cook I"
        }
    });

    const dental_aide_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Dental Aide I"
        }
    });

    const engineer_four_seed = await prisma.Positions.create({
        data: {
            positionName: "Engineer IV"
        }
    });
    const engineer_three_seed = await prisma.Positions.create({
        data: {
            positionName: "Engineer III"
        }
    });
    const engineer_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Engineer II"
        }
    });
    const engineer_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Engineer I"
        }
    });

    const health_education_and_promotion_officer_three_seed = await prisma.Positions.create({
        data: {
            positionName: "Health Education and Promotion Officer III"
        }
    });
    const health_education_and_promotion_officer_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Health Education and Promotion Officer II"
        }
    });
    const health_education_and_promotion_officer_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Health Education and Promotion Officer I"
        }
    });
    const hospital_housekeeper_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Hospital Housekeeper I"
        }
    });

    const information_system_analyst_three_seed = await prisma.Positions.create({
        data: {
            positionName: "Information System Analyst III"
        }
    });
    const information_system_analyst_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Information System Analyst II"
        }
    });
    const information_system_analyst_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Information System Analyst I"
        }
    });

    const laboratory_aide_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Laboratory Aide II"
        }
    });
    const laboratory_aide_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Laboratory Aide I"
        }
    });
    const laundry_worker_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Laundry Worker II"
        }
    });
    const laundry_worker_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Laundry Worker I"
        }
    });
    const legal_assistant_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Legal Assistant II"
        }
    });
    const legal_assistant_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Legal Assistant I"
        }
    });

    const medical_center_chief_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Medical Center Chief II"
        }
    });
    const medical_equipment_technician_four_seed = await prisma.Positions.create({
        data: {
            positionName: "Medical Equipment Technician IV"
        }
    });
    const medical_equipment_technician_three_seed = await prisma.Positions.create({
        data: {
            positionName: "Medical Equipment Technician III"
        }
    });
    const medical_equipment_technician_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Medical Equipment Technician II"
        }
    });
    const medical_equipment_technician_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Medical Equipment Technician I"
        }
    });
    const medical_officer_four_seed = await prisma.Positions.create({
        data: {
            positionName: "Medical Officer IV"
        }
    });
    const medical_officer_three_seed = await prisma.Positions.create({
        data: {
            positionName: "Medical Officer III"
        }
    });
    const medical_officer_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Medical Officer II"
        }
    });
    const medical_officer_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Medical Officer I"
        }
    });
    const medical_specialist_four_seed = await prisma.Positions.create({
        data: {
            positionName: "Medical Specialist IV"
        }
    });
    const medical_specialist_three_seed = await prisma.Positions.create({
        data: {
            positionName: "Medical Specialist III"
        }
    });
    const medical_specialist_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Medical Specialist II"
        }
    });
    const medical_technologist_five_seed = await prisma.Positions.create({
        data: {
            positionName: "Medical Technologist V"
        }
    });
    const medical_technologist_four_seed = await prisma.Positions.create({
        data: {
            positionName: "Medical Technologist IV"
        }
    });
    const medical_technologist_three_seed = await prisma.Positions.create({
        data: {
            positionName: "Medical Technologist III"
        }
    });
    const medical_technologist_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Medical Technologist II"
        }
    });
    const medical_technologist_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Medical Technologist I"
        }
    });
    const midwife_four_seed = await prisma.Positions.create({
        data: {
            positionName: "Midwife IV"
        }
    });
    const midwife_three_seed = await prisma.Positions.create({
        data: {
            positionName: "Midwife III"
        }
    });
    const midwife_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Midwife II"
        }
    });
    const midwife_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Midwife I"
        }
    });

    const nurse_seven_seed = await prisma.Positions.create({
        data: {
            positionName: "Nurse VII"
        }
    });
    const nurse_six_seed = await prisma.Positions.create({
        data: {
            positionName: "Nurse VI"
        }
    });
    const nurse_five_seed = await prisma.Positions.create({
        data: {
            positionName: "Nurse V"
        }
    });
    const nurse_four_seed = await prisma.Positions.create({
        data: {
            positionName: "Nurse IV"
        }
    });
    const nurse_three_seed = await prisma.Positions.create({
        data: {
            positionName: "Nurse III"
        }
    });
    const nurse_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Nurse II"
        }
    });
    const nurse_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Nurse I"
        }
    });
    const nursing_attendant_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Nursing Attendant II"
        }
    });
    const nursing_attendant_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Nursing Attendant I"
        }
    });
    const nutritionist_dietitian_five_seed = await prisma.Positions.create({
        data: {
            positionName: "Nutritionist-Dietitian V"
        }
    });
    const nutritionist_dietitian_four_seed = await prisma.Positions.create({
        data: {
            positionName: "Nutritionist-Dietitian IV"
        }
    });
    const nutritionist_dietitian_three_seed = await prisma.Positions.create({
        data: {
            positionName: "Nutritionist-Dietitian III"
        }
    });
    const nutritionist_dietitian_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Nutritionist-Dietitian II"
        }
    });
    const nutritionist_dietitian_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Nutritionist-Dietitian I"
        }
    });

    const occupational_therapist_three_seed = await prisma.Positions.create({
        data: {
            positionName: "Occupational Therapist III"
        }
    });
    const occupational_therapist_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Occupational Therapist II"
        }
    });
    const occupational_therapist_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Occupational Therapist I"
        }
    });

    const pharmacist_five_seed = await prisma.Positions.create({
        data: {
            positionName: "Pharmacist V"
        }
    });
    const pharmacist_four_seed = await prisma.Positions.create({
        data: {
            positionName: "Pharmacist IV"
        }
    });
    const pharmacist_three_seed = await prisma.Positions.create({
        data: {
            positionName: "Pharmacist III"
        }
    });
    const pharmacist_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Pharmacist II"
        }
    });
    const pharmacist_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Pharmacist I"
        }
    });
    const physical_therapist_three_seed = await prisma.Positions.create({
        data: {
            positionName: "Physical Therapist III"
        }
    });
    const physical_therapist_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Physical Therapist II"
        }
    });
    const physical_therapist_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Physical Therapist I"
        }
    });
    const planning_officer_three_seed = await prisma.Positions.create({
        data: {
            positionName: "Planning Officer III"
        }
    });
    const planning_officer_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Planning Officer II"
        }
    });
    const planning_officer_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Planning Officer I"
        }
    });
    const psychologist_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Psychologist II"
        }
    });

    const radiologic_technologist_three_seed = await prisma.Positions.create({
        data: {
            positionName: "Radiologic Technologist III"
        }
    });
    const radiologic_technologist_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Radiologic Technologist II"
        }
    });
    const radiologic_technologist_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Radiologic Technologist I"
        }
    });
    const records_officer_four_seed = await prisma.Positions.create({
        data: {
            positionName: "Records Officer IV"
        }
    });
    const records_officer_three_seed = await prisma.Positions.create({
        data: {
            positionName: "Records Officer III"
        }
    });
    const records_officer_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Records Officer II"
        }
    });
    const records_officer_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Records Officer I"
        }
    });
    const respiratory_therapist_three_seed = await prisma.Positions.create({
        data: {
            positionName: "Respiratory Therapist III"
        }
    });
    const respiratory_therapist_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Respiratory Therapist II"
        }
    });
    const respiratory_therapist_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Respiratory Therapist I"
        }
    });

    const seamstress_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Seamstress I"
        }
    });
    const social_welfare_assistant_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Social Welfare Assistant I"
        }
    });
    const social_welfare_officer_four_seed = await prisma.Positions.create({
        data: {
            positionName: "Social Welfare Officer IV"
        }
    });
    const social_welfare_officer_three_seed = await prisma.Positions.create({
        data: {
            positionName: "Social Welfare Officer III"
        }
    });
    const social_welfare_officer_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Social Welfare Officer II"
        }
    });
    const social_welfare_officer_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Social Welfare Officer I"
        }
    });
    const speech_therapist_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Speech Therapist II"
        }
    });
    const speech_therapist_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Speech Therapist I"
        }
    });
    const statistician_three_seed = await prisma.Positions.create({
        data: {
            positionName: "Statistician III"
        }
    });
    const statistician_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Statistician II"
        }
    });
    const statistician_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Statistician I"
        }
    });
    const supervising_administrative_officer_seed = await prisma.Positions.create({
        data: {
            positionName: "Supervising Administrative Officer"
        }
    });
    const supervising_health_program_officer_seed = await prisma.Positions.create({
        data: {
            positionName: "Supervising Health Program Officer"
        }
    });

    const training_assistant_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Training Assistant I"
        }
    });
    const training_specialist_four_seed = await prisma.Positions.create({
        data: {
            positionName: "Training Specialist IV"
        }
    });
    const training_specialist_three_seed = await prisma.Positions.create({
        data: {
            positionName: "Training Specialist III"
        }
    });
    const training_specialist_two_seed = await prisma.Positions.create({
        data: {
            positionName: "Training Specialist II"
        }
    });
    const training_specialist_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Training Specialist I"
        }
    });

    const ward_assistant_one_seed = await prisma.Positions.create({
        data: {
            positionName: "Ward Assistant I"
        }
    });
    const warehouseman_three_seed = await prisma.Positions.create({
        data: {
            positionName: "Warehouseman III"
        }
    });
}

seedPositions()
.then(async () => {
    await prisma.$disconnect();
})
.catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});

// ! ---------------------------------------------------------------------------------------------------