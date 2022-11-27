module.exports = {
    name: 'resume',
    aliases: [],
    utilisation: '{prefix}resume',
    voiceChannel: true,

    run: async (bot, message, args) => {
        const queue = bot.player.getQueue(message.guild.id);

        if (!queue) return message.channel.send({ content:`>>> ${message.author}, **jelenleg nincs zene lejátszva!** <:CircleTicketNo:982724901184086056>` });

        const success = queue.setPaused(false);

        return message.channel.send({ content: success ? `>>> __${queue.current.title}__, **A zene ismételten megy.** <:accepted_correct:982724889087729674>` : `${message.author}, Valami elromlott. ❌` });
    },
};
