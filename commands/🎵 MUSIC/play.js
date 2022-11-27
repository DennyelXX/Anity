const { QueryType } = require('discord-player');

module.exports = {
    name: 'play',
    aliases: ['p'],
    utilisation: '{prefix}play [song name/URL]',
    voiceChannel: true,

    run: async (bot, message, args) => {
if (!args[0]) return message.channel.send({ content: `>>> ${message.author}, írja be a keresni kívánt zene nevét. Vagy linket adj meg. <:CircleTicketNo:982724901184086056>` });

        const res = await bot.player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send({ content: `>>> ${message.author}, nincs találat! <:CircleTicketNo:982724901184086056>` });

        const queue = await bot.player.createQueue(message.guild, {
            metadata: message.channel
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel)
        } catch {
            await bot.player.deleteQueue(message.guild.id);
            return message.channel.send({ content: `>>> ${message.author}, nem tudok csatlakozni a hang csatornához, vagy nem vagy bent egy hang csatornában. <:CircleTicketNo:982724901184086056>` });
        }

        await message.channel.send({ content: `>>> **A ${res.playlist ? 'Lejátszási lista' : 'Zene'} keresése...** <:blurplesearch:1006813112147640401>` });

if(bot.config.opt.selfDeaf === false) {
let channel = message.member.voice.channel;
const { joinVoiceChannel } = require('@discordjs/voice');
const connection = joinVoiceChannel({
   channelId: channel.id,
   guildId: channel.guild.id,
   adapterCreator: channel.guild.voiceAdapterCreator,
   selfDeaf: false
});
}

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};
