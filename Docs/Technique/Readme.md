# Sommaire de la documentation technique

[[TOC]]

## Docker Compose

### Pr�requis

- Docker
- Ajouter les lignes suivantes � son fichier `/etc/hosts` (Windows : Powershell en mode Admin `notepad.exe .\drivers\etc\hosts`) :

```txt
127.0.0.1 scssokeycloak
127.0.0.1 scapplifront
127.0.0.1 redis-commander
127.0.0.1 scuserapi
```


### Lancer le projet

#### Mode Production

A la racine du répertoire :

```bash
# Mode Production
## Mode "Arc-en-ciel"
docker-compose up
## Mode Background
docker-compose up -d 
## Tout rebuild
docker-compose up --build --force-recreate -V  

## Tout supprimer
docker-compose down 
```

On peut aussi cibler des services en particulier, voici un ensemble d'exemples :

#### Mode Developement

A la racine du répertoire :

```bash
# Mode Developpement (en cours mais fonctionnel)
## Mode "Arc-en-ciel"
docker-compose -f docker-compose.yml -f docker-compose.override.yml -f docker-compose.dev.yml up 
## Mêmes options que pour le mode Prod après le "up"

## Tout supprimer
docker-compose -f docker-compose.yml -f docker-compose.override.yml -f docker-compose.dev.yml down 

```

#### Cibler des services


On peut aussi cibler des services en particulier, voici un ensemble d'exemples courants :

| Groupe | Services | Commande |
|:--:|:--:|:--:|
| SSO | Keycloak, Postgresql, AppliFront | `docker-compose up local.sso.keycloak local.sso.postgres sc.appli.front` |
| TrackerApi | TrackerApi, Redis, RedisCommander | `docker-compose up local.redis redis.commander sc.tracker.api` |
| Mailer | Mailer | `docker-compose up sc.mailer.api` |
| User | UserApi, Azurite | `docker-compose up local.azurite sc.usermanagment.api` |
| Notification | NotificationApi | `docker-compose up sc.notification.api` |
| Suite1 | SSO, Mailer, UserApi, Azurite | `docker-compose up local.sso.keycloak local.sso.postgres sc.appli.front sc.mailer.api local.azurite sc.usermanagment.api` |
| Suite2 | SSO, NotificationApi, UserApi, Azurite | `docker-compose up local.sso.keycloak local.sso.postgres sc.appli.front local.azurite sc.usermanagment.api sc.notification.api` |


 docker-compose -f docker-compose.yml -f docker-compose.override.yml -f docker-compose.dev.yml up --build -V --force-recreate local.sso.keycloak local.sso.postgres sc.appli.test


## Tester les projets

|Stack | Nom | Url (docker-compose) | Documentation |
|-----:|:--:|:--:|:--:|
| C#, net6 | UserManagementApi | [https://localhost:5443/swagger/index.thml](https://localhost:5443/swagger/index.thml) | Documentation |
| Js, node16 | TrackerApi | [http://localhost:4000](https://localhost:4000) | Documentation |
| PHP7.4, symfony5.6 | MailerApi | [http://localhost:8000/](https://localhost:8000/) | Documentation |
| React, Ts | AppliFront | [http://localhost:3300/](http://localhost:3300/) | Documentation |
| Js, node | Redis-Commander | [http://redis-commander:8081/](http://redis-commander:8081/) | Documentation |
| XXXX | NotifierApi | [http://localhost:6000/](http://localhost:6000/) | Documentation |



## Kubernetes



