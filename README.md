# generator-loopback-ansible

This generator scripts everything you need to start a JS fullstack project:
- [Loopback](http://loopback.io/) (nodejs framework) server
- React, React-Redux or Angular4 client from awesome boilerplates
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


### Choose a starter-kit according to your needs

This generator will ask you to choose between 3 starter-kits (or no client at all).

- **React** from [Create React App starter-kit](https://github.com/facebookincubator/create-react-app):
  - A react starter-kit which generates a simple react app!
  - For who ?
    - Those who want to start with a minimalist react application and want to leverage the power of react-scripts to have their webpack config always up-to-date.


- **React-Redux** from [React Boilerplate](https://github.com/react-boilerplate/react-boilerplate):
  - A React-Redux starter-kit!
  - For who ?
      - Those who want to start with redux out of the box.


- **Angular4** from [Angular starter](https://github.com/AngularClass/angular-starter):
  - An Angular 4 starter-kit!
  - For who ?
    - Those who wants Angular!


### Install the generator

- Install the package:
```
npm install -g generator-loopback-ansible
```

## Usage

- Create a directory:
```
mkdir myAwesomeProject && cd myAwesomeProject
```

- Run the generator in the created directory:
```
yo loopback-ansible
```

Then follow the generated documentation installation steps.

## What's next ?

- Vault ansible files to be able to commit them.
- Add a choice between Loopback, Express and Sailjs for the backend

## Troubleshooting

At the moment, the `xubuntu` distrib doesn't support the vagrant `synced_folder` parameter with `xenial` OS, please choose `trusty` option if you are in that case

## Contributing to the generator

This generator is open-sourced and can be improved in many ways, feel free to contribute [here](https://github.com/tcheymol/generator-loopback-ansible) !

- Fork the repository.
- Clone the forked repository.
- Run `npm link`
