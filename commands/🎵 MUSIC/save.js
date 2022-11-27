const Discord = require('discord.js');
module.exports = {
    name: 'save',
    aliases: [],
    utilisation: '{prefix}save',
    voiceChannel: true,

    run: async (bot, message, args) => {
        const queue = bot.player.getQueue(message.guild.id);

  if (!queue || !queue.playing) return message.channel.send({ content: `>>> ${message.author}, **jelenleg nincs zene lejátszva!** <:CircleTicketNo:982724901184086056>` });

  const embed = new Discord.MessageEmbed()
  .setColor('BLUE')
  .setTitle(bot.user.username + " - Mentve")
  .setThumbnail(bot.user.displayAvatarURL())
  .addField(`Zene címe`, `\`${queue.current.title}\``)
  .addField(`Idő`, `\`${queue.current.duration}\``)
  .addField(`Link`, `${queue.current.url}`)
  .addField(`Innen Mentve`, `\`${message.guild.name}\``)
  .addField(`Ő indította el`, `${queue.current.requestedBy}`)
  .setTimestamp()
  .setFooter({ text: 'Ani ❤️', iconURL: message.author.avatarURL({ dynamic: true }) });
  message.author.send({ embeds: [embed] }).then(() => {
            message.channel.send({ content: `>>> **Elküldtem privátban a zenét.** <:accepted_correct:982724889087729674>` });
        }).catch(error => {
            message.channel.send({ content: `>>> ${message.author}, **nem tudok üzenetet küldeni neked.** <:CircleTicketNo:982724901184086056>` });
        });
    },
};
