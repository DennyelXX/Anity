const Discord = require('discord.js');
const db = require('quick.db')
const botconfig = require("../../botconfig.json");
    let prefix = botconfig.prefix;

module.exports = {
    name: "ticket",

    run: async (bot, message, args) => {

		if(!message.guild.me.permissions.has("MANAGE_CHANNELS")) return message.channel.send('<a:no:784463793366761532> **I do not have the correct permissions | Permission : MANAGE_CHANNELS**')

		if(message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.id}`)) {
			return message.reply('<a:no:784463793366761532> **You already have a ticket, please close your exsisting ticket first before opening a new one**');
		}

		message.delete();

		message.guild.channels.create(`ticket-${message.author.id}`, {
			permissionOverwrites: [
				{
					id: message.author.id,
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
				},
				{
					id: message.guild.roles.everyone,
					deny: ['VIEW_CHANNEL'],
				},
			],
			type: 'text',
		}).then(async channel => {
			const ticket = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} Ticket\'s`)
			.setDescription(`**${message.author}, Welcome to your channel! Support will be arriving soon**\n**While you wait please tell us what your problem is**\n**If you want to close the ticket please type \`${prefix}close\`**`)
			.setColor("#000")
			message.reply(`<a:yes:784463701305458708> **You have successfully created a ticket, Please click on ${channel} to view your ticket**`).then(m => m.delete({ timeout: 14000 }).catch(e => {}));
			channel.send(`${message.author}`, ticket);
			const tChannel = bot.channels.cache.get("984849303027716156");
		    tChannel.send(`**Ticket ${message.author.id} created, Click the following to veiw <#${channel.id}>**`)
		});
	}
}