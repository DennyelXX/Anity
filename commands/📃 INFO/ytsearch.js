const discord = require("discord.js");
const yts = require("yt-search");

module.exports = {
    name: 'ytstat',
    usage: "[youtube csatorna]",
    description: "Egy adott YouTube csatorna adatait tudod lekérni.",
    run: async (bot, message, args) => {
    const channelName = args.join(" ");
  
    if (!channelName) {
      const errEmbed = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          "Helytelen használat \nHelyes használat: **ytstat [youtube csatorna neve]**"
        );
  
      message.reply({
        embeds: [errEmbed],
      });
    } else {
      const result = await yts(channelName);
      const channels = result.channels.slice(0, 1);
      channels.forEach(function (c) {
        const ytstatsEmbed = new discord.MessageEmbed()
          .setColor("0155b6")
          .setThumbnail(c.image)
          .setTitle(`<:YouTube:986690675389124708> YouTube Stat`)
          .addField("Csatorna neve", `${c.name}`, false)
          .addField("Felíratkozók", `${c.subCount.toLocaleString()}`, false)
          .addField("Videók száma", `${c.videoCount.toLocaleString()}`, false)
          .setTimestamp();
  
        const row = new discord.MessageActionRow().addComponents(
          new discord.MessageButton()
            .setLabel("Csatorna Link")
            .setStyle("LINK")
            .setURL(c.url)
        );
  
        message
          .reply({
            embeds: [
              new discord.MessageEmbed()
                .setColor("0155b6")
                .setDescription("Keresés..."),
            ],
          })
          .then(async (s) => {
            s.edit({
              embeds: [ytstatsEmbed],
              components: [row],
            });
          });
      });
    }
  }
}