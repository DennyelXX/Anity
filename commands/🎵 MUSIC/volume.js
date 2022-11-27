const maxVol = require("../../config.js").opt.maxVol;
const defVol = require("../../config.js").opt.defVol;

module.exports = {
    name: 'volume',
    aliases: ['vol'],
    utilisation: `{prefix}volume [1-${maxVol}]`,
    voiceChannel: true,

    run: async (bot, message, args) => {
        const queue = bot.player.getQueue(message.guild.id);

       if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Jelenleg nincs zene lejátszva!. ❌` });

        const vol = parseInt(args[0]);

        if (!vol) return message.channel.send({ content: `Jelenlegi hangerő: **${queue.volume}** 🔊\n**Hangerő modosításhoz, válasz számot \`1\`-től \`${maxVol}\`-ig.**` });

        if (queue.volume === vol) return message.channel.send({ content: `${message.author}, Jelenleg is ez a hangerő szint van. ❌` });

        if (vol < 0 || vol > maxVol) return message.channel.send({ content: `${message.author}, **Hangerő modosításhoz, válasz számot \`1\`-től \`${maxVol}\`-ig.** ❌` });

        const success = queue.setVolume(vol);

        return message.channel.send({ content: success ? `Hangerő modosítva: **${vol}**/**${maxVol}** 🔊` : `${message.author}, Valami elromlott. ❌` }) ;
    },
};
