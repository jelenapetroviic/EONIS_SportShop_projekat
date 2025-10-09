import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

function createTransporter(config) {
  const transpoter = nodemailer.createTransport(config);
  return transpoter;
}
let configurations = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  requireTls: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};

const sendMail = async (messageoption) => {
  const transpoter = await createTransporter(configurations);
  await transpoter.verify();
  await transpoter.sendMail(messageoption, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log(info.response);
  });
};

export default sendMail;
