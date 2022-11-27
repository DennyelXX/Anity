const discord = require("discord.js");



 module.exports = {
    name: 'ban',
    usage: "<@felhasználló> [indok]",
    descriptiom: "Egy adott felhasználót tudsz kitíltani a szerverről.",
    run: async (bot, message, args) => {
  const permission = message.member.permissions.has("BAN_MEMBERS");
  const user = message.mentions.members.first();
  const reason = args.slice(1).join(" ") || "Nincs indok megadva.";

  if (!permission) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Nincs jogod ehez a parancshoz. \nSzükséges jog: **BAN_MEMBERS**"
      );

    message.reply({
      embeds: [errEmbed],
    });
  } else if (!user) {
    const errEmbed2 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Helytelen használat. \nA helyes használat: **ban [felhasználó] [indok]**"
      );

    message.reply({
      embeds: [errEmbed2],
    });
  } else if (user === message.author) {
    const errEmbed3 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription("Nem tudod a saját profilodat kitíltani a szerverről.");

    message.reply({
      embeds: [errEmbed3],
    });
  } else {
    user
      .ban({
        reason: reason,
      })
      .then(() => {
        const banEmbed = new discord.MessageEmbed()
          .setColor("GREEN")
          .setTitle(`Sikeresen kitíltva. <:accepted_correct:982724889087729674>`)
          .setThumbnail(user.user.avatarURL({ dynamic: true }))
          .setDescription(
            `<:rightarrow:982724933048229888> **Kitíltott felhasználó:** <@${user.id}> \n<:rightarrow:982724933048229888> **Moderátor:** <@${message.author.id}> \n<:rightarrow:982724933048229888> **Indok:** **${reason}**`)
          .setTimestamp();

        message.reply({
          embeds: [banEmbed],
        });
      })
      .catch((err) => {
        console.log(err);
        message.reply({
          content: "Valami hiba történt. Lehet hogy nagyobb rangja van mint az enyém. Vagy pedig az a rang az enyém felett van.",
        });
      });
  }
}
 };