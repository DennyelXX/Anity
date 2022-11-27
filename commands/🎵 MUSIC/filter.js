module.exports = {
    name: 'filter',
    aliases: [],
    utilisation: '{prefix}filter [filter name]',
    voiceChannel: true,

    run: async (bot, message, args) => {
        const queue = bot.player.getQueue(message.guild.id);

   if (!queue || !queue.playing) return message.channel.send({ content: `>>> ${message.author}, **jelenleg nincs zene lejátszva!** <:CircleTicketNo:982724901184086056>` });

        const actualFilter = queue.getFiltersEnabled()[0];

        if (!args[0]) return message.channel.send({ content: `>>> ${message.author}, **adjon meg egy érvényes filter-t.** \n\`bassboost, 8D, nightcore\`` });

        const filters = [];
        queue.getFiltersEnabled().map(x => filters.push(x));
        queue.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filter) return message.channel.send({ content: `>>> ${message.author}, **helytelen filter nevet adtál meg.** <:CircleTicketNo:982724901184086056> \n\`bassboost, 8D, nightcore\`` });

        const filtersUpdated = {};

        filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

        await queue.setFilters(filtersUpdated);

        message.channel.send({ content: `>>> **Bekapcsolva: ** __${filter}__, **Filter Státusz: ** __${queue.getFiltersEnabled().includes(filter) ? 'Active' : 'Inactive'}__ <:accepted_correct:982724889087729674> \n **Ne feledje, hogy ha a zene hosszú, akkor a szűrőalkalmazás ideje ennek megfelelően hosszabb lehet.**` });
    },
};
