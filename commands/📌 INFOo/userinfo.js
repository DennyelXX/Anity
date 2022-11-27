const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "userinfo",
    category: "Info",
    description: "Shows information about a user.",
    aliases: ["whois", "ui"],
    usage: "userinfo [@user || userID]",
    cooldown: 3,
    run: async(client, message, args, util) => {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        let bot;
        if(member.user.bot) {
            bot = `Igen <:passed:1036683848265769001>`;
        } else {
            bot = `Nem <:failed:1036683861129695252>`;
        }
        
        let status;
        switch(member.presence.status) {
            case "online":
                status = `<:Online:982724920935075871> | Elérhető`;
                break;
            case "dnd":
                status = `<:error:982724905164505088> | Elfoglalt`;
                break;
            case "idle":
                status = `<:idle:982724907538481203> | Tétlen`;
                break;
            case "offline":
                status = `<:offline:982724919748075531> | Láthatatlan / Offline`;
                break;
        }

            const embed = new Discord.MessageEmbed()

            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setColor('BLUE')
            .addField(`<:cyansmalldot:1036683427782594630> Felhasználó Információi`, `❯ **Neve**: \`\`${member.displayName}\`\`\n❯ **ID:** \`\`${member.user.id}\`\`\n❯ **Tag:** \`\`#${member.user.discriminator}\`\``, true)
            .addField(`<:cyansmalldot:1036683427782594630> Tagság Kezdete`, `❯ **Csatlakozott:** \`\`${moment(member.joinedAt).format('LLLL')} (${moment(member.joinedAt).fromNow()})\`\`\n❯ **Regisztrált:** \`\`${moment(member.user.createdAt).format('LLLL')} (${moment(member.user.createdAt).fromNow()})\`\`\n❯ **Bot:** ${bot}`)
            .addField(`<:cyansmalldot:1036683427782594630> Felhasználó Státusza`, `${status}\n`, true)
            .addField(`<:cyansmalldot:1036683427782594630> Felhasználó Rangjai \`\`${member.roles.cache.size}\`\``, `@everyone **|** ${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `${roles}`).join(" **|** ") || `Nincs több <:failed:1036683861129695252>`}`)

            await message.channel.send({
                embeds: [embed],
            })

    }
}