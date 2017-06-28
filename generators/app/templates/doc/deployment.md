## The deployment

- Create a git repository: `git init`

- Add this repository on a remote git url (github for example).

- Configure the shipitfile with the remote repository url and the server IP address if you haven't done it yet.

- Launch deploy script:
```bash
./node_modules/.bin/shipit staging deploy
```

If deployment fails, it maybe because npm install requires a lot of memory. To bypass this issue, [add some swap file](https://www.cyberciti.biz/faq/linux-add-a-swap-file-howto/)
