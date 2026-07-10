import { dbGetRoles } from '../services/role.services.js';

const getRoles = (req, res) => {
    const roles = dbGetRoles();

    res.json({
        msg: `Obtiene todos los roles definidos para la aplicación`,
        roles: roles
    });
};
export default getRoles;