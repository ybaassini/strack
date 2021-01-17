export default {
  db: {
    user: "admin",
    pass: "admin",
    host:
      "mongodb+srv://yassine:dede@cluster0.tfqqu.mongodb.net/epr?retryWrites=true&w=majority",
    port: "27017",
    database: "epr",
    authSource: null,
  },
  host: {
    url: "<server-url>",
    port: "3000",
  },
  jwt: {
    secretOrKey: "secret",
    expiresIn: 36000000,
  },
  mail: {
    host: "smtp.gmail.com",
    port: "465",
    secure: true,
    user: "ybaassini@gmail.com",
    pass: "gKenshin76",
  },
};
