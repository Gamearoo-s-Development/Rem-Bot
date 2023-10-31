const helper = require("discord-helper.js");

const { Client, Collection, PermissionsBitField } = require("discord.js");
const { api } = require("../Dashboard/app");
const { logger } = require("./Req/Logger");

/**
 *
 * @param {Client} client
 */
module.exports = (client) => {
  client.commands = new Collection();
  client.totalcmds = 0;

  client.on("ready", () => {
    api(client);
    require("./command")(client);
    client.user.setPresence({
      status: "dnd",
      activities: [{ name: "In Development" }],
    });
    logger.infoAsync(`${client.user} is online!`, "client");
  });

  client.on("interactionCreate", (interaction) => {
    const { commandName } = interaction;
    if (!interaction.isCommand()) return null;

    let command = client.commands.get(commandName);

    var commands = client.application.commands;

    if (!command) {
      interaction.reply(`${commandName} was removed!`);
      commands.delete(interaction.commandId).then((cmd) => {
        logger.warnAsync(`${commandName} was not found so i removed it`);
      });
      return;
    }

    const permcheck = new PermissionsBitField(command.perm);

    if (!interaction.member.permissions.has(permcheck))
      return interaction
        .reply({ content: `Missing ${permcheck.toArray()}`, ephemeral: true })
        .catch((err) => {});

    let extras = {};

    command.run(interaction, client, extras);
  });

  client.login(process.env.TOKEN);
};
