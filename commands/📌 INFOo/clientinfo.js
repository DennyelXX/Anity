const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "cinfo",
    category: "Info",
    description: "Shows information about the bot.",
    aliases: ["botinfo", "ping"],
    usage: "cinfo",
    cooldown: 3,
    run: async(bot, message, args, util) => {
        const apiLatency = Math.round(bot.ws.ping);
        const botLatency = message.createdTimestamp - message.createdTimestamp;

        let totalSeconds = (bot.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        const uptime = `\`\`${days}\`\` nap, \`\`${hours}\`\` óra, \`\`${minutes}\`\` perc, \`\`${seconds}\`\` másodperc`;

        const embed = new MessageEmbed()
        .setColor('BLUE')
        .addField(`<:2899info:982881605385334884> Információk`, `<:cyansmalldot:1036683427782594630> **Felhasználók:** \`\`${bot.users.cache.size}\`\`\n<:cyansmalldot:1036683427782594630> **Szerverek:** \`\`${bot.guilds.cache.size}\`\`\n<:cyansmalldot:1036683427782594630> **API Ping:** \`\`${apiLatency}\`\`**ms**\n<:cyansmalldot:1036683427782594630> **Bot Ping:** \`\`${botLatency}\`\`**ms**`, true)
        .addField(`<:rolebot:1036683375303463083> Üzemidő`, `<:Online:982724920935075871> **${uptime}**`)
  

        await message.reply({
            content: null,
            embeds: [embed]
        });
    }
}