const sgMail = require('@sendgrid/mail');
const config = require('../config/dev')

sgMail.setApiKey(config.API_Key);
const sendEmail = async (data)=>{
    const message = {
        to: data.email,
        from:"priyam@apptunix.com",
        subject:"Validate your account",
        text:"kuch bhi",
       html:`<h2> Welcome Onboard ${data.firstName + " " + data.lastName} </h2>`
    }
    sgMail.send(message).then(() => console.log("Email sent")).catch((error) => console.log(error))
}
module.exports.sendEmail = sendEmail;