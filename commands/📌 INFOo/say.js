const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "say",
    category: "Utility",
    description: "Say something using the bot.",
    aliases: [""],
    usage: "say <message>",
    run: async(client, message, args, util) => {
        let toSay = args.join(" ");
        if(!toSay) {
            return message.channel.send("Please append a message.")
        }

        await message.delete();

        const embed = new MessageEmbed()

        .setDescription(toSay)
        .setColor('BLUE');

        await message.channel.send({
            embeds: [embed]
        });
    }
}