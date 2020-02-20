const { execSync } = require("child_process");

execSync(`cdk destroy --app='node PinpointStack.js' PinpointStack`, {stdio: 'inherit'});
execSync(`cdk destroy --app='node CallServiceStack.js' CallServiceStack`, {stdio: 'inherit'});