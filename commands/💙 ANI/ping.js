const { Message, Client , MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: 'Ping mutatása.',
    ownerOnly: true,
    run: async (bot, message, args, prefix, guild, color, channel) => {
        let circles = {
            green: "🟢",
            yellow: "🟡",
            red: "🔴"
        }
        let days = Math.floor(bot.uptime / 86400000)
        let hours = Math.floor(bot.uptime / 3600000) % 24
        let minutes = Math.floor(bot.uptime / 60000) % 60
        let seconds = Math.floor(bot.uptime / 1000) % 60

        let botLatency = new Date() - message.createdAt
        let apiLatency = bot.ws.ping;

        const pingEmbed = new MessageEmbed()
            .setColor("ORANGE")
            
            .addField("Bot Ping",
                `${botLatency <= 200 ? circles.green : botLatency <= 400 ? circles.yellow : circles.red} ${botLatency}ms`
                , true
            )
            .addField("API Ping",
                `${apiLatency <= 200 ? circles.yellow : apiLatency <= 400 ? circles.yellow : circles.red} ${apiLatency}ms`
                , true
            )
            .addField("Menet Idő",
                `${days}d ${hours}h ${minutes}m ${seconds}s`
                , true
            )
            .setFooter(`Ő kérte le: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
        return message.reply({ embeds: [pingEmbed], allowedMentions: { repliedUser: false } })
    },
}