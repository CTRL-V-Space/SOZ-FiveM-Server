import { Job, JobPermission, JobPermissionData, JobType } from '@public/shared/job';

export const CTRLJobRegistry: Record<JobType, Omit<Job, 'id'>> = {
    [JobType.NIA]: {
        label: 'National Investigation Agency',
        platePrefix: 'NIA ',
        menuCallback: 'soz-jobs:client:police:OpenSocietyMenu',
        permissions: {
            [JobPermission.SocietyDealershipVehicle]: { label: 'Accès aux concessionnaires de véhicules' },
        },
        phone: '555-NIA',
        canReceiveSocietyInvoice: true,
    },
    [JobType.USMS]: {
        label: 'United States Marshals Service',
        platePrefix: 'USMS ',
        menuCallback: 'soz-jobs:client:police:OpenSocietyMenu',
        permissions: {
            [JobPermission.SocietyDealershipVehicle]: { label: 'Accès aux concessionnaires de véhicules' },
        },
        phone: '555-USMS',
        canReceiveSocietyInvoice: true,
    },
};