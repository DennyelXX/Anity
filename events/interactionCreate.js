const Discord = require('discord.js');
module.exports = (bot, int) => {
    if (!int.isButton()) return;

    const queue = bot.player.getQueue(int.guildId);
    switch (int.customId) {
        case 'saveTrack': {
          if (!queue || !queue.playing) return int.reply({ content: `>>> **jelenleg nincs zene lejátszva!** <:CircleTicketNo:982724901184086056>`, ephemeral: true, components: [] });

          const embed = new Discord.MessageEmbed()
          .setColor('BLUE')
          .setTitle(bot.user.username + " - Mentés")
          .setThumbnail(bot.user.displayAvatarURL())
          .addField(`Zene Címe`, `\`${queue.current.title}\``)
          .addField(`Idő`, `\`${queue.current.duration}\``)
          .addField(`Link`, `${queue.current.url}`)
          .addField(`Innen Mentve`, `\`${int.guild.name}\``)
          .addField(`Ő indította el`, `${queue.current.requestedBy}`)
          .setTimestamp()
          .setFooter({ text: 'Ani ❤️', iconURL: int.user.displayAvatarURL({ dynamic: true }) });
          int.member.send({ embeds: [embed] }).then(() => {
                return int.reply({ content: ``, ephemeral: true, components: [] });
            }).catch(error => {
                return int.reply({ content: `>>> **Nem tudok üzenetet küldeni neked.** <:CircleTicketNo:982724901184086056>`, ephemeral: true, components: [] });
            });
        }
        break
        case 'time': {
            if (!queue || !queue.playing) return int.reply({ content: `>>> **jelenleg nincs zene lejátszva!** <:CircleTicketNo:982724901184086056>`, ephemeral: true, components: [] });

            const progress = queue.createProgressBar();
            const timestamp = queue.getPlayerTimestamp();
    
            if (timestamp.progress == 'Infinity') return int.message.edit({ content: `This song is live streaming, no duration data to display. 🎧` });
    
            const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle(queue.current.title)
            .setThumbnail(bot.user.displayAvatarURL())
            .setTimestamp()
            .setDescription(`${progress} (**${timestamp.progress}**%)`)
            .setFooter({ text: 'Ani ❤️', iconURL: int.user.displayAvatarURL({ dynamic: true }) });
            int.message.edit({ embeds: [embed] });
            int.reply({ content: `**✅ Success:** Time data updated. `, ephemeral: true});
        }
    }
};
