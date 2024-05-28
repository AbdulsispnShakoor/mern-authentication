import nodemailer from 'nodemailer';

// create reusable transporter object using the default SMTP transport


const sendEmail =async (option) =>{

    // creating a new transport object
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER, 
            pass:  process.env.EMAIL_PASSWORD, 
        },
    });


    // defining email option 
    const emailOption = {
        from : "Store support <support@store.com>",
        to: option.email,
        subject: option.subject,
        text: option.message
    };

   await transporter.sendMail(emailOption)

};

export default sendEmail;