export const CREATE_USER = `
INSERT INTO usuarios (email, password, rol, lenguage)
VALUES ($1, $2, $3, $4) RETURNING email, rol, lenguage
`;

export const GET_USER_BY_EMAIL = `
SELECT email, password, rol, lenguage
FROM usuarios
WHERE email = $1
`;