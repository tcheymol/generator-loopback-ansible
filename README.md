# generator-loopback-ansible
Generates a Loopback application with a Vagrant virtual machine and an Ansible provisioning for the local machine, a staging machine and a production machine

## Prerequisites

You need to install:

+ VirtualBox
+ Vagrant
+ Npm (via nvm)
+ Ansible (version 2)
+ Yarn

## Installation

```
git clone git@github.com:cRicateau/generator-loopback-ansible.git
cd generator-loopback-ansible && npm link
npm install -g generator-loopback-ansible
```

## Usage

Create a new project
```
mkdir myAwesomeProject
cd myAwesomeProject
```

```
yo loopback-ansible
```

Then follow the generated documentation.

## Troubleshooting

At the moment, the `xubuntu` distrib doesn't support the vagrant `synced_folder` parameter with `xenial` OS, please choose `trusty` option if you are in that case
