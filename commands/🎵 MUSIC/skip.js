module.exports = {
    name: 'skip',
    aliases: ['s'],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    run: async (bot, message, args) => {
        const queue = bot.player.getQueue(message.guild.id);
 
        if (!queue || !queue.playing) return message.channel.send({ content: `>>> ${message.author}, **jelenleg nincs zene lejátszva!** <:CircleTicketNo:982724901184086056>` });

        const success = queue.skip();

        return message.channel.send({ content: success ? `>>> __${queue.current.title}__ **leálítva, következő zenére léptetve.** <:accepted_correct:982724889087729674>` : `${message.author}, Valami elromlott. ❌` });
    },
};
