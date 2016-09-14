const KEYCLOAK_USER = process.env.KEYCLOAK_USER || 'admin';
const KEYCLOAK_PASSWORD = process.env.KEYCLOAK_PASSWORD || 'openidctest';
const KEYCLOAK_HOST = process.env.KEYCLOAK_HOST || 'http://keycloak:8080';

module.exports = {
  port: 80,
  keycloakHost: KEYCLOAK_HOST,
  keycloakAuth: { username: KEYCLOAK_USER, password: KEYCLOAK_PASSWORD }
};
