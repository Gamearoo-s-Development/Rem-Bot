const { Client } = require("discord.js");
const { logger } = require("./Req/Logger");
const { ramapi, ramapi2 } = require("./Req/ram-api");
const { readdirSync } = require("fs");
const { HelperClient } = require("discord-helper.js");

/**
 *
 * @param {Client} client
 */
module.exports = (client) => {
  readdirSync("./src/Commands/").forEach((dir) => {
    let command = readdirSync(`./src/Commands/${dir}/`).filter((f) =>
      f.endsWith(".js")
    );

    for (cmd of command) {
      let pull = require(`./Commands/${dir}/${cmd}`);

      let { name, perm, desc, options, type } = pull;

      client.commands.set(name, pull);

      if (type) {
        new HelperClient(client).GlobalcommandRegisterAsync({
          name,
          description: desc,
          options,
          type,
          permission: perm,
        });
      } else {
        new HelperClient(client).GlobalcommandRegisterAsync({
          name,
          permission: perm,
          options,
          description: desc,
        });
      }
    }
  });
};
