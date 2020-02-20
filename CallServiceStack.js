const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const events =  require("@aws-cdk/aws-events");
const targets = require("@aws-cdk/aws-events-targets");
const iam =  require("@aws-cdk/aws-iam");
require('dotenv').config();

class CallServiceStack extends cdk.Stack {
    constructor(scope, id, props) {
      super(scope, id, props);
        
        const callServiceFunction = new lambda.Function(this, "call-service-function", {
            functionName: "callService",
            runtime: lambda.Runtime.NODEJS_12_X,
            code: new lambda.AssetCode("src"),
            handler: "callService.handler",
            timeout: cdk.Duration.seconds(60),
            environment: {
                REGION: process.env.AWS_REGION,
                DESTINATION_PHONE_NUMBER: process.env.DESTINATION_PHONE_NUMBER,
                ORIGIN_PHONE_NUMBER: process.env.ORIGIN_PHONE_NUMBER,
                LANGUAGE_CODE: process.env.LANGUAGE_CODE,
                VOICE_ID: process.env.VOICE_ID,
                CALL_TEXT: process.env.CALL_TEXT
            },
            initialPolicy: [
                new iam.PolicyStatement({
                    resources: [ "*" ],
                    actions: [
                      'sms-voice:SendVoiceMessage',
                    ]
                  })
            ]
        });
        const rule = new events.Rule(this, 'Rule', {
            schedule: events.Schedule.expression(process.env.CRON_EXPRESSION)
          });
        rule.addTarget(new targets.LambdaFunction(callServiceFunction));
    }
}

const app = new cdk.App();

const callServiceStack = new CallServiceStack(app, 'CallServiceStack', {
    env: {
        region: process.env.AWS_REGION,
        account: process.env.ACCOUNT_ID
    }
});