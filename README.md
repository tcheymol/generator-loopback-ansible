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


## Roadmap
+ Add deployment with Shipit
+ Add an admin generator
