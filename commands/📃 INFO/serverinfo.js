const { MessageEmbed } = require("discord.js");
const moment = require('moment')
module.exports = {
  name: "serverinfo",
  description: "Megmutatja a szerver összes információját.",
   run: async (client, message, args) => {
    let embed = new MessageEmbed()
    .setTitle("**Server Information**")
        .setColor('ORANGE')
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setAuthor(message.guild.name, message.guild.iconURL)
        .addField("\`✨\` Neve", message.guild.name, true)
        .addField("\`✨\` ID", message.guild.id, true)
        .addField("\`🤴\` Tulaj", `${(await message.client.users.fetch(message.guild.ownerId)).tag}`, true)
        .addField(`\`👤\` Emberek`, message.guild.memberCount.toString(), true)
        .addField(`\`🤖\` Botok:`, message.guild.members.cache.filter(member => member.user.bot).size.toString(), true)
        .addField(`\`❌\` Nem animált Emojik:`, message.guild.emojis.cache.size.toString(), true)
        .addField(`\`💢\` Animált Emojik:`,message.guild.emojis.cache.filter(emoji => emoji.animated).size.toString(),true )
        .addField(`\`📌\` Szöveges Csatornák:`,message.guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size.toString(),true )
        .addField(`\`🔊\` Hang Csatornák:`,message.guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size.toString(),true )
        .addField(`\`🏆\` Rangok:`, message.guild.roles.cache.size.toString(), true)
        .addField(`\`📅\` Készítési idő:`, `${moment(message.guild.createdTimestamp).format('LLL')} | \`${moment(message.guild.createdTimestamp).fromNow()}\``, true)
        .addField(`\`🎊\` Boost Szint:`, message.guild.premiumTier.toString(), true)
        .addField(`\`🎊\` Ősszes Boosts:`, message.guild.premiumSubscriptionCount.toString(), true)
        .setFooter(`Ő kérte le: ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
    message.reply({embeds: [embed]});
}
}