import { dbGetRoles } from "../services/role.service.js";

// obtiene los roles definidos en la aplicacion
const getRoles = (req, res) => {
    const roles = dbGetRoles();
    res.status(200).json({
        msg: "Roles disponibles en el sistema",
        data: roles
    });
};

export default getRoles;