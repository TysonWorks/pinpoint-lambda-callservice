const cdk =  require('@aws-cdk/core');
const pinpoint =  require("@aws-cdk/aws-pinpoint");
require('dotenv').config();

class PinpointStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);

        const pinpointProject = new pinpoint.CfnApp(this, "project", {
            name: "pinpoint-project"
        });
    }
}

const app = new cdk.App();

const pinpointStack = new PinpointStack(app, 'PinpointStack', {
    env: {
        region: process.env.AWS_REGION,
        account: process.env.ACCOUNT_ID
    }
});
