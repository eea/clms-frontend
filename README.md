## Documentation

A training on how to create your own website using Volto is available as part of the Plone training at [https://training.plone.org/5/volto/index.html](https://training.plone.org/5/volto/index.html).

## How to start

Clone this repository:

```bash
$ git clone git@github.com:eea/clms-frontend.git
```

In the project directory, execute below commands to get running this project.

### `yarn`

Installs needed packages to start the project.

### `yarn develop`

It has the same effect as executing:

```bash
missdev --config=jsconfig.json --output=addons
```

It brings needed development packages to the src/addons folder.

### `yarn start`

Runs the project in development mode.  
You can view your application at `http://localhost:3000`

The page will reload if you make edits.

### `yarn plone`
Runs the plone docker-compose in development mode.

### `yarn upgrade-volto`
Runs command to upgrade volto to latest version.

## It can be helpful

### mr_developer

[mr_developer](https://www.npmjs.com/package/mr-developer) is a great tool
for developing multiple packages at the same time.

mr_developer should work with this project by using the `--config` config option:

```bash
mrdeveloper --config=jsconfig.json
```

Volto's latest razzle config will pay attention to your jsconfig.json file
for any customizations.

## Run Plone

You will need a running Plone instance to work with this front-end.

To do so you can make use of the provided [docker-compose](https://docs.docker.com/compose/install/) file as follows:

```bash

$ docker-compose -f docker-compose-just-plone.yml up
```

This will start a Plone instance on your computer listening on 8080. After starting the Plone instance for the first time
you need to open localhost:8080 in a browser, log in with the default user and password, go to the [Plone addons control panel](http://localhost:8080/Plone/prefs_install_products_form) and install the following add-ons:

- plone.restapi
- collective.folderishtypes:default
- collective.folderishtypes: plone.app.contenttypes types with folderish behavior
