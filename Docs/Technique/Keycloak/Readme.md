# Documentation technique sur Keycloak


L'image de Keycloak importe des fichiers `*.json` en tant que configuration initiale.

Il se peut que l'on doive forcer le build de l'image pour y voir les nouveaux `*.json`.

## Exporter les Realms

### Via la console d'dministration

Boutons "Exporter".

### Via un shell

Lancer un shell dans Keycloak avec l'orchestrateur de votre choix (Docker, Kubernetes) :

```bash
docker exec -it  scssokeycloak -- /bin/bash
kubectl exec -it  scssokeycloak -- /bin/bash
```

Lancer la commande d'exportation :

```bash
mkdir drop
bin/kc.sh export --dir drop
# Throw des erreurs mais foncionne
```

Copiez les fichiers comme vous le pouvez (cat, etc...).


## Récupérer les informations de connection pour une application cliente

Exemple :

```json
{
    "realm": "applifront",
    "clientId": "scapplifront",
    "url": "http://scssokeycloak:8080/"
}
```
