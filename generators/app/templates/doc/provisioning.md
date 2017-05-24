## The provisioning

### Provisioning of a remote server

To provision a remote machine, you need ssh access to the server as root.

- Provision the remote staging server :
```
ansible-playbook -i devops/provisioning/hosts/staging devops/provisioning/playbook.yml
```

The provisioning will create the user **www-data**. In order to have ssh access as www-data to deploy your code:

- Add your ssh public key to the `~/.ssh/authorized_keys` file of the **www-data** user of the remote machine to be able to deploy as www-data.
  - `ssh user@IP`
  - `sudo su www-data`
  - `vim ~/.ssh/authorized_keys`
  - copy-paste your public key and save


### Troubleshooting

:bangbang: If you provision a server on Ubuntu 16.04, python is not installed by default, so you can't use Ansible to provision it and get the following error message : `/bin/sh: 1: /usr/bin/python: not found`. If so, ssh to the machine and install python-simplejson.
```
sudo apt-get update
sudo apt-get install python-simplejson
```
Now, you can relaunch
```
ansible-playbook -i devops/provisioning/hosts/staging devops/provisioning/playbook.yml
```
