const Discord = module.require("discord.js");
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();


module.exports = {
  name: "hentaiass",
  description: "Sends hentai ass pictures.",
  run: async (bot, message, args) => {
    var errMessage = "**Ez nem __NSFW__ csatorna.**";
    if (!message.channel.nsfw) {
      message.react("💢");

      return message.reply(errMessage).then((msg) => {
        setTimeout(() => msg.delete(), 3000);
      });
    }

    const image = await nsfw.hentaiass();
    const embed = new Discord.MessageEmbed()
    .setTitle(`Hentai Ass`)
    .setColor("GREEN")
    .setImage(image);
    message.channel.send({ embeds: [embed] });
  },
};
