const fs = require('fs');
const path = require('path');

const {
  API_HOST,
  PORT
} = process.env;

const content = `
export const environment = {
  production: false,
  API_HOST: '${API_HOST}',
  PORT: '${PORT}'
};
`;
const fileName = path.resolve(__dirname, '../src/environments/environment.custom.ts');
fs.writeFileSync(fileName, content);
