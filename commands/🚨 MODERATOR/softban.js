const discord = require("discord.js");

module.exports = {
    name: 'softban',
    usage: "<@felhasználló> (szám) [indok]",
    descriptiom: "Egy adott felhasználót tudsz kitíltani idéglenesen a szerverről.",
    run: async (bot, message, args) => {
  const permission = message.member.permissions.has("BAN_MEMBERS");
  const user = message.mentions.members.first();
  const banDuration = args[1];
  const reason = args.slice(2).join(" ") || "Nincs indok megadva.";

  if (!permission) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Nincs jogod a parancs használatára. \nSzükséges jog: **BAN_MEMBERS**"
      );

    message.reply({
      embeds: [errEmbed],
    });
  } else if (!user) {
    const errEmbed2 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Helytelen használat. \nHelyes használat: **softban [felhasználó] [nap / pl. (1)] [indok]**"
      );

    message.reply({
      embeds: [errEmbed2],
    });
  } else if (!banDuration) {
    const errEmbed3 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Helytelen használat. \nHelyes használat: **softban [felhasználó] [nap / pl. (1)] [indok]**"
      );

    message.reply({
      embeds: [errEmbed3],
    });
  } else if (user === message.author) {
    const errEmbed4 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription("A saját profilodat nem tudod idéglenesen kitíltani a szerverről.");

    message.reply({
      embeds: [errEmbed4],
    });
  } else {
    user
      .ban({
        reason: reason,
        days: banDuration,
      })
      .then(() => {
        const softbanEmbed = new discord.MessageEmbed()
          .setColor("0155b6")
          .setTitle(`Sikeres idéglenes kitíltás <:accepted_correct:982724889087729674>`)
          .setThumbnail(user.user.avatarURL({ dynamic: true }))
          .setDescription(
            `<:rightarrow:982724933048229888> **idéglenes kitíltott felhasználó:**: <@${user.id}> \n<:rightarrow:982724933048229888> **Moderátor:** <@${message.author.id}> \n<:rightarrow:982724933048229888> **idéglenes kitíltás ideje:** **${banDuration} Nap** \n<:rightarrow:982724933048229888> **Indok:** **${reason}**`
          )
          .setTimestamp();

        message.reply({
          embeds: [softbanEmbed],
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