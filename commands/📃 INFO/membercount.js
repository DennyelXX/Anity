const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'emberek',
    description: "Megmutatja hogy mennyi ember van a szerveren.",
    aliases: ['mc'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const guild = message;
        const embed = new MessageEmbed()
        .setColor("#FF0000")
        .setAuthor(`Emberek összegzése a/az ${message.guild} szerveren.`, message.guild.iconURL({ dynamic: true }))
        .setTitle("Összegzés")
        .setDescription (`\`✨\` **Összes ember:** __${message.guild.members.cache.size}__\n \`😀\` **Emberek:** __${message.guild.members.cache.filter(member => !member.user.bot).size}__\n\`🤖\` **Botok:** __${message.guild.members.cache.filter(member => member.user.bot).size}__`, true)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setFooter(`Ő kérte le: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp()
       
            message.channel.send({ embeds: [embed]})
  }
}