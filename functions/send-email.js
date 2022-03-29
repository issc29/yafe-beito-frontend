

exports.handler = async event => {
  const AWS = require("aws-sdk")
  const axios = require('axios')
  const reCapUrl = "https://www.google.com/recaptcha/api/siteverify";
  require('dotenv').config()
  const completeUrl = "https://www.google.com";

  const { AWS_ACCESS_KEY, AWS_SECRET, AWS_REGION_ZONE, VERIFIED_EMAIL } = process.env

  let requestParams = JSON.parse(event.body)
  let name = requestParams.name
  let fromEmail = requestParams.email
  let subject = requestParams.subject
  let message = requestParams.message
  let captcha = requestParams.captcha
  let secret = process.env.CAPTCHA_SECRET

  if(captcha == null) {
    return new Promise(function(resolve, reject) {reject(Error("No Captcha supplied!"))});
  } 

  let verifyResult = await axios({
    method: 'post',
    url: 'https://www.google.com/recaptcha/api/siteverify',
    params: {
        secret: secret,
        response: captcha
    }
});

  if (!verifyResult.data.success) { 
    console.log("reCaptcha check failed. Most likely SPAM.");
    return new Promise(function(resolve, reject) {reject(Error("reCaptcha check failed. Most likely SPAM."))});
  }
  
    AWS.config.update({
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET,
        region: AWS_REGION_ZONE
    })

    const ses = new AWS.SES({ apiVersion: "2010-12-01" })
    const params = {
      Destination: {
        ToAddresses: [VERIFIED_EMAIL] // Email address/addresses that you want to send your email
      },
    //   ConfigurationSetName: <<ConfigurationSetName>>,
      Message: {
        Body: {
          Html: {
            // HTML Format of the email
            Charset: "UTF-8",
            Data:
              `<html>
                  <body>
                    From: ${name}
                    <br />
                    Email: ${fromEmail}
                    <br />
                    Message: ${message}
                  </body>
              </html>`
          },
          Text: {
            Charset: "UTF-8",
            Data: ""
          }
        },
        Subject: {
          Charset: "UTF-8",
          Data: `Yafe Beito: ${subject}`
        }
      },
      ReplyToAddresses: [fromEmail], 
      Source: VERIFIED_EMAIL
    }

    return ses.sendEmail(params).promise().then(data => {
        console.log("email submitted to SES", data);
        return {
          statusCode: 200,
          body: `Message sent`,
        }
      })
      .catch(error => {
        console.log(error);
        return {
          statusCode: 500,
          body: `Message unsuccesfully sent, error: ${error}`,
        }
    })
}