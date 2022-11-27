const { Client, Message, MessageEmbed, version } = require("discord.js");
const mongoose = require("mongoose");
const botname = require("../../botconfig.json").botname;

module.exports = {
  name: "bot",
  description: "A bot információi.",
  // usages: [],
  // botPermissions: [],
  // userPermissions: [],
  /**
   * @param {Client} Client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (bot, message, args) => {
    let totalSeconds = bot.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let totalCommands = 0
    bot.commands.each((c) => {
      totalCommands++
    })
    const embed = new MessageEmbed()
    .setTitle(" > " + bot.user.username + " Információk", bot.user.displayAvatarURL())
    .setThumbnail(bot.user.displayAvatarURL())
    .addFields(
        { name: `Bot neve: __${botname}__`, value: `---` },
      { name: "\`✨\`Developer", value: `${require(`../../package.json`).author}`, inline: true },
      {
        name: "\`📍\`Version",
        value: `${require(`../../package.json`).version}`,
        inline: true 
      },
      { name: "\`📑\`Szerverek", value: `${bot.guilds.cache.size}`, inline: true },
      { name: "\`👤\`Felhasználók", value: `${bot.users.cache.size}`, inline: true },
      { name: "\`🔔\`Csatornák", value: `${bot.channels.cache.size}`, inline: true },
      { name: "\`🧸\`Emojik", value: `${bot.emojis.cache.size}`, inline: true },
      { name: "\`📌\`Versio", value: `Discord.js: ${version}`, inline: true },
      { name: "\`📡\`Parancsok", value: `__${totalCommands}__`, inline: true },
      { name: "\`💼\`Support Szerver", value: `[\`Belépés\`](https://discord.gg/gjvkuuMcHY)`, inline: true },
      { name: "\`⏰\`Menet idő", value: `${days} Nap, ${hours} Óra, ${minutes} Perc, ${seconds} Másodperc`, inline: true }
    )
    .setColor("ORANGE")
      .setFooter(` Ő kérte le: ${message.author.tag}`, bot.user.displayAvatarURL())

    message.reply({ embeds: [embed] });
  },
};