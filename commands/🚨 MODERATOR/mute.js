const discord = require("discord.js");

module.exports = {
  name: 'mute',
  usage: "<@felhasználló> [indok]",
    descriptiom: "Egy adott felhasználót tudsz némítani a szerveren.",
  run: async (bot, message, args) => {
    
  const permission =
    message.member.permissions.has("KICK_MEMBERS") ||
    message.member.permissions.has("BAN_MEMBERS");
  const user = message.mentions.members.first();
  const timeoutDuration = args[1];
  const reason = args.slice(2).join(" ") || "Nincs indok megadva.";

  if (!permission) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Nincs jogod a parancs használatára. \nSzükséges jogok: **KICK_MEMBERS** vagy **BAN_MEMBERS**"
      );

    message.reply({
      embeds: [errEmbed],
    });
  } else if (!user) {
    const errEmbed2 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Helytelen használat. \nHelyes használat: **mute [felhasználó] [adj meg egy számot amit percben értelmezünk] [indok]**"
      );

    message.reply({
      embeds: [errEmbed2],
    });
  } else if (!timeoutDuration) {
    const errEmbed3 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Helytelen használat. \nHelyes használat: **mute [felhasználó] [adj meg egy számot amit percben értelmezünk] [indok]**"
      );

    message.reply({
      embeds: [errEmbed3],
    });
  } else {
    user
      .timeout(timeoutDuration * 60 * 1000, reason)
      .then(() => {
        const timeoutEmbed = new discord.MessageEmbed()
          .setColor("0155b6")
          .setTitle(`Sikeres némítás <:accepted_correct:982724889087729674>`)
          .setThumbnail(user.user.avatarURL({ dynamic: true }))
          .setDescription(
            `<:rightarrow:982724933048229888> **Némított felhasználó:** <@${user.id}> \n<:rightarrow:982724933048229888> **Moderátor:** <@${message.author.id}> \n<:rightarrow:982724933048229888> **Némítás ideje:** **${timeoutDuration} Perc \n<:rightarrow:982724933048229888> **Indok:** **${reason}**`
          );

        message.reply({
          embeds: [timeoutEmbed],
        });
      })
      .catch((err) => {
        console.log(err);
        message.reply({
          content: "Valami hiba történt.",
        });
      });
  }
}
}