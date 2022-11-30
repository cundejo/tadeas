## Migrations

* Migrations provide a way to incrementally update the database schema to keep it in sync with the application's data model while preserving existing data in the database.
* Migrations must be **IDEMPOTENT**, we need to be sure that every time they run they will do exactly the same steps, avoiding data loss. 

### Install
- Run `pnpm i`
- Create `config/.env` based on `config/.env.dist` with all the environment variables

### Run migrations 

- Run `pnpm execute -- src/NAME-OF-THE-MIGRATION-FILE.ts`
