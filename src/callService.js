const { PinpointSMSVoice} = require("aws-sdk");

const REGION = process.env.REGION;
const DESTINATION_PHONE_NUMBER = process.env.DESTINATION_PHONE_NUMBER;
const ORIGIN_PHONE_NUMBER = process.env.ORIGIN_PHONE_NUMBER;
const LANGUAGE_CODE = process.env.LANGUAGE_CODE;
const VOICE_ID = process.env.VOICE_ID;
const CALL_TEXT = process.env.CALL_TEXT;

async function handler(event, context, callback) {
    try {
        const pinpointSMSVoice = new PinpointSMSVoice({region: REGION});
        const response = await pinpointSMSVoice.sendVoiceMessage({
            Content: {
                SSMLMessage: {
                    LanguageCode: LANGUAGE_CODE,
                    VoiceId: VOICE_ID,
                    Text: CALL_TEXT
                }
            },
            DestinationPhoneNumber: DESTINATION_PHONE_NUMBER,
            OriginationPhoneNumber: ORIGIN_PHONE_NUMBER
        }).promise();
        console.log("Call successful", response);
        callback(null, response);
    } catch (err) {
        console.error(err);
        callback(err);
    }
}

module.exports = {
    handler
}