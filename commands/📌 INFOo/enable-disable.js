const { MessageEmbed } = require("discord.js");


module.exports = {
    name: 'test',

    run: async (bot, message, args) => {
    const embed = new MessageEmbed()

        .setTitle("📃・DevLog")
        .setThumbnail(bot.user.avatarURL({ size: 1024 }))
        .setDescription(`\📢┆Figyelem! 
        Az újdonságokat, frissítéseket a discord szerverünkön láthatod. [Discord](https://discord.gg/Bcyavray6M)`)
        .setColor("GREEN")
        message.channel.send({ embeds: [embed] });
}
}
