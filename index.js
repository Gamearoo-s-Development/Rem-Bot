require("dotenv").config();
const { Client } = require("eris");

const client = new Client(process.env.TOKEN, {
  intents: ["guildMembers", "guilds", "guildEmojis", "guildWebhooks"],
});

require("./SRC/start")(client);
