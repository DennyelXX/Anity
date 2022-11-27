const discord = require("discord.js");

module.exports = {
  name: 'report',
  usage: "<@felhasználló> [indok]",
    descriptiom: "Egy adott felhasználót tudsz némítani a szerveren.",
  run: async (bot, message, args) => {
  
    const reportchannel = bot.channels.cache.get("1037974094366392370");
    const report = args.join(" ");
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

      if (!user) {
        return message.channel.send(
          `>>> <:2899info:982881605385334884> **Kérlek jelölj meg valakit, és kérlek írd le a felhasználóval szenbeni panaszod.**`
        );
      }

      message.channel.send(
        `>>> **A jelentést sikeresen elküldtük ${message.author}. Köszönjük hogy jelentettél egy felhasználót.** <:passed:1036683848265769001>`
      );
      const embed = new discord.MessageEmbed()
        .setTitle(`<:otuage:1036683612441030657> Felhasználó jelentés`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .addField("Szerver Neve", `**${message.guild.name}**`, true)
          .addField("Szerver ID", `**${message.guild.id}**`, true)
          .addField("Szerver Tulajdonos", `**${(await message.client.users.fetch(message.guild.ownerId)).tag}**`, true)
          .setDescription(`**A szerveren van ${message.guild.memberCount} felhasználó**`)
        .setDescription(`<:cyansmalldot:1036683427782594630> **Jelentő:** ${message.author.tag} \n<:cyansmalldot:1036683427782594630> **Jelentett:** ${user} \n<:cyansmalldot:1036683427782594630> **Panasz: **${report}`)
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

}
}