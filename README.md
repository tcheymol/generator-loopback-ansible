# generator-loopback-ansible
Generates a Loopback application with a Vagrant virtual machine and an Ansible provisioning for the local machine, a staging machine and a production machine

## Prerequisites
You need some tools to
+ VirtualBox
+ vagrant
+ Ansible :bangbang: You need Ansible 1.9.6, and not version 2

## Installation
```
npm install -g generator-loopback-ansible
```

## Usage
Create a new project
```
mkdir myAwesomeProject
cd myAwesomeProject
npm init
```
Now, you will have a few answers to provide.

Then, you can set up the provisioning
```
yo loopback-ansible:provisioning
vagrant up
```
Now, set up the server
```
yo loopback-ansible:loopback
```

Then, you can run your server
```
vagrant ssh
sudo su - www-data
cd myAwesomeProject/current/server
yarn
yarn start
```

Now, you are set up !

You can browse a static page served by Loopback at the following url : `http://10.0.0.10`
You can also browse Loopback's explorer at : `http://10.0.0.10/explorer`

## The provisioning

To provision a remote machine, you need to add your ssh public key to the `~/.ssh/authorized_keys` file of the root user of the remote machine

You can now provision your remote staging machine :
```
ansible-playbook -i devops/provisioning/hosts/staging devops/provisioning/playbook.yml
```

:bangbang: On Ubuntu 16.04, python is not installed by default, so you can't use Ansible to provision it and get the following error message : `/bin/sh: 1: /usr/bin/python: not found`. If so, ssh to the machine and install python-simplejson.
```
sudo apt-get update
sudo apt-get install python-simplejson
```
Now, you can relaunch
```
ansible-playbook -i devops/provisioning/hosts/staging devops/provisioning/playbook.yml
```

Then, you have to ssh to your machine as root and add your ssh key to the www-data user to be able to run the server and deploy as www-data
```
sudo su - www-data
vim .ssh/authorized_keys
```
Then, paste your ssh public key to this file

## The deployment
You can now setup the deployment in production and staging with the following command:
```
yo loopback-ansible:deployment
```

To deploy a provisionned staging machine, run:
```
./node_modules/.bin/shipit staging deploy
```
To deploy a provisionned production machine, run:
```
./node_modules/.bin/shipit prod deploy
```

## Roadmap
+ Add an admin generator
