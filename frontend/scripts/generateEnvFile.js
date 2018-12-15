const fs = require('fs');
const path = require('path');

const {
    API_HOST
} = process.env;

const content = `
export const environment = {
  API_HOST: '${API_HOST}',
};
`;
const fileName = path.resolve(__dirname, '../src/environments/environment.custom.ts');
fs.writeFileSync(fileName, content);
