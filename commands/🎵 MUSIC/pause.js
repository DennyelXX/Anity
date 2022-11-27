module.exports = {
    name: 'pause',
    aliases: [],
    utilisation: '{prefix}pause',
    voiceChannel: true,

    run: async (bot, message, args) => {
        const queue = bot.player.getQueue(message.guild.id);

       if (!queue || !queue.playing) return message.channel.send({ content: `>>> ${message.author}, **jelenleg nincs zene lejátszva!** <:CircleTicketNo:982724901184086056>` });

        const success = queue.setPaused(true);

        return message.channel.send({ content: success ? `>>> **A jelenleg játszó zene | **__${queue.current.title}__ **szüneteltetve.** <:accepted_correct:982724889087729674>` : `${message.author}, Valami elromlott. ❌` });
    },
};
