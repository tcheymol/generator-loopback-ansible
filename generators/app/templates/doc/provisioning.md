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
