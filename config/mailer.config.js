const nodemailer = require("nodemailer");

const host = process.env.HOST || "http://localhost:3010";
const user = process.env.NM_USER;

const transport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user: user,
    pass: process.env.NM_PASS,
  },
});



module.exports.sendValidationEmail = ( email, activationToken) => {
  transport
    .sendMail({
      to: email,
      from: `AppyHour team <${user}>`,
      subject: "Activate your account!",
        html: `
        <body style="background-color: #eee; color: #757575; ">
        <div style="margin: 2em 0 1em;background-color:#eee;text-align: center;">
                <img src="https://res.cloudinary.com/dyiagjrai/image/upload/v1607437448/logos-appyhour/appyhour_rvgm6z.png" alt="Appy hour!" width="200px" heigth="auto" style="margin: 20px 10px 10px 10px;" />
                <br/><br>
                <div style="background-color: white; padding: 15px 15px; width: 80%;margin: auto;">
                <h1>Just one more step...</h1>
                <h4>${email}</h4>
                <div>Thanks for signing up for Appy Hour</div>
                <div>Click on the button below to activate your account.</div>
                <br><br>
                <a href="${host}/activate/${activationToken}" style="padding: 10px 20px; color: white; background-color: #C8102E; border-radius: 3px;text-decoration: none; ">ACTIVATE ACCOUNT</a>
                <br><br>
                </div>
               <p>Appy hour team 🍻</p>
               <br>
            </div>
      </body>
       `,
    })
    .then(info => console.log(info.response))
    .catch(e => console.error(e));
};
