const discord = require("discord.js");
const got = require("got");

module.exports = {
  name: "4k",
  category: "NSFW",
  description: "Sends 4k girl pics",
  usage: "[command]",
  botPerms: ["EMBED_LINKS"],
  run: async (bot, message, args) => {
    try {
      //command
      var errMessage = "**Ez nem __NSFW__ csatorna.**";
      if (!message.channel.nsfw) {
        message.react("💢");

        return message.reply(errMessage).then((msg) => {
          setTimeout(() => msg.delete(), 3000);
        });
      }
      got("https://www.reddit.com/r/RealGirls/random.json")
        .then((response) => {
          let content = JSON.parse(response.body);
          var title = content[0].data.children[0].data.title;
          var amazeme = content[0].data.children[0].data.url;
          let wow = new discord.MessageEmbed()
            .setDescription(`**${title}**`)
            .setImage(amazeme)
            .setFooter(`😏`)
            .setColor("BLUE");
          message.channel.send({ embeds: [wow] });
        })
        .catch(console.error);
    } catch (err) {
      const errorlogs = bot.channels.cache.get("981576779506536479");

      message.channel.send(
        `Valami hiba történt.`
      );

      errorlogs.send(
        `Hiba történt a ${message.guild.name} szerveren. Ő okozta: ${message.author.username} a 4k parancsnál!\n\nHIBA:\n\n ${err}`
      );
    }
  },
};