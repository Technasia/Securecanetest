import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
 url: "https://localhost:8443/",
 realm: "SSO-realm",
 clientId: "appli-front-react",
});

export default keycloak;