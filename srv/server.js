const cds = require("@sap/cds");
const cov2ap = require("@cap-js-community/odata-v2-adapter");
const cors = require("cors");

cds.on("bootstrap", (app) => {

  app.use(cov2ap());

  app.use(
    cors({
      origin: ["*"], // no trailing slash!
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    })
  );
});

module.exports = cds.server;
