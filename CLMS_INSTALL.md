# CLMS Installation (backend, frontend, database)
## Prepare
```
$ mkdir WORK
$ cd WORK
```
## Clone
```
(WORK)$ git clone git@github.com:eea/clms-frontend.git
(WORK)$ cd clms-frontend/
(clms-frontend)$ git submodule init
(clms-frontend)$ git submodule update
(clms-frontend)$ git checkout develop
(clms-frontend)$ git pull
```

## Backend
```
(clms-frontend)$ cp docker-compose.example.yml docker-compose.override.yml

(clms-frontend)$ docker-compose up
(clms-frontend, in a new tab)$ docker-compose exec backend bash
root@c7f52c675b48:/app# ./docker-entrypoint.sh start
2024-09-05 11:40:18 INFO [waitress:486][MainThread] Serving on http://0.0.0.0:8080
```
Result: http://localhost:8080/Plone/en - empty default Plone

## Frontend
```
with backend running
(clms-frontend, in a new tab)$ nvm use v18.18.2
(clms-frontend)$ yarn
(clms-frontend)$ make develop
(clms-frontend)$ yarn
(clms-frontend)$ yarn start
Proxying API requests from http://localhost:3000/++api++ to http://localhost:8080/Plone
Volto started at 0.0.0.0:3000
```
Result: http://localhost:3000/en - empty default plone with volto (and copernicus theme)

## Backend sources (plone addons)
```
$ docker-compose exec backend bash
root@d64f9d5fb0a8:/app# cp -r sources/* /app/dev-sources
```
close frontend, backend, docker

```
(clms-frontend)$ vim docker-compose.override.yml
uncomment line
- ./sources:/app/sources
(clms-frontend)$ docker-compose up
```
Close docker. Now you have the sources.
```
(clms-frontend)$ ls sources
clms.addon  clms.downloadtool  clms.statstool  clms.types  eea.meeting  ftw.tokenauth  pas.plugins.oidc
```

## Database
close frontend, backend, docker
```
(clms-frontend)$ sudo su -
```

### Delete default empty database:
```
(clms-frontend)$ mc
go to WORK/clms-frontend/data/blobstorage/
delete everything inside blobstorage folder
go to WORK/clms-frontend/data/filestorage
delete everything inside filestorage folder
```

### Then copy the real database
```
paste blobstorage contents into WORK/clms-frontend/data/blobstorage/
paste filestorage contents into WORK/clms-frontend/data/filestorage/
```

### Close terminal tab, no more root admin user needed.

### Solve permissions:
```
(clms-frontend)$ vim fix_permissions

#!/bin/sh
sudo chown -R `whoami` .
sudo setfacl  -R -m u:500:rwX sources/
sudo setfacl -dR -m u:500:rwX sources/
getfacl sources/
```
Save the file
```
(clms-frontend)$ chmod +x fix_permissions.sh
(clms-frontend)$ ./fix_permissions

(clms-frontend)$ sudo chown -R 500 data/
```

## Test plone addons editing (clms.types)
```
(clms-frontend)$ vim sources/clms.types/clms/types/content/data_set.py
    characteristics_type = schema.Choice(
        title=_(
            "Type UPDATED",
        ),
```
save the file, restart the app

Run backend
http://localhost:8080/Plone/en
Run frontend
http://localhost:3000/

http://localhost:3000/en/products/water-bodies/
Add a new Data set
Expected result: In Data characteristics tab "Type UPDATED" instead of "Type" title.
