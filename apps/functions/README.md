## Functions

Functions project use [Firebase Functions](https://firebase.google.com/docs/functions), serverless functions as a backend.

## Caveats

Firebase Functions are a little difficult to make work with monorepo configurations, we did several tricks to make them work correctly in the local emulator, in testing env, and in GCP.

### 1. Using monorepo packages

- Do not import monorepo packages as normal dependencies with `"workspace:*"`, because the deployment (`firebase deploy --only functions`) will not work correctly. 
- What you need to do is configure `tsconfig.json` paths including the packages you want to use.

### 2. Running `dev` do not watch changes in dependencies

- Sadly when running `pnpm dev:be` the monorepo packages used in `functions` are not being watched, so every time you do a change there, you need to restart the dev task.

### 3. GitHub Workflow for deployment generates `.env` file

- We use dotenv for our environment variables, this is the best way for [environment configuration](https://firebase.google.com/docs/functions/config-env).
- Of course, env variables are not in the repository, so an [action](https://github.com/marketplace/actions/create-env-file) is included in the `deploy-functions.yml` workflow to generate an `.env` file with the secrets saved in GitHub Secrets

### 4. Deployment requires specific set of roles

- Deploying functions needs a specific set of GCP roles, in [this post](https://davelms.medium.com/deploy-firebase-functions-using-github-actions-7dbafbd4df77) is explained the whole process. 


