module.exports = {
    name: 'stop',
    aliases: ['st'],
    utilisation: '{prefix}stop',
    voiceChannel: true,

    run: async (bot, message, args) => {
        const queue = bot.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `>> ${message.author}, **jelenleg nincs zene lejátszva!** <:CircleTicketNo:982724901184086056>` });

        queue.destroy();

        message.channel.send({ content: `>>> **A zene leálítva.** <:robutstop:1006813110612545607>` });
    },
};
