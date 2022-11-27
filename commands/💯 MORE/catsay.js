const Discord = module.require("discord.js");

module.exports = {
  name: "catsay",
  usage: "[üzenet]",
  description: "Egy macska mondja.",
  botPerms: ["ATTTACH_FILES", "MANAGE_MESSAGES"],
  run: async (bot, message, args) => {
    message.delete();
    const state = "enabled";
    if (state === "disabled") {
      return message.channel.send("Command has been disabled for now");
    }
    const msg = args.join(" ");
    if (!msg) {
      return message.channel.send("Mit szeretnél hogy írjak.");
    }
    message.channel.send({
      files: [
        {
          attachment: `https://cataas.com/cat/cute/says/${msg}`,
          name: "catsay.png",
        },
      ],
    });
  },
};
