"use server";

import getBaseUrl from "@/lib/base-url";
import nodemailer from "nodemailer";

const domain = getBaseUrl();
export const sentVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/api/auth/verify?token=${token}`;

  const transporter = nodemailer.createTransport({
    host: "smtp.yandex.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Подтверждение регистрации",
    html: `Для подтверждения регистрации, перейдите по ссылке: <a href="${confirmLink}">${confirmLink}</a>`,
  };

  await transporter.sendMail(mailOptions);
};
