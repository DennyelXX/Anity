const Discord = require("discord.js");
const { MessageButton, MessageComponent, MessageActionRow } = require("discord.js")
const prefix = require("../../botconfig.json").prefix;
const namebot = require("../../botconfig.json").botname;

module.exports = {
  name: "partner",
  description: "A partner szervereket láthatod ezzel a parancsal.",
  run: async (bot, message, args) => {
    let embed = new Discord.MessageEmbed()
      .setTitle(`<:anity:1037297768168960033> ${namebot} Partner Szerverek.`)
      .setThumbnail(bot.user.displayAvatarURL())
      .setColor("BLUE")
      .setDescription(
        `>>> <:cyansmalldot:1036683427782594630> **Ezzel a parancsal tudod megnézni a partnerségben lévő szervereket. Amennyiben partner tag szeretnél lenni. Keresd fel a \`Support\` szerver. \nEzt a \`${prefix}support\` parancsal tudod elérni.**`
      )
      .setFooter(`Ő kérte le: ${message.author.username}`);

    const row = new MessageActionRow()
      .addComponents(
      new MessageButton()
          .setStyle('LINK')
          .setLabel('🔥 XYZ')
          .setURL("https://discord.com/api/oauth2/authorize?client_id=822201066099179540&permissions=8&scope=bot")
      );

      const row1 = new MessageActionRow()
      .addComponents(
      new MessageButton()
          .setStyle('LINK')
          .setLabel('⚡ Electro - ArenaPvP')
          .setURL("https://discord.gg/gjvkuuMcHY")
      );


      message.channel.send({ embeds: [embed], components: [row, row1] });

  },
};
