# Simple JSON-based backendapp

## Start app
- npm run start:prod

## Add CRUD(Create Read Update Delete) endpoint:
- Go to /routes/routes.js
- Modify "routes" const (add object with key "name" in it) and save changes
- Now you have CRUD endpoints on host/\names\ ( by default localhost:3001/\names\ )

## Add filtering by param
- Go to /routes/filter-params-list.js
- Modify "paramsToFilter" const (add object with "paramName" and "compareRule").
### compareRule
For adding custom filter by param you can use existing rules from /util/compare-rules.js or create your own arrow function.
You also need to add "dbName" field, if comparing param name in DB differs from name in URL
