# generator-loopback-ansible
Generates a Loopback application with a Vagrant virtual machine and an Ansible provisioning for the local machine, a staging machine and a production machine

## Prerequisites

You need to install:

+ Yeoman
+ [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
+ [Vagrant](https://www.vagrantup.com/downloads.html)
+ Node.js (> 6.x) + Npm (via nvm)
+ [Ansible (version 2)](http://docs.ansible.com/ansible/intro_installation.html)
+ [Yarn](https://yarnpkg.com/lang/en/docs/install/)

## Installation

```
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
