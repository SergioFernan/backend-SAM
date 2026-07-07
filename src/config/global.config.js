// Definicion global de roles de usuario

// Retorta un objeto con todos los roles, permitidos o podemos obtener solo uno de ellos
export const ROLES = {
    ADMIN: 'ADMIN',
    USER: 'USER'
};

// Retorna el listado de los roles permitidos
export const ALLOWED_ROLES = Object.values( ROLES );

export const ROLE_LABELS = {
    [ROLES.ADMIN]: 'Administrador',
    [ROLES.USER]: 'Usuario'
}; 