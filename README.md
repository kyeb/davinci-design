## Dev setup

### Frontend

Running `scripts/dev-frontend.sh` will run the Parcel bundler, which does the following:

- Builds from the `index.html` entrypoint
- Serves the site at http://localhost:1234
- Rebuilds on changes to any frontend source file
- Hot reloading for the frontend
- Sets up a reverse proxy for backend paths

### Backend

Running `scripts/dev-backend.sh` will run the Python app that serves the `/api/*` endpoints. It also has hot reloading on file changes.

## Deploying

### Quick start

Just run `scripts/deploy.sh`.

### Full guide

Set up your hosts:
`echo "[servers]\nmain ansible_host=<INSERT IP OF HOST> ansible_user=root" > ansible/hosts`

Add the IP address of the hosts you need to deploy to.

On a fresh box:
`ansible-playbook -i ansible/hosts ansible/initial-setup.yaml`

To redeploy to a box previously set up:
`ansible-playbook -i ansible/hosts ansible/deploy.yaml`

To make sure you don't forget to actually rebuild the frontend assets locally before deploying, prefer `scripts/deploy.sh`.
