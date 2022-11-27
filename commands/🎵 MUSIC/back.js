module.exports = {
    name: 'back',
    aliases: [],
    utilisation: '{prefix}back',
    voiceChannel: true,

    run: async (bot, message, args) => {
        const queue = bot.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `>>> ${message.author}, **jelenleg nincs zene lejátszva!** <:CircleTicketNo:982724901184086056>` });

        if (!queue.previousTracks[1]) return message.channel.send({ content: `>>> ${message.author}, **korábban nem volt zene.** <:CircleTicketNo:982724901184086056>` });

        await queue.back();

        message.channel.send({ content: `>>> **Az előző zene lejátszása megkezdődött...** <:accepted_correct:982724889087729674>` });
    },
};
