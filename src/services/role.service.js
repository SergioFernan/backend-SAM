import { ROLE_LABELS, ROLES_LIST } from "../config/global.config.js";

const dbGetRoles = () => {
    return ROLES_LIST.map(
        (role) => {
            return {
                id: role,
                name: ROLE_LABELS[role]
            }
        }
    )
}

export { dbGetRoles };