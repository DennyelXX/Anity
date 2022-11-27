
const Discord = require('discord.js');
const ms = require("ms");
const db = require('quick.db')


module.exports = {
    name: "afk",
    usage: "( idő pl: 10s ) [indok]",
    description: "Bot meghívás",
    run: async (bot, message, args) => {
    
        let user = message.author;
        let time = args[0] || "5m";
        let reason = args.slice(1).join(' ') || "Nincs Indok.";
    
         
       // if(!time) return message.channel.send("<a:no:784463793366761532> **Please specify an time**");

        const afkban = message.author.tag;

		const embed = new Discord.MessageEmbed()
        .setTitle(`<:afk:982724891864342628> ${afkban} Elment a géptől.`)
          .setThumbnail(message.author.avatarURL({ dynamic: true }))
		.setDescription(`<:rightarrow:982724933048229888> **Idő:** __${time}__ \n<:rightarrow:982724933048229888> **Indok:** __${reason}__`)
		.setColor("RED")
		message.channel.send({ embeds: [embed] })

        setTimeout(function(){
			const unmute = new Discord.MessageEmbed()
            .setTitle(`<:Online:982724920935075871> ${afkban} Vissza ült a géphez.`)
            .setThumbnail(message.author.avatarURL({ dynamic: true }))
			.setColor("GREEN")
			.setDescription(`<:rightarrow:982724933048229888> **Idő:** __${time} | Lejárt.__ \n<:rightarrow:982724933048229888> **Indok:** __${reason}__`)
            message.channel.send({ user, embeds: [unmute] })

        }, ms(time));
    }
	
	

}