const discord = require("discord.js");

module.exports = {
    name: 'howgay',
    description: "Megmutatja mennyire vagy buzi.",
    run: async (bot, message, args) => {
  const user = message.mentions.users.first() || message.author;
  const gayPercentage = Math.floor(Math.random() * 100);

  const howgayEmbed = new discord.MessageEmbed()
    .setColor("#0155b6")
    .setTitle(`:rainbow_flag: Buziság mérő`)
    .setDescription(`${user} **${gayPercentage}%-ban buzi.** :rainbow_flag:`);

  message.reply({
    embeds: [howgayEmbed],
  });
}
}