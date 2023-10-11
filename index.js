require("dotenv").config();
const { GatewayIntentBits, Client } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

require("./src/start")(client);
