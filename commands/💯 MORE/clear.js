const discord = require("discord.js")

module.exports = {
    name: "clear",
    usage: "(szám)",
    description: "Üzeneteket tudsz törölni.",
    userPerms: ["MANAGE_MESSAGES"],
    botPerms: ["MANAGE_MESSAGES"],
    run: async (bot, message, args) => {
     
      const fetched = message.channel || message.mentions.members.first();
      let messageArray = message.content.split(" ");
      const amount = parseInt(args[0]) + 1;
  
      if (isNaN(amount)) {
        return message.channel.send(
          `>>> ${message.author.username}, you can only clear messages from 1-99`
        );
      } else if (amount <= 1 || amount > 100) {
        return message.channel.send(
          `>>> ${message.author.username}, you can only clear messages from 1-99`
        );
      }
      
      const Clearembed = new discord.MessageEmbed()
                .setTitle(`<:6414robuttrash:982884327677378590> Chat törlés`)
                .setColor("GREEN")
                .addField(`**Törölt üzenetek száma**`, `<:rightarrow:982724933048229888> \`${amount}\` db üzenet`, true)
                .setThumbnail(bot.user.displayAvatarURL({dynamic:true}))
            message.channel.send({embeds:[Clearembed]})

      fetched.bulkDelete(amount, true);
      fetched.bulkDelete(amount);
    },
  };