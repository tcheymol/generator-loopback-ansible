# generator-loopback-ansible

This generator scripts everything you need to start a JS fullstack project:
- [Loopback](http://loopback.io/) (nodejs framework) server
- React or angular4 client from awesome boilerplates
- Ansible provisioning with node 8, nginx, www-data user, postgresql database
- Vagrant configuration
- Shipit deployment script

## Prerequisites

You need to install:

+ [Yeoman](http://yeoman.io/): `npm install -g yo`
+ [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
+ [Vagrant](https://www.vagrantup.com/downloads.html)
+ Node.js (> 6.x) + Npm (install it with [nvm](https://github.com/creationix/nvm)): `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash`
+ [Ansible (version 2)](http://docs.ansible.com/ansible/intro_installation.html)
+ [Yarn](https://yarnpkg.com/en/docs/install)

## Installation


Install the generator:

```
npm install -g generator-loopback-ansible
```

## What's next ?

- Vault ansible files
- Choice between Loopback, Express and Sailjs for the backend

## Usage

Create a new project:

- Create a directory:

```
mkdir myAwesomeProject
cd myAwesomeProject
```

- Run the generator in the created directory:

```
yo loopback-ansible
```

Then follow the generated documentation installation steps.

## Troubleshooting

At the moment, the `xubuntu` distrib doesn't support the vagrant `synced_folder` parameter with `xenial` OS, please choose `trusty` option if you are in that case

## Contributing to the generator

This generator is open-sourced and can be improved in many ways, feel free to contribute [here](https://github.com/tcheymol/generator-loopback-ansible) !

- Fork the repository.
- Clone the forked repository.
- Run `npm link`
