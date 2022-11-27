const Discord = module.require("discord.js");

module.exports = {
  name: "otlet",
  usage: "( ötleted )",
  description: "Ötlet hogy mi legyen az Anity bot-ban.",
  run: async (bot, message, args) => {
    const otletekchannel = bot.channels.cache.get("1038002124220551208");
    const otletlog = bot.channels.cache.get("1038030607197933618");
    const ootlet = args.join(" ");
    if (!ootlet) {
      return message.channel.send(
        `>>> <:2899info:982881605385334884> **Kérlek írd le az \`ötleted\`.**`
      );
    }
    message.delete()
    message.author.send(
      `>>> **Köszönjük ${message.author}, az ötleted sikeresen elküldtük. Köszönjük hogy ötletelsz az Anity boz-hoz.** <:passed:1036683848265769001>`
    );


    const pipa = (`<:passed:1036683848265769001>`);
    const ixx = (`<:failed:1036683861129695252>`);
    const otletgazda = (message.author.displayAvatarURL());
    const buggosotlet = (`${otletgazda} Ötlete`)


    const otletembed = new Discord.MessageEmbed()
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setTitle(`💡 ${message.author.tag} Ötlete`)
          //.addField("Szerver Neve", `**${message.guild.name}**`, true)
          //.addField("Szerver Tulajdonos", `**${(await message.client.users.fetch(message.guild.ownerId)).tag}**`, true)
          //.addField(`>>> Itt tudsz szavazni, hogy egy ötlet tetszik-e vagy nem. \n(${pipa} \`Tetszik\`) \n(${ixx} \`Nem tetszik\`)`, true)
      .setDescription(`>>> <:cyansmalldot:1036683427782594630> ${ootlet} \n\n*Itt tudsz szavazni, hogy egy ötlet tetszik-e vagy nem.* \n(${pipa} \`Tetszik\`) \n(${ixx} \`Nem tetszik\`)`)
      .setColor("BLUE");

      let oembed = await otletekchannel.send({embeds: [otletembed]});
      await oembed.react(`${pipa}`);
      await oembed.react(`${ixx}`);

      const logotletembed = new Discord.MessageEmbed()
      .setTitle(`💡 ${message.author.tag} Ötlete`)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
          .addField("Szerver Neve", `${message.guild.name}`, true)
          .addField("Szerver ID", `${message.guild.id}`, true)
          .addField("Szerver Tulajdonos", `${(await message.client.users.fetch(message.guild.ownerId)).tag}`, true)
          .setDescription(`>>> <:cyansmalldot:1036683427782594630> ${ootlet}`)
      .setColor("BLUE");

    otletlog.send({embeds: [logotletembed]});

  },
  catch(error) {
    const errorlogs = bot.channels.cache.get("981576779506536479");
    message.channel.send(
      "Looks Like an Error has Ocurred. The Error has been reported to the Report Section!"
    );
    errorlogs.send("Error on Report Command \nError: \n" + error);
  },
};
