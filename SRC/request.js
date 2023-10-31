const { readdirSync } = require("fs");
const { Application } = require("express");
const { logger } = require("./Req/Logger");

/**
 *
 * @param {Application} app
 */
exports.load = (app) => {
  readdirSync("./Dashboard/Website/public/").forEach((dir) => {
    const commands2 = readdirSync(`./Dashboard/Website/public/${dir}/`).filter(
      (f) => f.endsWith(".js")
    );

    for (let file of commands2) {
      let pull = require(`../Dashboard/Website/public/${dir}/${file}`);

      if (!pull.middleware) {
        app.get(pull.name, pull.run);
      } else {
        app.get(pull.name, pull.middleware, pull.run);
      }

      logger.infoAsync(`Loaded page: ${pull.name}`, "Dashboard");
    }
  });
};
