const { QueueRepeatMode } = require('discord-player');


module.exports = {
    name: 'loop',
    aliases: ['lp'],
    utilisation: '{prefix}loop <queue>',
    voiceChannel: true,

    run: async (bot, message, args) => {
        const queue = bot.player.getQueue(message.guild.id);
        let prefixx = "//";

 
if (!queue || !queue.playing) return message.channel.send({ content: `>>> ${message.author}, **jelenleg nincs zene lejátszva!** <:CircleTicketNo:982724901184086056>` });

        if (args.join('').toLowerCase() === 'queue') {
            if (queue.repeatMode === 1) return message.channel.send({ content: `>>> ${message.author}, Először le kell tiltania a meglévő zene loop  módját **(${bot.config.prefix}loop)** <:CircleTicketNo:982724901184086056>` });

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

            return message.channel.send({ content: success ? `>>> Loop Mod: **${queue.repeatMode === 0 ? 'Kikapcsolva' : 'Aktív'}**, A teljes sorozat megismétli a non-stop-ot 🔁` : `${message.author}, Valami elromlott. <:CircleTicketNo:982724901184086056>` });
        } else {
            if (queue.repeatMode === 2) return message.channel.send({ content: `${message.author}, Loop módban először le kell tiltania a meglévő várólistát **(${bot.config.prefix}loop queue)** <:CircleTicketNo:982724901184086056>` });

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

            return message.channel.send({ content: success ? `>>> **Loop Mod: ** \`${queue.repeatMode === 0 ? 'Kikapcsolva' : 'Aktív'}\`, Az aktuális zene megállás nélkül megismétlődik. Hogy ha azt szeretné hogy az összes zene megismétlödjön a listában. Akkor ahoz használd a **${prefixx}loop queue** parancsot.) <:4discoball:1006816818708619314>` : `${message.author}, Valami elromlott ❌` });
};
    },
};
