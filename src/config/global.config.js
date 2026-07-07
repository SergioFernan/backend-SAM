// roles disponibles en el sistema
const ROLES = {
    USER: "user",       // usuario normal, solo puede ver y comprar entradas
    ADMIN: "admin",     // administrador, tiene acceso a todo
    COMPANY: "company", // empresa o banda que puede registrar y gestionar eventos
};

// lista de roles validos para usar en validaciones de enum
const ROLES_LIST = Object.values(ROLES); // ["user", "admin", "empresa"]

// etiquetas legibles para mostrar en el frontend
const ROLE_LABELS = {
    [ROLES.USER]: "Usuario",
    [ROLES.ADMIN]: "Administrador",
    [ROLES.COMPANY]: "Empresa",
};

export { ROLES, ROLES_LIST, ROLE_LABELS };