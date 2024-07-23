

exports.handler = async event => {
  const AWS = require("aws-sdk")
  const axios = require('axios')
  const reCapUrl = "https://www.google.com/recaptcha/api/siteverify";
  require('dotenv').config()
  const completeUrl = "https://www.google.com";

  const { SITE_AWS_ACCESS_KEY, SITE_AWS_SECRET, SITE_AWS_REGION, SITE_VERIFIED_EMAIL, SITE_CAPTCHA_SECRET } = process.env

  let requestParams = JSON.parse(event.body)
  let name = requestParams.name
  let fromEmail = requestParams.email
  let subject = requestParams.subject
  let message = requestParams.message
  let captcha = requestParams.captcha
  let secret = SITE_CAPTCHA_SECRET

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
        accessKeyId: SITE_AWS_ACCESS_KEY,
        secretAccessKey: SITE_AWS_SECRET,
        region: SITE_AWS_REGION
    })

    const ses = new AWS.SES({ apiVersion: "2010-12-01" })
    const params = {
      Destination: {
        ToAddresses: [SITE_VERIFIED_EMAIL] // Email address/addresses that you want to send your email
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
      Source: SITE_VERIFIED_EMAIL
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