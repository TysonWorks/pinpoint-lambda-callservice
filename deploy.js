const inquirer = require("inquirer");
const replace = require('replace-in-file');
const { execSync } = require("child_process");
require('dotenv').config();

const promptQuestions = [{
    type: 'input',
    name: 'longCode',
    message: "What's the long-code (telephone number) you've created in Pinpoint console? Use the following formatting +12024104849",
}];

(async()=>{
    console.log("Deploying the Pinpoint stack");
    execSync(`cdk deploy --app='node PinpointStack.js' PinpointStack --require-approval never`, {stdio: 'inherit'});
    console.log("Please follow the tutorial and add longCode in Pinpoint console");
    const promptAnswers = await inquirer.prompt(promptQuestions);
    await replace({
        files: "./.env",
        from: /ORIGIN_PHONE_NUMBER.+/g,
        to: `ORIGIN_PHONE_NUMBER="${promptAnswers.longCode}"`
    });
    console.log("Deploying the CallService stack")
    execSync(`cdk bootstrap --app='node CallServiceStack.js'`, {stdio: 'inherit'});
    execSync(`cdk deploy --app='node CallServiceStack.js' CallServiceStack --require-approval never`, {stdio: 'inherit'});
    console.log("Done");
})();