Set-Location user-service
npm run typeorm:run-migrations

Set-Location ..
Set-Location vehicle-service
npm run typeorm:run-migrations

npx concurrently `
  "cd ..\\user-service && npm run start:dev" `
  "cd ..\\vehicle-service && npm run start:dev"
