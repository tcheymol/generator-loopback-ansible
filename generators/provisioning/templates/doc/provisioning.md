## The provisioning

To provision a remote machine, you need to add your ssh public key to the `~/.ssh/authorized_keys` file of the root user of the remote machine

You can now provision your remote staging machine :
```
ansible-playbook -i devops/provisioning/hosts/staging devops/provisioning/playbook.yml
```

:bangbang: If you provision a server on Ubuntu 16.04, python is not installed by default, so you can't use Ansible to provision it and get the following error message : `/bin/sh: 1: /usr/bin/python: not found`. If so, ssh to the machine and install python-simplejson.
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
