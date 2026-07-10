import { ALLOWED_ROLES, ROLE_LABELS } from '../config/global.config.js';

const dbGetRoles = () => {
    return ALLOWED_ROLES.map( (role) => ({
        id: role,
        name: role,
        label: ROLE_LABELS [ role ]
    }));
};

export { dbGetRoles };
