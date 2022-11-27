const Discord = module.require("discord.js");

module.exports = {
  name: "rbug",
  usage: "[bug leírása.]",
  description: "Bug jelentése.",
  run: async (bot, message, args) => {
    const reportchannel = bot.channels.cache.get("1037973922039201853");
    const report = args.join(" ");
    if (!report) {
      return message.channel.send(
        `>>> <:2899info:982881605385334884> **Kérlek írd le a \`BUG\` információit / leírását.**`
      );
    }
    message.channel.send(
      `>>> **Köszönjük ${message.author}, a jelentést sikeresen elküldtük. Köszönjük hogy jelentettél egy hibát.** <:passed:1036683848265769001>`
    );
    const embed = new Discord.MessageEmbed()
      .setTitle(`<:otuage:1036683612441030657> Bug Report`)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .addField("Szerver Neve", `**${message.guild.name}**`, true)
          .addField("Szerver ID", `**${message.guild.id}**`, true)
          .addField("Szerver Tulajdonos", `**${(await message.client.users.fetch(message.guild.ownerId)).tag}**`, true)
      .setDescription(`<:cyansmalldot:1036683427782594630> **BUG: **${report} \n\n<:cyansmalldot:1036683427782594630> **Jelentő:** ${message.author.tag}`)
      .setFooter(`Felhasználó ID: ${message.author.id}`)
      .setColor("RED");

    reportchannel.send({embeds: [embed]});
  },
  catch(error) {
    const errorlogs = bot.channels.cache.get("981576779506536479");
    message.channel.send(
      "Looks Like an Error has Ocurred. The Error has been reported to the Report Section!"
    );
    errorlogs.send("Error on Report Command \nError: \n" + error);
  },
};
