const cds = require("@sap/cds");
const bcrypt = require("bcrypt");
module.exports = class DonationSrv extends cds.ApplicationService {
  async init() {
    this.before("CREATE", "Users", async (req) => {
      const db = await cds.connect.to("db");
      const { User } = cds.model.entities;
      let email = req.data.email;
      const existing = await SELECT.one.from(User).where({ email });
      if (existing) {
        return req.error(409, "User already exists");
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.data.password, saltRounds);
      req.data.password = hashedPassword;
    });
    this.before("UPDATE", "Users", async (req) => {
      const db = await cds.connect.to("db");
      const { User } = cds.model.entities;
      let email = req.data.email;
      const existing = await db.run(SELECT.one.from(User).where({ email }));
      if (existing) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.data.password, saltRounds);
        req.data.password = hashedPassword;
      } else {
        return req.error(409, "User does not exists");
      }
    });
    this.on("UserLogin", async (req) => {
      try {
        const db = await cds.connect.to("db");
        const { email, password } = req.data;
        const { User } = db.model.entities;
        const user = await SELECT.one
          .from(User)
          .columns("ID", "email", "firstName", "password")
          .where({ email });
        if (!user) throw Error("Email Not Found !");
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw Error("Password is Wrong !");
        return {
          email: user.email,
          firstName: user.firstName,
          ID: user.ID,
        };
      } catch (err) {
        if (err instanceof Error) {
          req.error({
            code: 404,
            message: err.message || "Unexpected error during login",
          });
        } else {
          req.error({ code: 500, message: "Unexpected error during login " });
        }
      }
    });
    return super.init();
  }
};
