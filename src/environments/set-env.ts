const { writeFile } = require('fs')
const { argv } = require('yargs')
// read environment variables from .env file
require('dotenv').config()

// read the command line arguments passed with yargs
const environment = argv.environment
const isProduction = environment === 'prod'

if (!process.env.API_KEY || !process.env.API_URL) {
    console.error('All the required environment variables were not provided!')
    process.exit(-1)
}

// const targetPath = isProduction
//    ? `./src/environments/environment.prod.ts`
//    : `./src/environments/environment.ts`

// Just use single env file for now:
const targetPath = './src/environments/environment.ts'

// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   API_URL: "${process.env.API_URL}",
   API_KEY: "${process.env.API_KEY}"
};
`

// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err) {
   if (err) {
      console.log(err);
   }
   console.log(`Wrote variables to ${targetPath}`);
});