const Discord = require("discord.js");
const { MessageButton, MessageComponent, MessageActionRow } = require("discord.js")

module.exports = {
  name: "season",
  description: "Summer Season információk.",
  run: async (bot, message, args) => {
    let embed = new Discord.MessageEmbed()
      .setTitle(`<:summer:988130738664788018> **Summer Season**`)
      .setThumbnail("https://blogs.missouristate.edu/bearsfamilies/files/2018/05/summer-background-design_1314-42-300x300.jpg")
      .setColor("BLUE")
      .setDescription
      (`
      A Season az Ani - Bot készíti. Aki még hozzá járult a season-höz, az <@648575973637357605>. \🔥\n
      **Mit kell tenni a nyeremény megszerzéséhez?** \n**Szeptember 1.-ig aki a legtöbb embert hívja meg.** \n\n**1. Helyezett** - __Dc NITRO 1 hónap. | 100 meghívott emberenként +1 hónap.__ \n**2. Helyezett** - __Dc Nitro Classic 1 hónap.__ \n**3. Helyezett** - __Dc Nitro Classic 1 hónap.__
      `)
      .setFooter(`Ő kérte le: ${message.author.username}`);

    const row = new MessageActionRow()
      .addComponents(
      new MessageButton()
          .setStyle('LINK')
          .setLabel('💙 Ani Mehívás')
          .setURL("https://discord.com/api/oauth2/authorize?client_id=822201066099179540&permissions=8&scope=bot")
      );

      message.channel.send({ embeds: [embed], components: [row,] });

  },
};