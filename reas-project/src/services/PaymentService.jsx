import axios from "./customizeAxios";

const checkout = (amount, stripToken) => {
  return axios.post("/payments", { amount: amount, stripToken: stripToken });
};

const sendMail = (email, subject, body) => {
  return axios.post("/mails/send-mail", {
    email: email,
    subject: subject,
    body: body,
  });
};

export { checkout, sendMail };
