const discord = require("discord.js");

module.exports = {
    name: 'pp',
    description: "Megmutatja mekkora a faszod.",
    run: async (bot, message, args) => {

  const user = message.mentions.users.first() || message.author;
  const ppSize = Math.floor(Math.random() * 10);
  let pp = "";

  for (let i = 0; i < ppSize; i++) {
    pp += "=";
  }

  const finalSize = `\n**8${pp}D**`;

  const ppsizeEmbed = new discord.MessageEmbed()
    .setColor("#0155b6")
    .setTitle(`Fasz méret.`)
    .setDescription(`${user} **fasz mérete** \n${finalSize}`);

  message.reply({
    embeds: [ppsizeEmbed],
  });
}
}