module.exports = {
    name: 'clear',
    aliases: [],
    utilisation: '{prefix}clear',
    voiceChannel: true,

    run: async (bot, message, args) => {
        const queue = bot.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `>>> ${message.author}, **jelenleg nincs zene lejátszva!** <:CircleTicketNo:982724901184086056>` });

        if (!queue.tracks[0]) return message.channel.send({ content: `>>> ${message.author}, **a jelenlegi zene után, már nincs több zene a sorban.** <:CircleTicketNo:982724901184086056>` });

        await queue.clear();

        message.channel.send({ content: `>>> **A sor most törlődött.** <:6414robuttrash:982884327677378590>` });
    },
};
