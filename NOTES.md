# Generate Database types
Make sure you are logged in first.
```bash
$ npx supabase login
```
Then run the command to generate the Database types.
```bash
$ npx supabase gen types --lang=typescript --project-id <project-id> > app/types/database.types.ts
```