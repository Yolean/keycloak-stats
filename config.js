const KEYCLOAK_USER = process.env.KEYCLOAK_USER || 'admin';
const KEYCLOAK_PASSWORD = process.env.KEYCLOAK_PASSWORD || 'openidctest';

module.exports = {
  port: 3000,
  keycloakHost: 'http://localhost:8080',
  keycloakAuth: { username: KEYCLOAK_USER, password: KEYCLOAK_PASSWORD }
};