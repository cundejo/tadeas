## Project Details

- Next.js Project
- Next UI as UI Library
- Auth and DB from Firebase
- Deployed in Cloudflare
- Firebase functions used as backend

## Frontend
### Install
- Run `pnpm i`

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
