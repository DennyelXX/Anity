const { MessageEmbed } = require("discord.js");
const moment = require("moment");
module.exports = {
    name: 'sinfo',
    aliases: ['p'],
    utilisation: '',
    voiceChannel: true,

    run: async (bot, message, args) => {
  const filterLevels = {
    DISABLED: "Kikapcsolva",
    MEMBERS_WITHOUT_ROLES: "No Role",
    ALL_MEMBERS: "Everyone",
  };

  const verificationLevels = {
    NONE: "Nincs",
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "(╯°□°）╯︵ ┻━┻",
    VERY_HIGH: "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻",
  };

  const regions = {
    brazil: ":flag_br: Brazil",
    europe: ":flag_eu: Europe",
    hongkong: ":flag_hk: Hong Kong",
    india: ":flag_in: India",
    japan: ":flag_jp: Japan",
    russia: ":flag_ru: Russia",
    singapore: ":flag_sg: Singapore",
    southafrica: ":flag_za: South Africa",
    sydeny: ":flag_au: Sydeny",
    "us-central": ":flag_us: US Central",
    "us-east": ":flag_us: US East",
    "us-west": ":flag_us: US West",
    "us-south": ":flag_us: US South",
  };

  const roles = message.guild.roles.cache
    .sort((a, b) => b.position - a.position)
    .map((role) => role.toString());
  const members = message.guild.members.cache;
  const channels = message.guild.channels.cache;
  const emojis = message.guild.emojis.cache;

  const embed = new MessageEmbed()
    .setTitle(`<:2899info:982881605385334884> Szerver Információk - ${message.guild.name}`)
    .setColor("BLUE")
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setDescription(
      `<:cyansmalldot:1036683427782594630> **Általános Információk**
        **❯ Tulajdonos:** ${await message.guild.fetchOwner()}
        **❯ Név:** \`${message.guild.name}\`
        **❯ ID:** \`${message.guild.id}\`
        **❯ Régió:** ${regions[message.guild.region]}
        **❯ Boost Szint:** \`${
          message.guild.premiumTier
            ? `Level ${message.guild.premiumTier}`
            : "Nincs"
        }\`
        **❯ Explicit Filter:** \`${
          filterLevels[message.guild.explicitContentFilter]
        }\`
        **❯ Verification Level:** \`${
          verificationLevels[message.guild.verificationLevel]
        }\`
        **❯ Készítési idő:** \`${moment(message.guild.createdTimestamp).format(
          "LT"
        )} ${moment(message.guild.createdTimestamp).format("LL")} ${moment(
        message.guild.createdTimestamp
      ).fromNow()}\`
        **❯** [Szerver képe](${message.guild.iconURL({ dynamic: true })})
        **❯ Features:** \`${message.guild.features.join(", ") || "None"}\`
        \n\n<:cyansmalldot:1036683427782594630> **Statiszkikák**
        **❯ Rangok:** \`${roles.length}\`
        **❯ Emojik:** \`${emojis.size}\`
        **❯ Rendes Emoji:** \`${
          emojis.filter((emoji) => !emoji.animated).size
        }\`
        **❯ Animált emoji:** \`${
          emojis.filter((emoji) => emoji.animated).size
        }\`
        **❯ Text Csatornák:** \`${
          channels.filter((channel) => channel.type === "text").size
        }\`
        **❯ Hang Csatornák:** \`${
          channels.filter((channel) => channel.type === "voice").size
        }\`
        **❯ Boost Count:** \`${message.guild.premiumSubscriptionCount || "0"}\``
    )
    .setTimestamp();
  if (message.guild.description)
    embed.setDescription("**Szerver leírása:** ", message.guild.description);
  message.channel.send({ embeds: [embed] });
    }
};;
