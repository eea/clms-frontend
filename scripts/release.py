#!/bin/env python
import os
import sys
import json
from pprint import pprint
import subprocess
import argparse
import urllib.request

VOLTO = "https://raw.githubusercontent.com/plone/volto/master/package.json"
KITKAT = "https://raw.githubusercontent.com/eea/volto-eea-kitkat/develop/package.json"

def main(verbose, skip):
    versions = {}
    kitkat = []
    to_be_release = []
    prod_volto = 'PROD'
    dev_volto = 'DEV'
    latest_volto = 'LATEST'

    # Get PROD
    with open("package.json", "r") as ofile:
        config = json.load(ofile)
        dev_volto = config['dependencies']['@plone/volto']

        for package, version in config['dependencies'].items():
            if package == "@plone/volto":
                prod_volto = version
                continue

            tag = version.split("#")[-1]
            versions[package] = tag

    with urllib.request.urlopen(KITKAT) as ofile:
        config = json.load(ofile)

        for package, version in config['dependencies'].items():
            tag = version.split("#")[-1]
            versions[package] = tag
            kitkat.append(package)

    # Get LATEST
    print("====================")
    with urllib.request.urlopen(VOLTO) as ofile:
        volto = json.load(ofile)
        latest_volto = volto['version']

    # Volto
    if dev_volto != latest_volto:
        print("DEV: \t @plone/volto: %s -> %s" % (dev_volto, latest_volto))
    if prod_volto != latest_volto:
        print("PROD:\t @plone/volto: %s -> %s" % (prod_volto, latest_volto))

    # Add-ons
    with open("jsconfig.json", "r") as ofile:
        config = json.load(ofile)

        for addon, paths in config['compilerOptions']['paths'].items():
            path = paths[0]
            release = versions.get(addon)
            if not release:
                to_be_release.append(addon)
                continue

            with subprocess.Popen(
                ["git", "log", "--pretty=oneline", "--abbrev-commit", "%s..HEAD" % release],
                cwd=os.path.join(os.getcwd(), "src", path), stdout=subprocess.PIPE) as proc:
                res = proc.stdout.read()
                # commits = res
                commits = []
                for commit in res.split(b'\n'):
                    if not commit.strip():
                        continue
                    skip_me = False
                    if skip:
                        for s in skip:
                            if s in str(commit.lower()):
                                skip_me = True
                                break
                    if skip_me:
                        continue
                    commits.append(commit)
                if commits:
                    if(verbose):
                        print("==================== %s " % path)
                        print(res.decode('utf-8'))
                    prefix = "KITKAT" if addon in kitkat else "FRONT"
                    to_be_release.append("%s:\t %s: %s ->" % (prefix, addon, release))

    return to_be_release

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('-v', '--verbose', help='Verbose', action='store_true')
    parser.add_argument('-s', '--skip', help='Skip commits: e.g.: -s sonarqube', action='append', default=[])
    args = parser.parse_args()
    res = main(args.verbose, args.skip)
    print("==================== Add-ons to be released: \n%s\n====================" % "\n".join(res))