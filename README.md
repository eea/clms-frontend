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