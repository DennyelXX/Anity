const { Client, Message, MessageEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
module.exports = {
  name: "userinfo",
  usage: "<@felhasználó>",
  description: "Megmutatja az adott ember információit.",
  run: async (bot, message, args) => {
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    

    let userRoles = user.roles.cache
      .map((x) => x)
      .filter((z) => z.name !== "@everyone");

    if (userRoles.length > 100) {
      userRoles = "More than 100";
    }

    let safe = message.author.createdTimestamp;

    let nitroBadge = user.user.avatarURL({ dynamic: true });
    let flags = user.user.flags.toArray().join(``);

    if (!flags) {
      flags = "Nincs";
    }

    flags = flags.replace(
      "HOUSE_BRAVERY",
      "• `HypeSquad Bravery`"
    );
    flags = flags.replace(
      "EARLY_SUPPORTER",
      "• `Early Supporter`"
    );
    flags = flags.replace(
      "VERIFIED_DEVELOPER",
      "• `Verified Bot Developer`"
    );
    flags = flags.replace(
      "EARLY_VERIFIED_DEVELOPER",
      "• `Verified Bot Developer`"
    );
    flags = flags.replace(
      "HOUSE_BRILLIANCE",
      "• `HypeSquad Brilliance`"
    );
    flags = flags.replace(
      "HOUSE_BALANCE",
      "• `HypeSquad Balance`"
    );
    flags = flags.replace(
      "DISCORD_PARTNER",
      "• `Partner`"
    );
    flags = flags.replace(
      "HYPESQUAD_EVENTS",
      "• `Hypesquad Events`"
    );
    flags = flags.replace(
      "DISCORD_CLASSIC",
      "• `Discord Classic`"
    );

    if (nitroBadge.includes("gif")) {
      flags =
        flags +
        `
      • <:nitrooo:982693548535201892>  \`Nitro\``;
    }

    const embeddd = new MessageEmbed()
      .setColor(`BLUE`)
      .setAuthor(
        message.author.tag,
        message.author.avatarURL({ dynamic: true })
      )
      .setDescription(
        `__**Felhasználó Információi**__
      **•** \`ID:\` **${user.id}**
      **•** \`Profil:\` **${user}**
      **•** \`Bot:\` **${user.user.bot ? "Ien" : "Nem"}**
      **•** \`DC készítési ideje:\` **${moment(user.user.createdAt).format(
    "YYYY MMMM Do, H:mm:ss a"
  )}**\n
      __**Eyébb információ**__
      **•** \`Becenév:\` **${user.displayName ? user.displayName : "yok"} **
      **•** \`Csatlakozott ekkor:\` **${moment(user.joinedAt).format(
    "YYYY MMMM Do, H:mm:ss a"
  )}**
      __**Ranok:**__
      ${userRoles}
      
      __**Badge Információ**__
      ${flags} `
      )
      .setThumbnail(user.user.avatarURL({ dynamic: true }))
      .setTimestamp();

    message.channel.send({ embeds: [embeddd] });
  },
};