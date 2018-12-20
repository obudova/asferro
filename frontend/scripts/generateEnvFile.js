const fs = require('fs');
const path = require('path');

const {
  BACKEND_HOST,
  BACKEND_PORT
} = process.env;

const content = `
export const environment = {
  production: false,
  API_HOST: '${BACKEND_HOST}',
  PORT: '${BACKEND_PORT}'
};
`;
const fileName = path.resolve(__dirname, '../src/environments/environment.custom.ts');
fs.writeFileSync(fileName, content);
