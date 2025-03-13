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
(clms-frontend)$ git checkout develop
(clms-frontend)$ git pull
(clms-frontend)$ git submodule init
(clms-frontend)$ git submodule update
(clms-frontend)$ cd eea.docker.plone.clms
(eea.docker.plone.clms)$ git checkout master
(eea.docker.plone.clms)$ cd ..
```

## Backend
```
(clms-frontend)$ cp docker-compose.example.yml docker-compose.override.yml
(clms-frontend)$ docker-compose up
    container.image_config['ContainerConfig'].get('Volumes') or {}
KeyError: 'ContainerConfig'
(clms-frontend)$ docker-compose down
(clms-frontend)$ docker-compose up

(clms-frontend, in a new tab)$ docker-compose exec backend bash
app# ./docker-entrypoint.sh start
zope.configuration.xmlconfig.ZopeXMLConfigurationError: File "/app/lib/python3.11/site-packages/Products/CMFPlone/meta.zcml", line 66.2-70.8
    File "/app/etc/site.zcml", line 10.2-10.39
    ModuleNotFoundError: No module named 'clms.addon

app# bin/mxdev -c sources.ini
🎂 You are now ready for: pip install -r requirements-mxdev.txt
   (path to pip may vary dependent on your installation method)
   
app# bin/pip install -r requirements-mxdev.txt
Successfully installed

app# ./docker-entrypoint.sh start
2025-03-13 14:35:31 INFO [Zope:42][MainThread] Ready to handle requests
Starting server in PID 648.
2025-03-13 14:35:32 INFO [waitress:486][MainThread] Serving on http://0.0.0.0:8080

(clms-frontend)$ ls eea.docker.plone.clms/sources/
clms.addon  clms.downloadtool  clms.statstool  clms.types  eea.meeting  eea.volto.policy  ftw.tokenauth  pas.plugins.oidc

(clms-frontend)$ sudo chown -R (whoami) eea.docker.plone.clms/sources
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
(clms-frontend)$ sudo chown -R 500 data/
```

## Add manager user (admin)

https://github.com/plone/volto/issues/2810#issuecomment-1384056419

Then you can login with your user/password: http://localhost:3000/en/login-plone

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
