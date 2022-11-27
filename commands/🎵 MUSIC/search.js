const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'search',
    aliases: [],
    utilisation: '{prefix}search [song name]',
    voiceChannel: true,

    run: async (bot, message, args) => {
      
if (!args[0]) return message.channel.send({ content: `>>> ${message.author}, **adjon meg egy érvényes zene címet.** <:CircleTicketNo:982724901184086056>` });

        const res = await bot.player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send({ content: `>>> ${message.author}, **a keresésnek nincs eredménye.** <:CircleTicketNo:982724901184086056>` });

        const queue = await bot.player.createQueue(message.guild, {
            metadata: message.channel
        });

        const embed = new MessageEmbed();

        embed.setColor('BLUE');
        embed.setTitle(`Talált zenék: ${args.join(' ')}`);

        const maxTracks = res.tracks.slice(0, 10);

        embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\nAdj meg egy számot **1**-től **${maxTracks.length}-ig** vagy írd be azt hogy **cancel** a keresés befejezéséhez.`);

        embed.setTimestamp();
        embed.setFooter({ text: 'Ani ❤️', iconURL: message.author.avatarURL({ dynamic: true }) });

        message.channel.send({ embeds: [embed] });

        const collector = message.channel.createMessageCollector({
            time: 20000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

       collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') return message.channel.send({ content: `>>> **Keresés leálítva.** <:CircleTicketNo:982724901184086056>` }) && collector.stop();

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) return message.channel.send({ content: `>>> **HIBA** Kérlek adj meg egy számot **1**-től **${maxTracks.length}-ig** vagy írd be azt hogy **cancel** a keresés befejezéséhez. ❌` });

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await bot.player.deleteQueue(message.guild.id);
                return message.channel.send({ content: `>>> ${message.author}, **nem vagy olyan hang csatornában, ahová én is be tudnék menni.** <:CircleTicketNo:982724901184086056>` });
            }

            await message.channel.send({ content: `>>> **Keresem a kiválasztott zenédet.** <:blurplesearch:1006813112147640401>` });

            queue.addTrack(res.tracks[Number(query.content)-1]);
            if (!queue.playing) await queue.play();
           
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return message.channel.send({ content: `>>> ${message.author}, **a választási idő lejárt.** <:CircleTicketNo:982724901184086056>` });
        });
    },
};
