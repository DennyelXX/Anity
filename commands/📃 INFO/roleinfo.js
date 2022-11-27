
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "roleinfo",
    usage: "<@rang>",
    description: "rang leírását tudod lekérni.",
    botPerms: ["EMBED_LINKS"],
    run: async (bot, message, args) => {
        
        if (!args[0]) return message.channel.send("<a:no:784463793366761532> **You need to mention the role**")
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
        if (!role) return message.channel.send("<a:no:784463793366761532> **Please enter a valid role**");

        const status = {
            false: `Nem <:CircleTicketNo:982724901184086056>`,
            true: `Igen <:accepted_correct:982724889087729674>`
        }

        let roleembed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`<:2899info:982881605385334884> Rang Info`)
            .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
            .addField("\`🔰\` Neve", `**${role.name}**`)
            .addField("\`🔰\` ID", `\`${role.id}\``)
            .addField("\`⚪ Hex", `**${role.hexColor}**`)
            .addField("\`👤\` Emberek száma", `**${role.members.size}**`)
            .addField("\`🔸\` Pozíció", `**${role.position}**`)
            .addField("\`📌\` **Említhető**", `**${status[role.mentionable]}**`)
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setTimestamp()

        message.channel.send({ embeds: [roleembed] })
	}
}