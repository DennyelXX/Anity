const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    aliases: ['q'],
    utilisation: '{prefix}queue',
    voiceChannel: true,

    run: async (bot, message, args) => {
        const queue = bot.player.getQueue(message.guild.id);

 
        if (!queue || !queue.playing) return message.channel.send({ content: `>>> ${message.author}, **jelenleg nincs zene lejátszva!** <:CircleTicketNo:982724901184086056>` });

        if (!queue.tracks[0]) return message.channel.send({ content: `>>> ${message.author}, **nincs zene a sorban az aktuális után.** <:CircleTicketNo:982724901184086056>` });

        const embed = new MessageEmbed();
        const methods = [`<:4discoball:1006816818708619314>`, '🔂'];

        embed.setColor('BLUE');
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setTitle(`Szerver Zene Lista - ${message.guild.name} ${methods[queue.repeatMode]}`);

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - __${track.title}__ | \`${track.author}\` (**Ő indította el:** <@${track. requestedBy.id}>)`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `És **${songs - 5}** másik dal...` : `**Van ** \`${songs}\` ** dal a listában.**`;

        embed.setDescription(`<:playicon:1006813116224507915> **Az éppen játszott:** \`${queue.current.title}\`\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs }`);

        embed.setTimestamp();
        embed.setFooter({text: 'Ani ❤️', iconURL: message.author.avatarURL({ dynamic: true }) });

        message.channel.send({ embeds: [embed] });
    },
};
