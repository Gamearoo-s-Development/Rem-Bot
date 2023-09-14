const { Client, Collection } = require("eris");
const helper = require("discord-helper.js");
const { Logs } = require("ram-api.js");
const { logger } = require("./Req/Logger");

/**
 *
 * @param {Client} client
 */
module.exports = (client) => {
  client.commands = new Collection();
  client.on("ready", () => {
    require("./command")(client);
    logger.infoAsync(`${client.user.username} is online!`);
  });

  client.connect();
};
