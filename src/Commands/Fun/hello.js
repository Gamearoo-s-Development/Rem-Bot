const {
  PermissionFlagsBits,
  ApplicationCommandOptionType,
  CommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const { ramapi2 } = require("../../Req/ram-api");
const { token } = require("../../Req/token");

module.exports = {
  name: "fun",
  desc: "Get the fun commands",
  perm: PermissionFlagsBits.SendMessages,
  options: [
    {
      name: "hello",
      description: "Get a hello",
      type: ApplicationCommandOptionType.Subcommand,
    },
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async run(interaction) {
    let token2 = await token();

    //  / console.log(token2);
    switch (interaction.options.getSubcommand()) {
      case "hello":
        let helloData = await new ramapi2.funAsync(token2)
          .helloAsync()
          .catch((err) => {});

        let embed = new EmbedBuilder()
          .setDescription(helloData.text)
          .setImage(helloData.imageURL);

        interaction.reply({ embeds: [embed] });

        break;
    }
  },
};
