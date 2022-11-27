const Discord = module.require("discord.js");
const fs = require("fs");

module.exports = {
  name: "servericon",
  description: "Megmutatja a szerver képét.",

  run: async(client, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setAuthor(message.guild.name + " Képe")
    .setColor("ORANGE")
    .setImage(message.guild.iconURL({ dynamic: true, size: 4096 }))
    .setTimestamp()
    .setFooter(`Ő kérte le: ${message.author.tag} `, message.author.displayAvatarURL({dynamic: true}))

  await message.channel.send({embeds: [embed]});
}
}