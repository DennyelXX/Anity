const discord = require("discord.js");
const got = require("got"); //MAKE SURE TO INSTALL THE PACKAGE "GOT" ELSE THE CODE WOULD NOT WORK

module.exports = {
  name: "ass",
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
      got("https://www.reddit.com/r/Asshole/random.json")
        .then((response) => {
          let content = JSON.parse(response.body);
          var title = content[0].data.children[0].data.title;
          var amazeme = content[0].data.children[0].data.url;
          let wow = new discord.MessageEmbed()
            .setDescription(`**${title}**`)
            .setImage(amazeme)
            .setFooter(`Nice `)
            .setColor("RANDOM");
          message.channel.send({ embeds: [wow] });
        })
        .catch(console.error);
    } catch (err) {
      const errorlogs = client.channels.cache.get("747423875956080801");

      message.channel.send(
        `Whoops, We got a error right now! This error has been reported to Support center!`
      );

      errorlogs.send(
        `Error in ${message.guild.name}  by ${message.author.username} on  Asshole commands!\n\nError:\n\n ${err}`
      );
    }
  },
};
