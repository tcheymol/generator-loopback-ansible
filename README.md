## Requirements
You need some tools to
+ VirtualBox
+ vagrant
+ [Ansible 2](http://docs.ansible.com/ansible/intro_installation.html#getting-ansible)
+ nodejs
+ Loopback-cli `npm install -g loopback-cli`
+ Yeoman `npm install -g yeoman`

## Installation:

Add the local generator:

```
git clone https://github.com/cRicateau/generator-javascript-stack
cd generator-javascript-stack
npm link
```

In a new empty directory created for your app:

- **Add a Loopback app**
```
yo ansible-loopback-react-redux:backend
```

- **Add the react-redux starter kit**

```
yo ansible-loopback-react-redux:frontend
```

- **Add the provisioning and the deployment tool with shipit**
```
yo ansible-loopback-react-redux:provisioning
yo ansible-loopback-react-redux:deployment
```

## Installation

## Usage

Follow the readme of the project you generated!
