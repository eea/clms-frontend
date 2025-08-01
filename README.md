[![Release](https://img.shields.io/github/v/release/eea/clms-frontend?sort=semver)](https://github.com/eea/clms-frontend/releases)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto/clms-frontend/master&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto/job/clms-frontend/job/master/display/redirect)
[![Pipeline develop](https://ci.eionet.europa.eu/buildStatus/icon?job=volto%2Fclms-frontend%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto/job/clms-frontend/job/develop/lastBuild/display/redirect)
[![Release pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto%2Fclms-frontend%2F3.442.0&build=last&subject=release%20v3.442.0%20pipeline)](https://ci.eionet.europa.eu/view/Github/job/volto/job/clms-frontend/job/3.442.0/lastBuild/display/redirect/)

## [CLMS Installation](https://github.com/eea/clms-frontend/blob/develop/CLMS_INSTALL.md) full guide


## Frontend dockerhub image

[eeacms/clms-frontend](https://hub.docker.com/r/eeacms/clms-frontend)

## Backend

[eeacms/clms-backend](https://github.com/eea/eea.docker.plone.clms)

## CLMS

Website of the CLMS portal

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


## Automated @eeacms dependencies upgrades

All the addon dependencies that are located in the dependencies section of `package.json` file that belong to @eeacms and have a `MAJOR.MINOR.PATCH` version are automatedly upgraded on the release of a new version of the addon. This upgrade is done directly on the `develop` branch. 

Exceptions from automated upgrades ( see https://docs.npmjs.com/cli/v8/configuring-npm/package-json#dependencies for dependency configuration examples ) :
* All github or local paths 
* Any version intervals ( `^version` or `>version` or `MAJOR.MINOR.x` etc )

## Release

## Build and QA testing on clms-staging

In some scenarios it's beneficial to have a deployed Volto system that runs a specific branch. We use the clms-staging stack in Rancher S3 - CLMS Staging environment. Create a shell in the `frontend` container, run `tmux a` (if this fail, start a new tmux session with `tmux`). If Volto is already started, stop it with CTRL+C. You can go to `src/addons/<addon>` and switch branches, git pull, etc. In the main /app frontend folder, you have to create a new build, using `NODE_OPTIONS=--max-old-space-size=7900 yarn build`. Then you can start the frontend with `yarn start:prod`. You can detach from tmux with `ctrl+b d`. 
  
### Automatic release using Jenkins

#### Release flow

The release flow on Volto projects is split in 2 Jenkins jobs:

* A job that runs on every commit on master and creates a production ready GitHub release and tag with the version from `package.json`
* A job that runs on every new tag ( including the one created in the first job): 
    * A new Docker image is built and released automatically on [DockerHub](https://hub.docker.com/r/eeacms/ims-frontend) with the release tag.
    * A new entry is automatically added to [Volto - IMS](https://github.com/eea/eea.rancher.catalog/tree/master/templates/volto-ims) `EEA Rancher Catalog` with the release tag
    * If the project demo stack is configured in `RANCHER_STACKID`, the demo stack is automatically upgraded to the newly created template version
    * If the project url is configured in `SONARQUBE_TAG`, all volto addon dependencies will be updated both in SonarQube and their `develop` Jenkinsfile with the project url

#### How to start a Production release

*  The automatic release is started by creating a [Pull Request](../../compare/master...develop) from `develop` to `master`. The pull request status checks correlated to the branch and PR Jenkins jobs need to be processed successfully. 1 review from a github user with rights is mandatory.
* It runs on every commit on `master` branch, which is protected from direct commits, only allowing pull request merge commits.
* The automatic release is done by [Jenkins](https://ci.eionet.europa.eu). The status of the release job can be seen both in the `README.md` badges and the green check/red cross/yellow circle near the last commit information. If you click on the icon, you will have the list of checks that were run. The `continuous-integration/jenkins/branch` link goes to the Jenkins job execution webpage.
* Automated release scripts are located in the `eeacms/gitflow` docker image, specifically [frontend-release.sh](https://github.com/eea/eea.docker.gitflow/blob/master/src/frontend-release.sh) script. It  uses the `release-it` tool.
* As long as a PR request is open from develop to master, the PR Jenkins job will automatically re-create the CHANGELOG.md and package.json files to be production-ready.
* The version format must be MAJOR.MINOR.PATCH. By default, next release is set to next minor version (with patch 0).
* You can manually change the version in `package.json`.  The new version must not be already present in the tags/releases of the repository, otherwise it will be automatically increased by the script. Any changes to the version will trigger a `CHANGELOG.md` re-generation.
* Automated commits and commits with [JENKINS] or [YARN] in the commit log are excluded from `CHANGELOG.md` file.


> The release job that runs on the `master` branch only creates the release in GitHub. The release job that runs on the new tag is the one that does the rest. 


### Manual release from the develop branch ( beta release )

#### Installation and configuration of release-it

You need to first install the [release-it](https://github.com/release-it/release-it)  client.

   ```
   npm install -g release-it
   ```

Release-it uses the configuration written in the [`.release-it.json`](./.release-it.json) file located in the root of the repository.

Release-it is a tool that automates 4 important steps in the release process:

1. Version increase in `package.json` ( increased from the current version in `package.json`)
2. `CHANGELOG.md` automatic generation from commit messages ( grouped by releases )
3. GitHub release on the commit with the changelog and package.json modification on the develop branch

To configure the authentification, you need to export GITHUB_TOKEN for [GitHub](https://github.com/settings/tokens)

   ```
   export GITHUB_TOKEN=XXX-XXXXXXXXXXXXXXXXXXXXXX
   ```

 To configure npm, you can use the `npm login` command or use a configuration file with a TOKEN :

   ```
   echo "//registry.npmjs.org/:_authToken=YYYYYYYYYYYYYYYYYYYYYYYYYYYYYY" > .npmrc
   ```

#### Using release-it tool

There are 3 yarn scripts that can be run to do the release

##### yarn release-beta

Automatically calculates and presents 3 beta versions - patch, minor and major for you to choose ( or Other for manual input).

```
? Select increment (next version):
❯ prepatch (0.1.1-beta.0)
  preminor (0.2.0-beta.0)
  premajor (1.0.0-beta.0)
  Other, please specify...
```

##### yarn release-major-beta

Same as `yarn release-beta`, but with premajor version pre-selected.

##### yarn release

Generic command, does not automatically add the `beta` to version, but you can still manually write it if you choose Other.

#### Important notes

> The release can be triggered by creating a new tag in the GitHub repository. It is not recommended to do this, because both the version from `package.json` and the `CHANGELOG.md` files will be desynchronized.

> Do not use release-it tool on master branch, the commit on CHANGELOG.md file and the version increase in the package.json file can't be done without a PULL REQUEST.

> Do not keep Pull Requests from develop to master branches open when you are doing beta releases from the develop branch. As long as a PR to master is open, an automatic script will run on every commit and will update both the version and the changelog to a production-ready state - ( MAJOR.MINOR.PATCH mandatory format for version).



## Production

We use [Docker](https://www.docker.com/), [Rancher](https://rancher.com/) and [Jenkins](https://jenkins.io/) to deploy this application in production.

### Deploy

* Within `Rancher > Catalog > EEA` deploy [Volto - CLMS](https://github.com/eea/eea.rancher.catalog/tree/master/templates/volto-clms)

### Upgrade

* Within your Rancher environment click on the `Upgrade available` yellow button next to your stack.


* Confirm the upgrade

* Or roll-back if something went wrong and abort the upgrade procedure.
