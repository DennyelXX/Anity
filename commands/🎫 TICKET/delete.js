/* eslint-disable no-unused-vars */
module.exports = {
	name: 'delete',
	category: 'Ticket',
	description: 'Delete a specified ticket.',
	aliases: [],
	usage: 'delete',
	userperms: ['ADMINISTRATOR'],
	botperms: [],
	run: async (bot, message, args) => {
		if(message.channel.name.includes('ticket-')) {
			message.channel.delete();
		}
		else {
			return message.reply('you cannot use this command here. Please use this command when you want to delete a ticket.');
		}
	},
};