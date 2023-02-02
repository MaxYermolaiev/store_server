const nodemailer = require ('nodemailer')

async function main(new_pass){
    let password =new_pass||'aaaAAA111'
    let transporter  = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'doc21026738@gmail.com', // generated ethereal user
            pass:'qiyjpdbarcbokgpt'
            //pass: '672168Poisone', // generated ethereal password
        },
    });
    let msg = transporter.sendMail({
        from: '"TheCraftTeam" <thecraft@example.com>',
        to:'doc21026738@gmail.com',
        subject: "Password confirmation",
        text: "Your confirmation code:aaaAAA111?", // plain text body
        html:`<span>Your confirmation code:${password}</span>`
    });
    console.log("Message sent: %s", msg.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(msg));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
//    main().catch(console.log); - to send
module.exports = main;