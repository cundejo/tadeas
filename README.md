## Project Details

- Monorepo tools
  - [PNPM workspaces](https://pnpm.io/workspaces) 
  - [Turborepo](https://turbo.build/repo/docs) 
  - [Manypkg](https://turbo.build/repo/docs/handbook/troubleshooting#handling-mismatched-package-versions)
- Frontend
  - [Next.js](https://nextjs.org/docs/getting-started)
  - [Next UI](https://nextui.org/)
- Backend
  - [Firebase](https://firebase.google.com/docs)


## Dependencies
 - [PNPM](https://pnpm.io/)

## Installation
Install dependencies in the whole monorepo
- `pnpm i`

## Frontend

### Run dev 
- Create `.env` based on `.env.dist` with all the environment variables
- If running functions emulator remember to create `.env.local` with the local `NEXT_PUBLIC_FIREBASE_FUNCTIONS_BASE_PATH`
- Run `pnpm dev`

### Deploy
- Every time a change is pushed to origin/main branch, Cloudflare pick it up and deploy a new version.

## Backend
### Install
- Run `cd firebase-functions && pnpm i`

### Run dev
- Create `src/config/.env.ts` based on `src/config/.env.dist.ts` with all the environment variables
- Run `firebase emulators:start`

### Deploy
- Deploy is manual, run `cd firebase-functions && pnpm deploy`
