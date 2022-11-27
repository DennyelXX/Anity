const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'avatar',
  usage: "<@felhasználó>",
  description: 'Letudod kérni egy felhasználó avatárját.',
  run: async (bot, message, args) => {
    let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!mentionedMember) mentionedMember = message.member

    const embed = new MessageEmbed()
    .setTitle(`<:kep:892887909521326161> ` + mentionedMember.user.tag + " avatárja")
    .setImage(mentionedMember.user.displayAvatarURL({ dynamic: true, size: 2048 }))
    .setColor('ORANGE')
    .setTimestamp()

    message.channel.send({ embeds: [embed]})
  }
}